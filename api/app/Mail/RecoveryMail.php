<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class RecoveryMail extends Mailable
{    
    private $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $email = $this->user->email;
        $name = $this->user->name;

        $key = $this->user->recoveryCode->key;
        $code = str_pad($key, 4, "0", STR_PAD_LEFT);

        return $this->view('mail.changePassword')
            ->to($email, $name)
            ->with(['code' => $code]);
    }
}
