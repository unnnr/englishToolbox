<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
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
        $url = app(VerificationService::class)->verificationUrl($this->user);

        return $this->view('mail.verifyEmail')
            ->to($email, $name)
            ->with([ 'url' => $url]);
    }
}