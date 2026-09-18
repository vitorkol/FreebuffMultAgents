<?php

namespace App\Http\Controllers;

use App\Models\AuthAuditLog;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;

class AuthController extends Controller
{
    /** CA-4: máximo de tentativas antes do bloqueio. */
    public const MAX_ATTEMPTS = 5;

    /** CA-4: duração do bloqueio em minutos. */
    public const LOCK_MINUTES = 30;

    /**
     * CA-3: login com e-mail e senha.
     * CA-4: bloqueio por 30 minutos após 5 tentativas incorretas.
     */
    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        /** @var User|null $user */
        $user = User::where('email', $data['email'])->first();

        // CA-4: conta bloqueada — nem avalia credenciais.
        if ($user !== null && $user->isLocked()) {
            $minutes = (int) max(1, ceil(now()->diffInMinutes($user->locked_until, false)));

            AuthAuditLog::create([
                'user_id' => $user->id,
                'email' => $user->email,
                'event' => AuthAuditLog::EVENT_ACCOUNT_LOCKED,
                'ip_address' => $request->ip(),
                'context' => ['blocked_minutes_remaining' => $minutes],
            ]);

            return response()->json([
                'message' => "Conta bloqueada por excesso de tentativas. Tente novamente em {$minutes} minuto(s).",
                'code' => 'ACCOUNT_LOCKED',
                'locked_until' => $user->locked_until?->toIso8601String(),
            ], 423);
        }

        $passwordOk = $user !== null && Hash::check($data['password'], $user->password);
        $activeOk = $user !== null && $user->is_active;

        if (! $passwordOk) {
            return $this->registerFailedAttempt($request, $user, $data['email']);
        }

        if (! $activeOk) {
            AuthAuditLog::create([
                'user_id' => $user->id,
                'email' => $user->email,
                'event' => AuthAuditLog::EVENT_LOGIN_FAILED,
                'ip_address' => $request->ip(),
                'context' => ['reason' => 'inactive_account'],
            ]);

            return response()->json([
                'message' => 'Conta inativa. Verifique o e-mail de ativação ou contate o administrador.',
                'code' => 'ACCOUNT_INACTIVE',
            ], 403);
        }

        // Sucesso: zera contador de tentativas.
        $user->forceFill(['failed_login_attempts' => 0, 'locked_until' => null])->save();

        AuthAuditLog::create([
            'user_id' => $user->id,
            'email' => $user->email,
            'event' => AuthAuditLog::EVENT_LOGIN_SUCCESS,
            'ip_address' => $request->ip(),
        ]);

        $user->load('auditLogs');

        return response()->json([
            'token' => $user->createToken('auth')->plainTextToken,
            'user' => $user,
        ]);
    }

    private function registerFailedAttempt(Request $request, ?User $user, string $email): JsonResponse
    {
        if ($user === null) {
            // Não revela se o e-mail existe.
            return response()->json([
                'message' => 'Credenciais inválidas.',
                'code' => 'INVALID_CREDENTIALS',
            ], 401);
        }

        $user->increment('failed_login_attempts');

        if ($user->failed_login_attempts >= self::MAX_ATTEMPTS) {
            $user->forceFill([
                'locked_until' => now()->addMinutes(self::LOCK_MINUTES),
            ])->save();

            AuthAuditLog::create([
                'user_id' => $user->id,
                'email' => $user->email,
                'event' => AuthAuditLog::EVENT_ACCOUNT_LOCKED,
                'ip_address' => $request->ip(),
                'context' => ['attempts' => $user->failed_login_attempts, 'lock_minutes' => self::LOCK_MINUTES],
            ]);

            return response()->json([
                'message' => 'Conta bloqueada por 30 minutos após 5 tentativas incorretas.',
                'code' => 'ACCOUNT_LOCKED',
                'locked_until' => $user->locked_until->toIso8601String(),
            ], 423);
        }

        AuthAuditLog::create([
            'user_id' => $user->id,
            'email' => $user->email,
            'event' => AuthAuditLog::EVENT_LOGIN_FAILED,
            'ip_address' => $request->ip(),
            'context' => ['attempts' => $user->failed_login_attempts, 'note' => 'password redacted'],
        ]);

        $remaining = self::MAX_ATTEMPTS - $user->failed_login_attempts;

        return response()->json([
            'message' => "Credenciais inválidas. Restam {$remaining} tentativa(s) antes do bloqueio.",
            'code' => 'INVALID_CREDENTIALS',
            'attempts_remaining' => $remaining,
        ], 401);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sessão encerrada.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['user' => $request->user()]);
    }
}
