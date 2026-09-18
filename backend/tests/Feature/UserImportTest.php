<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class UserImportTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_import_csv_and_users_are_created_inactive(): void
    {
        Notification::fake();

        $admin = User::factory()->create(['role' => User::ROLE_ADMIN, 'is_active' => true]);
        $csv = "name,email,role\nProfessor Ana,ana@escola.test,teacher\nAluno Bruno,bruno@escola.test,student\n";

        $response = $this->actingAs($admin, 'sanctum')
            ->post('/api/users/import', [], ['Content-Type' => 'multipart/form-data']);

        // Reenvia com arquivo real (o teste acima garante rota autenticada).
        $path = tempnam(sys_get_temp_dir(), 'csv');
        file_put_contents($path, $csv);

        $response = $this->actingAs($admin, 'sanctum')
            ->post('/api/users/import', ['file' => new \Illuminate\Http\UploadedFile($path, 'users.csv', 'text/csv', null, true)]);

        $response->assertCreated()
            ->assertJsonPath('created', 2);

        $this->assertDatabaseHas('users', ['email' => 'ana@escola.test', 'is_active' => false]);
        $this->assertDatabaseHas('users', ['email' => 'bruno@escola.test', 'is_active' => false]);
    }

    public function test_import_activation_email_is_sent_to_each_created_user(): void
    {
        Notification::fake();

        $admin = User::factory()->create(['role' => User::ROLE_ADMIN, 'is_active' => true]);
        $path = tempnam(sys_get_temp_dir(), 'csv');
        file_put_contents($path, "name,email,role\nProfessor Ana,ana2@escola.test,teacher\n");

        $this->actingAs($admin, 'sanctum')
            ->post('/api/users/import', ['file' => new \Illuminate\Http\UploadedFile($path, 'users.csv', 'text/csv', null, true)]);

        Notification::assertSentTo(User::where('email', 'ana2@escola.test')->first(), \App\Notifications\ActivationNotification::class);
    }

    public function test_non_admin_cannot_import(): void
    {
        $teacher = User::factory()->create(['role' => User::ROLE_TEACHER, 'is_active' => true]);

        $this->actingAs($teacher, 'sanctum')
            ->post('/api/users/import', [])
            ->assertForbidden();
    }

    public function test_duplicate_emails_are_skipped(): void
    {
        Notification::fake();

        $admin = User::factory()->create(['role' => User::ROLE_ADMIN, 'is_active' => true]);
        User::factory()->create(['email' => 'exists@escola.test']);

        $path = tempnam(sys_get_temp_dir(), 'csv');
        file_put_contents($path, "name,email,role\nX Y,exists@escola.test,student\n");

        $response = $this->actingAs($admin, 'sanctum')
            ->post('/api/users/import', ['file' => new \Illuminate\Http\UploadedFile($path, 'users.csv', 'text/csv', null, true)]);

        $response->assertCreated()->assertJsonPath('skipped', 1);
    }
}
