<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\VerifyEmailNotification;
use App\Models\Traits\HasFavoritePosts;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, Notifiable, HasFavoritePosts;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailNotification());
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function avatar()
    {
        return $this->hasOne(Avatar::class);
    }

    public function ban()
    {
        return $this->hasOne(Ban::class);
    }

    public function views() 
    {
        return $this->hasMany(View::class);
    }

    public function hasntViewed(Model $post) 
    {
        $view = $this->views()->where([
            'viewable_type'=> get_class($post),
            'viewable_id' => $post->id
        ]);

        return !!!$view;
    }

    public function getAdminAttribute() 
    {
        return false;
    }

    public function getBannedAttribute() 
    {
        return $this->ban !== null;
    }

    public function getCanReveiewAttribute() 
    {
            
    }

    public function setPasswordAttribute($value)
    {
    	$this->attributes['password'] = bcrypt($value);
    }


    public function getEmailVerificationAttribute() 
    {
        return $this->hasMany(VerificationCode::class)
            ->where('type', 'email')
            ->first();
    }

    public function verificationCodes() 
    {
        return $this->hasMany(VerificationCode::class);
    }
}