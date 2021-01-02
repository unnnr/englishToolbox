<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Traits\HasAuthNotifications;
use App\Models\Traits\HasFavoritePosts;
use App\Models\Traits\HandleAuthCodes;
use App\Models\Traits\HasRoles;


class User extends Authenticatable implements MustVerifyEmail
{
    use HasAuthNotifications,
        HasFavoritePosts,
        HandleAuthCodes,
        HasApiTokens, 
        HasRoles;

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

    public function ban()
    {
        return $this->hasOne(Ban::class);
    }

    public function favoritedBy()
    {
        return $this->morphToMany(User::class, 'favoritable');
    }

    public function roles() 
    {
        return $this->hasMany(Role::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function views() 
    {
        return $this->hasMany(View::class);
    }

    public function hasntViewed(Model $post) 
    {
        return !!!$this->views()
                        ->where([
                            'viewable_type'=> get_class($post),
                            'viewable_id' => $post->id])
                        ->exists();

    }

    public function avatar()
    {
        return $this->hasOne(Avatar::class)
            ->withDefault(['ulr' => 'empty']);
    }

    public function setPasswordAttribute($value)
    {
    	$this->attributes['password'] = bcrypt($value);
    }
}