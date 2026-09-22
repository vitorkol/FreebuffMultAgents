<?php

namespace App\Http\Controllers;

use App\Models\AuthAuditLog;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

/**
 * CA-2: e-mail de ativação com link para definição de senha.
 * CA-5: regra de complexidade de senha.
 * CA-6: recuperação de senha com token válido por 1 hora (config auth.passwords.users.expire).
 */
class PasswordController extends Controller
{
    /** CA-5: regra de complexidade de senha. */
    public const PASSWORD_RULES = [
        'required',
        'string',
        'min:8',         // RF-07: mínimo de 8 caracteres
        'regex:/[a-z]/',        // letra minúscula
        'regex:/[A-Z]/',        // letra maiúscula
        'regex:/[0-9]/',        // número
        'regex:/[^A-Za-z0-9]/', // caractere especial
        'confirmed',
    ];

    /**
     * Define a senha a partir do token de ativação (CA-2).
     */
    public function activate(Request $request): JsonResponse
    {
        $data = $request->validate([
            'token' => ['required', 'string'],
            'password' => self::PASSWORD_RULES,
        ]);

        $user = User::where('activation_token', $data['token'])
            ->where('activation_expires_at', '>', now())
            ->first();

        if ($user === null) {
            return response()->json([
                'message' => 'Token de ativação inválido ou expirado.',
                'code' => 'INVALID_TOKEN',
            ], 422);
        }

        $user->forceFill([
            'password' => $data['password'], // cast 'hashed' cuida do bcrypt
            'is_active' => true,
            'activated_at' => now(),
            'activation_token' => null,
            'activation_expires_at' => null,
            'failed_login_attempts' => 0,
            'locked_until' => null,
        ])->save();

        AuthAuditLog::create([
            'user_id' => $user->id,
            'email' => $user->email,
            'event' => AuthAuditLog::EVENT_ACCOUNT_ACTIVATED,
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'message' => 'Conta ativada com sucesso. Você já pode fazer login.',
        ]);
    }

    /**
     * CA-6: solicita recuperação de senha. Resposta sempre 200 (não revela e-mails cadastrados).
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate(['email' => ['required', 'email']]);

        Password::sendResetLink($request->only('email'));

        $user = User::where('email', $request->input('email'))->first();

        if ($user !== null) {
            AuthAuditLog::create([
                'user_id' => $user->id,
                'email' => $user->email,
                'event' => AuthAuditLog::EVENT_PASSWORD_RESET_REQUESTED,
                'ip_address' => $request->ip(),
            ]);
        }

        return response()->json([
            'message' => 'Se o e-mail estiver cadastrado, você receberá um link de recuperação válido por 1 hora.',
        ]);
    }

    /**
     * CA-6: redefine a senha com token válido por 1 hora.
     */
    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => self::PASSWORD_RULES,
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => $password,
                    'failed_login_attempts' => 0,
                    'locked_until' => null,
                ])->save();

                $user->tokens()->delete(); // invalida sessões anteriores
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Token de recuperação inválido ou expirado (validade de 1 hora).',
                'code' => 'INVALID_TOKEN',
            ], 422);
        }

        $user = User::where('email', $request->input('email'))->first();

        AuthAuditLog::create([
            'user_id' => $user?->id,
            'email' => $user?->email,
            'event' => AuthAuditLog::EVENT_PASSWORD_RESET_COMPLETED,
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'message' => 'Senha redefinida com sucesso. Faça login com a nova senha.',
        ]);
    }
}
