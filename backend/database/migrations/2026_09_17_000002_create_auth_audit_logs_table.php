<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Rastreabilidade de bloqueio e tentativas para auditoria (Sprint 1).
     */
    public function up(): void
    {
        Schema::create('auth_audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('email', 255)->nullable();
            $table->string('event', 40); // login_success|login_failed|account_locked|password_reset_requested|password_reset_completed|account_activated|csv_import
            $table->string('ip_address', 45)->nullable();
            $table->text('context')->nullable(); // JSON
            $table->timestamps();

            $table->index(['email', 'event']);
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('auth_audit_logs');
    }
};
