# Questões em aberto

## 2026-09-16 — entrada do pipeline

1. Quem são os participantes reais e qual o objetivo da reunião?
2. Quais decisões foram tomadas? (escopo, prioridades, restrições)
3. Quais dúvidas ou dependências foram identificadas?
4. Há requisitos funcionais, não funcionais ou regras de negócio a descrever?

> O meeting-summary.md contém placeholders vazios; com o conteúdo atual o ANR não pode produzir requisitos e histórias de usuário.

## 2026-09-16 — suporte a escolha automática de reunião

- Criada pasta `docs/product/meetings/` para organizar os resumos de reunião.
- O Revisor pode, quando suportado, listar ou solicitar qual arquivo de reunião usar antes de processar, em vez de exigir `docs/product/meeting-summary.md` fixo.
- Pendente: confirmar se a versão do Freebuff suporta listagem automática ou pergunta interativa ao iniciar o pipeline.

## 2026-09-16 — pendência de ambiente

- **Pergunta:** quem define a criação e configuração dos projetos Laravel e React antes da implementação?
- **Pergunta:** qual versão do Laravel/React e quais ferramentas de build devem ser usadas?
- **Decisão pendente:** instalação do ambiente de desenvolvimento antes da Sprint 1.
- **Registro:** pendência aberta em `docs/product/bugs.md` e decisão do Tech Leader registrada em `docs/product/technical-refinement.md`.
- **Ação adotada:** Developer deve instalar e configurar backend e frontend antes de implementar a Sprint 1.
- **Atualização 2026-09-17:** ambiente resolvido — PHP 8.3 com extensões locais (`backend/php83.sh`), Laravel 10 em `backend/` e React+Vite em `frontend/` funcionando; versões efetivas: Laravel 10.x, PHP 8.3, React 19, Vite 8.

## 2026-09-17 — decisões técnicas da Sprint 1

- **Bloqueio de conta (CA-4):** implementado por conta de usuário (`failed_login_attempts` + `locked_until`) com auditoria em `auth_audit_logs`; além disso há throttle de 10 req/min por e-mail/IP na rota de login.
- **Validade do token de ativação (CA-2):** 48 horas (janela de conveniência); o token de recuperação de senha (CA-6) segue o requisito de 1 hora via `auth.passwords.users.expire`.
- **Regra de senha (CA-5):** mínimo de 10 caracteres com minúscula, maiúscula, número e caractere especial (espelhada no frontend).
- **Comunicação frontend-backend:** token Sanctum via header `Authorization: Bearer`; em dev o Vite faz proxy de `/api` para `http://localhost:8000`.
