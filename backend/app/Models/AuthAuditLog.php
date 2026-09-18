<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuthAuditLog extends Model
{
    public const EVENT_LOGIN_SUCCESS = 'login_success';

    public const EVENT_LOGIN_FAILED = 'login_failed';

    public const EVENT_ACCOUNT_LOCKED = 'account_locked';

    public const EVENT_PASSWORD_RESET_REQUESTED = 'password_reset_requested';

    public const EVENT_PASSWORD_RESET_COMPLETED = 'password_reset_completed';

    public const EVENT_ACCOUNT_ACTIVATED = 'account_activated';

    public const EVENT_CSV_IMPORT = 'csv_import';

    protected $fillable = [
        'user_id',
        'email',
        'event',
        'ip_address',
        'context',
    ];

    protected $casts = [
        'context' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
