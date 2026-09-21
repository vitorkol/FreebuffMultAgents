# Evidências de testes

**Elaborado por:** QA
**Data:** 2026-09-16
**Entrada lida:** docs/product/user_stories.md e docs/product/test-plan.md

## Status
Aguardando implementação e execução dos testes.

## Critérios de registro de evidência
- Cada critério de aceite validado deve ter evidência associada.
- Falhas identificadas devem ser registradas em docs/product/bugs.md.
- Se houver falha em QA, o fluxo retorna ao Developer.

## Evidência de reestruturação do backend (2026-09-21)
- Agente: Buffy (Freebuff)
- Runtime: PHP 8.3.33 (sistema) + extensões empacotadas em `backend/php-extensions/` via wrapper `backend/php83.sh` (sem sudo).
- Framework: Laravel 10.50.3, banco sqlite existente preservado (6 migrações reconhecidas, incluindo as 2 custom).

| Verificação | Resultado |
|---|---|
| `./php83.sh artisan --version` | Laravel Framework 10.50.3 |
| `./php83.sh artisan about` | PHP 8.3.33, sqlite, sem erros |
| `./php83.sh artisan route:list` | `/` e `api/health` registradas |
| `./php83.sh artisan migrate:status` | 6/6 migrações Ran (batch 1 e 2) |
| `./php83.sh vendor/bin/phpunit` | OK (2 tests, 2 assertions) |
| `GET /` (artisan serve) | HTTP 200 |
| `GET /api/health` | 200 JSON `{"status":"ok",...}` |

Observação: o `Testing/TestCase` do framework nesta instalação exige `createApplication()` implementado (implementado em `tests/TestCase.php`); rotas carregadas no `boot()` do `AppServiceProvider` por robustez neste vendor.
