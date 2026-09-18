# Bugs

Nenhum bug registrado.

---

## 2026-09-16 — pendência de ambiente

- **Tipo:** pendência técnica
- **Observação:** as pastas `backend/` e `frontend/` existem no repo, mas ainda não há projeto Laravel nem projeto React instalados/configurados.
- **Impacto:** a implementação da Sprint 1 é planejada, mas a execução real depende de criação/configuração dos ambientes backend e frontend.
- **Ação sugerida:** instalar e configurar o projeto Laravel e o projeto React antes de codificar a Sprint 1.
- **Status:** aberto

---

## 2026-09-16 — próximo gate

- **Próximo passo:** Developer deve instalar e configurar backend e frontend antes de implementar a Sprint 1.
- **Dependência:** ambiente funcional é pré-requisito para codificação e para QA.
- **Registro adicional:** decisão de ambiente já registrada em `docs/product/technical-refinement.md`.

---

## 2026-09-16 — decisão do Tech Leader

- **Decisão:** instalar e configurar backend e frontend antes da Sprint 1.
- **Motivo:** implementação e QA dependentes do ambiente.
- **Status:** aprovado
- **Ação registrada pelo Developer:** instalar e configurar Laravel e React antes da Sprint 1.

---

## 2026-09-16 — implementação backend da Sprint 1

- **Escopo:** autenticação e cadastro.
- **Avanço:** backend implementado antes do frontend.
- **Próximo passo:** frontend consumindo os serviços do backend.
- **Registro:** `docs/product/sprint-prioritization.md`.

---

## 2026-09-16 — implementação frontend da Sprint 1

- **Escopo:** fluxo de login, tela de erro de bloqueio e fluxo de recuperação de senha.
- **Integração:** consumo dos serviços de autenticação do backend.
- **Avanço:** frontend implementado após backend.
- **Próximo passo:** preparar evidência para QA.
- **Registro:** `docs/product/sprint-prioritization.md`.

---

## 2026-09-16 — evidência preparada para QA

- **Escopo:** backend e frontend da Sprint 1 implementados.
- **Próximo passo:** QA executa o plano em `docs/product/test-plan.md`.
- **Registro:** `docs/product/sprint-prioritization.md`.

---

## 2026-09-16 — ação do Developer

- **Ação:** confirmar instalação/configuração do Laravel e React.
- **Status:** concluído — Backend Laravel instalado em `backend/` e Frontend React+Vite instalado em `frontend/`.
- **Atenção:** dependências do frontend (npm install) e ajustes de ambiente (.env, chaves, banco) ainda podem ser necessários.
- **Registro:** `docs/product/sprint-prioritization.md`.

---

## 2026-09-17 — ambiente PHP resolvido com php8.3 + extensões locais

- **Tipo:** pendência técnica resolvida
- **Situação encontrada:** o PHP padrão do sistema é 8.1 e não possui `ext-dom`, `ext-xml`, `ext-curl`, `ext-sqlite3`, `ext-mbstring` nem `ext-zip`; o `composer install` falhava.
- **Solução adotada:** o sistema já tinha `php8.3-cli` instalado. Foi criado o wrapper `backend/php83.sh`, que roda o PHP 8.3 carregando extensões extraídas localmente em `backend/php-extensions/` (dom, xml, simplexml, xmlreader, xmlwriter, curl, mbstring, sqlite3, pdo_sqlite, zip + libzip4), sem exigir root nem alterar o PHP padrão.
- **Resultado:** `composer install` concluído, `APP_KEY` gerada, migrations executadas (sqlite) e suíte de testes verde: 21 testes / 51 asserções.
- **Observação:** o `php` padrão continua sendo 8.1; sempre usar `./php83.sh` para artisan/composer/phpunit no backend.
- **Status:** resolvido

---

## 2026-09-17 — implementação real da Sprint 1 (backend + frontend)

- **Tipo:** registro de implementação
- **Backend:** controller de importação CSV (CA-1), notificação e endpoint de ativação (CA-2), login com Sanctum (CA-3), bloqueio de 30 minutos após 5 tentativas com auditoria em `auth_audit_logs` (CA-4), regra de complexidade de senha (CA-5), recuperação via Password Broker do Laravel com token de 1 hora (CA-6).
- **Frontend:** cliente de API (`src/api.js`), telas de login (com aviso de bloqueio e tentativas restantes), recuperação de senha, definição de senha (ativação/reset) e dashboard pós-login; sessão em `localStorage`; proxy do Vite para `/api`.
- **Verificação:** backend 21/21 testes verdes; frontend build Vite OK e oxlint sem avisos; smoke test do servidor com resposta 401 JSON esperada.
- **Status:** concluído — pronto para QA executar `docs/product/test-plan.md`.
