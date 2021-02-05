<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class VerifyMail extends Mailable
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

        $key = $this->user->emailVerification->key;
        $code = str_pad($key, 4, "0", STR_PAD_LEFT);
        $subject =  $code . ' - your verification code';

        return $this->view('mail.verifyEmail')
                    ->subject($subject)
                    ->to($email, $name)
                    ->with(['code' => $code]);
    }
}
