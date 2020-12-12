<?php

namespace App\Models\Traits;

use App\Models\VerificationCode;

trait HandleAuthCodes
{
    public function verificationCodes() 
    {
        return $this->hasMany(VerificationCode::class);
    }

    public function getRecoveryCodeAttribute() 
    {
        return $this->hasMany(VerificationCode::class)
            ->where('type', 'password')
            ->first();
    }

    public function getEmailVerificationAttribute() 
    {
        return $this->hasMany(VerificationCode::class)
            ->where('type', 'email')
            ->first();
    }
}   