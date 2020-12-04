<?php

namespace App\Mail;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Str;
use App\Services\Auth\VerificationService;


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
        $code = Str::padLeft($key, 4, '0');

        return $this->view('mail.verifyEmail')
            ->to($email, $name)->with(['code' => $code]);
    }
}
