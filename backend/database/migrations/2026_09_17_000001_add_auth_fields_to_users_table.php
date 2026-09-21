<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('student');
            $table->boolean('is_active')->default(false);
            $table->unsignedInteger('failed_login_attempts')->default(0);
            $table->timestamp('locked_until')->nullable();
            $table->string('activation_token')->nullable();
            $table->timestamp('activation_expires_at')->nullable();
            $table->timestamp('activated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
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
