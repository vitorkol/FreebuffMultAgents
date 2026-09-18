<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ActivationAndResetTest extends TestCase
{
    use RefreshDatabase;

    // ---------- CA-2: ativação ----------

    public function test_activation_sets_password_and_activates_account(): void
    {
        Notification::fake();

        $admin = User::factory()->create(['role' => User::ROLE_ADMIN, 'is_active' => true]);
        $path = tempnam(sys_get_temp_dir(), 'csv');
        file_put_contents($path, "name,email,role\nNova Pessoa,nova@escola.test,student\n");

        $this->actingAs($admin, 'sanctum')->post('/api/users/import', [
            'file' => new \Illuminate\Http\UploadedFile($path, 'users.csv', 'text/csv', null, true),
        ]);

        $user = User::where('email', 'nova@escola.test')->first();
        $this->assertNotNull($user->activation_token);

        $this->postJson('/api/register/activate', [
            'token' => $user->activation_token,
            'password' => 'Senha@Forte123',
            'password_confirmation' => 'Senha@Forte123',
        ])->assertOk();

        $this->assertTrue($user->fresh()->is_active);
        $this->assertNotNull($user->fresh()->activated_at);
        $this->assertNull($user->fresh()->activation_token);
    }

    public function test_expired_activation_token_is_rejected(): void
    {
        $user = User::factory()->create([
            'activation_token' => 'token-expirado',
            'activation_expires_at' => now()->subDay(),
            'is_active' => false,
        ]);

        $this->postJson('/api/register/activate', [
            'token' => 'token-expirado',
            'password' => 'Senha@Forte123',
            'password_confirmation' => 'Senha@Forte123',
        ])->assertStatus(422);
    }

    // ---------- CA-5: complexidade de senha ----------

    public function test_weak_passwords_are_rejected_on_activation(): void
    {
        $user = User::factory()->create([
            'activation_token' => 'token-valido',
            'activation_expires_at' => now()->addDay(),
            'is_active' => false,
        ]);

        foreach (['curta', 'semnumero@A', 'SEMESPECIAL1a', 'semmaiuscula1@', 'SemEspecial1'] as $weak) {
            $this->postJson('/api/register/activate', [
                'token' => 'token-valido',
                'password' => $weak,
                'password_confirmation' => $weak,
            ])->assertStatus(422);
        }
    }

    // ---------- CA-6: recuperação de senha ----------

    public function test_forgot_password_always_returns_200(): void
    {
        User::factory()->create(['email' => 'conhecido@escola.test', 'is_active' => true]);

        $this->postJson('/api/auth/forgot-password', ['email' => 'conhecido@escola.test'])->assertOk();
        $this->postJson('/api/auth/forgot-password', ['email' => 'desconhecido@escola.test'])->assertOk();
    }

    public function test_reset_with_valid_token_within_1_hour_succeeds(): void
    {
        $user = User::factory()->create([
            'email' => 'reset@escola.test',
            'password' => 'SenhaAntiga@123',
            'is_active' => true,
        ]);

        $this->postJson('/api/auth/forgot-password', ['email' => $user->email]);

        $row = DB::table('password_reset_tokens')->where('email', $user->email)->first();
        $this->assertNotNull($row);

        // Recupera o token "cru": como foi hashado, geramos um novo via broker para teste.
        // Alternativa: inspect notification. Aqui validamos o fluxo com token fresco do broker.
        $token = \Illuminate\Support\Facades\Password::createToken($user);

        $response = $this->postJson('/api/auth/reset-password', [
            'token' => $token,
            'email' => $user->email,
            'password' => 'NovaSenha@123',
            'password_confirmation' => 'NovaSenha@123',
        ]);

        $response->assertOk();

        $this->assertTrue(Hash::check('NovaSenha@123', $user->fresh()->password));
    }

    public function test_reset_token_invalid_after_1_hour(): void
    {
        $user = User::factory()->create([
            'email' => 'expira@escola.test',
            'password' => 'SenhaAntiga@123',
            'is_active' => true,
        ]);

        $token = \Illuminate\Support\Facades\Password::createToken($user);

        // Avança 61 minutos — token passa do TTL de 60 minutos.
        $this->travel(61)->minutes();

        $this->postJson('/api/auth/reset-password', [
            'token' => $token,
            'email' => $user->email,
            'password' => 'NovaSenha@123',
            'password_confirmation' => 'NovaSenha@123',
        ])->assertStatus(422);
    }
}
