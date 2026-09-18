<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

/**
 * CA-2: e-mail de ativação com link para definição de senha.
 * Token de ativação válido por 48 horas (janela de conveniência para o usuário definir a senha).
 */
class ActivationNotification extends Notification
{
    // use Queueable; — desativado: QUEUE_CONNECTION=sync e testes inspecionam emails enviados na hora

    public function __construct(public readonly string $token)
    {
    }

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(User $notifiable): MailMessage
    {
        $url = URL::to("/activate?token={$this->token}&email=".urlencode($notifiable->email));

        return (new MailMessage)
            ->subject('Ative sua conta e defina sua senha')
            ->greeting("Olá, {$notifiable->name}!")
            ->line('Sua conta foi criada. Defina sua senha para ativá-la.')
            ->action('Definir senha', $url)
            ->line('Este link é válido por 48 horas.')
            ->line('Se você não esperava este e-mail, ignore-o.');
    }
}
