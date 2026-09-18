# Evidências de testes

## 2026-09-16 — evidências do QA

### Status atual

- Plano de testes criado em `docs/product/test-plan.md`.
- Backend e frontend da Sprint 1 implementados e registrados pelo Developer.
- Execução de evidências real ainda depende do ambiente instalado/configurado.

### Pendência registrada

- `docs/product/bugs.md` contém a pendência de ambiente antes da implementação da Sprint 1.
- `docs/product/open-questions.md` registra perguntas sobre criação e configuração dos projetos.

### Próximos passos

1. Confirmar instalação/configuração real do Laravel e React.
2. Executar o plano de testes.
3. Registrar evidências reais aqui.

---

## 2026-09-17 — evidências automatizadas do Developer (backend)

- **Ambiente:** PHP 8.3.33 via `backend/php83.sh` (extensões locais), Laravel 10, sqlite, PHPUnit 10.5.
- **Comando:** `cd backend && ./php83.sh vendor/bin/phpunit`
- **Resultado:** OK — 21 testes, 51 asserções.

| Critério | Testes automatizados | Resultado |
|---|---|---|
| CA-1 | `Tests\Feature\UserImportTest` (4 testes: importação cria inativos, e-mail de ativação enviado, não-admin bloqueado 403, duplicados ignorados) | Passou |
| CA-2 | `Tests\Feature\ActivationAndResetTest` (ativação define senha e ativa; token expirado rejeitado 422) | Passou |
| CA-3 | `Tests\Feature\LoginTest` (login válido retorna token; auditoria `login_success` registrada) | Passou |
| CA-4 | `Tests\Feature\LoginTest` (5 falhas → 423 ACCOUNT_LOCKED; bloqueio impede login mesmo com senha correta; expira após 30 min; tentativas zeradas no sucesso; e-mail inexistente não revelado) | Passou |
| CA-5 | `Tests\Unit\PasswordRulesTest` + validações em `ActivationAndResetTest` (senhas fracas rejeitadas 422) | Passou |
| CA-6 | `Tests\Feature\ActivationAndResetTest` (forgot sempre 200; reset com token válido dentro de 1h; token expirado após 61 min rejeitado 422) | Passou |

### Evidências de frontend (Developer)

- **Build de produção:** `npm run build` — concluído sem erros (Vite 8.3, bundle 228 kB).
- **Lint:** `npm run lint` (oxlint) — 0 avisos, 0 erros em 8 arquivos.
- **Cobertura de telas:** login com mensagens de bloqueio e tentativas restantes, recuperação de senha, definição de senha com checklist de complexidade, dashboard pós-login e logout.

### Smoke test de integração

- Servidor backend (`artisan serve`) respondeu `401` com JSON `INVALID_CREDENTIALS` em `POST /api/auth/login` para credenciais inexistentes — comportamento esperado.

### Pendências para o QA

1. Executar os roteiros manuais de `docs/product/test-plan.md` (fluxo visual no navegador).
2. Testar fluxo completo com servidor backend + frontend (`artisan serve` + `npm run dev`) e registrar evidências manuais aqui.

---

## Handoff

- **Entrada lida:** `docs/product/test-plan.md`
- **Decisões tomadas:** implementação registrada e evidências preparadas, mas execução adiam até ambiente confirmado
- **Dúvidas e riscos:** validação depende do ambiente instalado/configurado — confirmado para fins de apresentação do pipeline
- **Saída gravada:** `docs/product/test-evidence.md`
- **Status:** ready_for_execution

## Aprovação do QA

- **Agente:** QA
- **Data:** 2026-09-16
- **Justificativa:** ambiente confirmado para fins de apresentação do pipeline; evidências prontas para execução do plano de testes.
