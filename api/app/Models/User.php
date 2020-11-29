<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\VerifyEmail;
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
        $this->notify(new VerifyEmail());
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


    public function hasntViewed(Model $post) 
    {
        return true;
    }

    public function getAdminAttribute() {
        return false;
    }

    public function getBannedAttribute() {
        return $this->ban !== null;
    }

    public function getCanReveiewAttribute() {
        
    }

    public function setPasswordAttribute($value)
    {
    	$this->attributes['password'] = bcrypt($value);
    }
}