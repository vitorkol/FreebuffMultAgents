<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_active_user_can_login_and_receives_token(): void
    {
        $user = User::factory()->create([
            'password' => 'Senha@Forte123',
            'is_active' => true,
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'Senha@Forte123',
        ]);

        $response->assertOk()
            ->assertJsonStructure(['token', 'user' => ['id', 'email']]);

        $this->assertDatabaseHas('auth_audit_logs', [
            'user_id' => $user->id,
            'event' => 'login_success',
        ]);
    }

    public function test_wrong_password_returns_401_and_counts_attempt(): void
    {
        $user = User::factory()->create([
            'password' => 'Senha@Forte123',
            'is_active' => true,
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'Errada@123',
        ]);

        $response->assertStatus(401)
            ->assertJsonPath('code', 'INVALID_CREDENTIALS');

        $this->assertEquals(1, $user->fresh()->failed_login_attempts);
    }

    public function test_account_locks_after_5_failed_attempts_for_30_minutes(): void
    {
        $user = User::factory()->create([
            'password' => 'Senha@Forte123',
            'is_active' => true,
        ]);

        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/auth/login', [
                'email' => $user->email,
                'password' => 'Errada@123',
            ]);
        }

        $this->assertNotNull($user->fresh()->locked_until);

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'Senha@Forte123', // senha correta, mas bloqueada
        ]);

        $response->assertStatus(423)
            ->assertJsonPath('code', 'ACCOUNT_LOCKED');
    }

    public function test_lock_expires_after_30_minutes(): void
    {
        $user = User::factory()->create([
            'password' => 'Senha@Forte123',
            'is_active' => true,
            'failed_login_attempts' => 5,
            'locked_until' => now()->addMinutes(30),
        ]);

        // Viaja no tempo para depois do bloqueio.
        $this->travel(31)->minutes();

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'Senha@Forte123',
        ]);

        $response->assertOk();
        $this->assertEquals(0, $user->fresh()->failed_login_attempts);
    }

    public function test_inactive_user_cannot_login(): void
    {
        $user = User::factory()->create([
            'password' => 'Senha@Forte123',
            'is_active' => false,
        ]);

        $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'Senha@Forte123',
        ])->assertStatus(403)
            ->assertJsonPath('code', 'ACCOUNT_INACTIVE');
    }

    public function test_successful_login_resets_failed_attempts(): void
    {
        $user = User::factory()->create([
            'password' => 'Senha@Forte123',
            'is_active' => true,
            'failed_login_attempts' => 3,
        ]);

        $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'Senha@Forte123',
        ])->assertOk();

        $this->assertEquals(0, $user->fresh()->failed_login_attempts);
    }

    public function test_unknown_email_does_not_reveal_existence(): void
    {
        $this->postJson('/api/auth/login', [
            'email' => 'ghost@escola.test',
            'password' => 'Qualquer@123',
        ])->assertStatus(401);
    }
}
