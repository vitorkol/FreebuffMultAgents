<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\URL;

/**
 * CA-6: e-mail de recuperação de senha com link e token válido por 1 hora.
 * Estende a notificação padrão do framework, apenas trocando a URL
 * (o app é API-only e não possui a rota nomeada password.reset).
 */
class ResetPasswordNotification extends ResetPassword
{
    // use Queueable; — desativado: testes inspecionam e-mails síncronos

    /**
     * URL do link de redefinição apontada para o frontend.
     */
    protected function resetUrl($notifiable): string
    {
        if (static::$createUrlCallback) {
            return call_user_func(static::$createUrlCallback, $notifiable, $this->token);
        }

        return URL::to('/reset-password?token='.$this->token.'&email='.urlencode($notifiable->getEmailForPasswordReset()));
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Recuperação de senha')
            ->greeting("Olá, {$notifiable->name}!")
            ->line('Recebemos uma solicitação de redefinição de senha para sua conta.')
            ->action('Redefinir senha', $this->resetUrl($notifiable))
            ->line('Este link é válido por 1 hora.')
            ->line('Se você não solicitou a redefinição, ignore este e-mail.');
    }
}
