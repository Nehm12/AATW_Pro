<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ParentInscriptionMail extends Mailable
{
    use SerializesModels;

    public $user;

    /**
     * Créer une nouvelle instance de message.
     *
     * @param $user
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Construire le message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.parent_inscription')
                    ->with([
                        'user' => $this->user,  // Passer l'objet user à la vue
                    ])
                    ->subject('Bienvenue sur notre plateforme!');
    }
}
