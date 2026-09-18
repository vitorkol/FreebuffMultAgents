<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * CA-4: bloqueio por 30 minutos após 5 tentativas incorretas.
     * CA-2: token de ativação com link para definição de senha.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 20)->default('student')->after('password'); // admin|teacher|student
            $table->boolean('is_active')->default(false)->after('role');       // CA-1: usuários importados nascem inativos
            $table->unsignedTinyInteger('failed_login_attempts')->default(0)->after('is_active');
            $table->timestamp('locked_until')->nullable()->after('failed_login_attempts');
            $table->string('activation_token')->nullable()->index()->after('locked_until');
            $table->timestamp('activation_expires_at')->nullable()->after('activation_token');
            $table->timestamp('activated_at')->nullable()->after('activation_expires_at');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role',
                'is_active',
                'failed_login_attempts',
                'locked_until',
                'activation_token',
                'activation_expires_at',
                'activated_at',
            ]);
        });
    }
};
