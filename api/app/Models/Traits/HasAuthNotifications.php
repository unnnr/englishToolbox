<?php

namespace App\Models\Traits;

use Illuminate\Notifications\Notifiable;
use App\Notifications\VerifyEmailNotification;
use App\Notifications\RecoveryNotification;


trait HasAuthNotifications
{
    use Notifiable;

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailNotification());
    }
    
    public function sendRecoveryNotification()
    {
        $this->notify(new RecoveryNotification());
    }
}   