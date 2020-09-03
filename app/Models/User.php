<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Notifications\VerifyEmail;

use Illuminate\Support\Facades\Log;


class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, Notifiable, HasRoles;

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


    public function setPasswordAttribute($value)
    {
    	$this->attributes['password'] = bcrypt($value);
    }

    public function getAuthTokenAttribute()
    {
        return $this->tokens()->where('name', 'authToken')->first();
    }


    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail());
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }
}
