<?php

namespace App\Http\Controllers;

use App\Models\AuthAuditLog;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * CA-1: O administrador pode importar CSV e criar usuários inativos.
 * CA-2: O sistema envia e-mail de ativação com link para definição de senha.
 */
class UserImportController extends Controller
{
    public function import(Request $request): JsonResponse
    {
        $this->authorizeAdmin($request);

        $request->validate([
            'file' => ['required', 'file', 'mimes:csv,txt', 'max:2048'],
        ]);

        $handle = fopen($request->file('file')->getRealPath(), 'r');
        if ($handle === false) {
            return response()->json(['message' => 'Não foi possível ler o arquivo CSV.'], 422);
        }

        $created = 0;
        $skipped = 0;
        $errors = [];
        $line = 0;

        while (($row = fgetcsv($handle, 1000, ',')) !== false) {
            $line++;

            if ($line === 1 && strtolower(trim((string) $row[0])) === 'name') {
                continue; // cabeçalho
            }

            $name = trim((string) ($row[0] ?? ''));
            $email = trim((string) ($row[1] ?? ''));
            $role = strtolower(trim((string) ($row[2] ?? User::ROLE_STUDENT)));

            if ($name === '' || $email === '' || ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $skipped++;
                $errors[] = ['line' => $line, 'message' => 'Linha inválida: nome e e-mail válidos são obrigatórios.'];

                continue;
            }

            if (! in_array($role, [User::ROLE_ADMIN, User::ROLE_TEACHER, User::ROLE_STUDENT], true)) {
                $role = User::ROLE_STUDENT;
            }

            if (User::where('email', $email)->exists()) {
                $skipped++;
                $errors[] = ['line' => $line, 'message' => "E-mail já cadastrado: {$email}"];

                continue;
            }

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make(Str::random(32)), // senha provisória; definida na ativação
                'role' => $role,
                'is_active' => false, // CA-1: criados como inativos
            ]);

            $user->sendActivationNotification();

            AuthAuditLog::create([
                'user_id' => $user->id,
                'email' => $user->email,
                'event' => AuthAuditLog::EVENT_CSV_IMPORT,
                'ip_address' => $request->ip(),
                'context' => ['role' => $role],
            ]);

            $created++;
        }

        fclose($handle);

        return response()->json([
            'message' => "Importação concluída: {$created} usuário(s) criado(s) como inativo(s), {$skipped} linha(s) ignorada(s).",
            'created' => $created,
            'skipped' => $skipped,
            'errors' => $errors,
        ], 201);
    }

    private function authorizeAdmin(Request $request): void
    {
        /** @var \App\Models\User|null $user */
        $user = $request->user();

        if ($user === null || ! $user->isAdmin()) {
            abort(403, 'Apenas administradores podem importar usuários.');
        }
    }
}
