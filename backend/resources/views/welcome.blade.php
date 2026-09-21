<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <style>
            body { font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; margin: 0; background: #0f172a; color: #e2e8f0; display: flex; min-height: 100vh; align-items: center; justify-content: center; }
            .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 40px; max-width: 560px; text-align: center; }
            h1 { margin: 0 0 8px; font-size: 24px; }
            p { margin: 4px 0; color: #94a3b8; }
            code { background: #0f172a; padding: 2px 6px; border-radius: 4px; color: #7dd3fc; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>{{ config('app.name', 'Laravel') }}</h1>
            <p>Backend operacional — Laravel {{ app()->version() }} (PHP {{ PHP_VERSION }})</p>
            <p>Health check da API: <code>GET /api/health</code></p>
        </div>
    </body>
</html>
