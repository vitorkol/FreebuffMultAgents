<?php

namespace Tests\Unit;

use App\Http\Controllers\PasswordController;
use PHPUnit\Framework\TestCase;

class PasswordRulesTest extends TestCase
{
    private function passes(string $password): bool
    {
        $rules = array_values(array_diff(PasswordController::PASSWORD_RULES, ['required', 'string', 'confirmed']));

        $fails = 0;
        foreach ($rules as $rule) {
            if (str_starts_with($rule, 'min:')) {
                if (mb_strlen($password) < (int) substr($rule, 4)) {
                    $fails++;
                }

                continue;
            }
            if (str_starts_with($rule, 'regex:')) {
                if (preg_match(substr($rule, 6), $password) !== 1) {
                    $fails++;
                }
            }
        }

        return $fails === 0;
    }

    public function test_strong_password_passes(): void
    {
        $this->assertTrue($this->passes('Senha@Forte123'));
    }

    public function test_passwords_without_required_character_classes_fail(): void
    {
        $this->assertFalse($this->passes('semmaiuscula1@'));
        $this->assertFalse($this->passes('SEMESPECIAL1a'));
        $this->assertFalse($this->passes('SemNumero@'));
        $this->assertFalse($this->passes('curta1@A'));
    }
}
