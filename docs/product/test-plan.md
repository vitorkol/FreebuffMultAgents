# Plano de testes

## 2026-09-16 — plano de testes do QA para a Sprint 1

### Objetivo

Validar a implementação da Sprint 1 — Autenticação e cadastro, com separação entre backend e frontend.

### Critérios de aceite cobertos

- CA-1: importação CSV e criação de usuários inativos
- CA-2: envio de e-mail de ativação com link para definição de senha
- CA-3: login com e-mail e senha
- CA-4: bloqueio por 30 minutos após 5 tentativas incorretas
- CA-5: regra de complexidade de senha
- CA-6: recuperação de senha com token válido por 1 hora

---

## Estratégia de teste

- Testes manuais para validação de fluxo e usabilidade.
- Testes automatizados quando viável para regras de backend e pontos críticos.
- Separação de responsabilidades:
  - Backend: regras de negócio, segurança, rastreabilidade
  - Frontend: interação, telas de erro e consumo dos serviços

---

## Casos de teste

### CA-1 — Importação CSV e criação de usuários inativos

- **Tipo:** manual e automatizado
- **Roteiro manual:**
  1. Prepare CSV com dados mínimos.
  2. Importe pelo administrador.
  3. Verifique que os usuários foram criados como inativos.
- **Roteiro automatizado:**
  1. Enviar CSV para endpoint de importação.
  2. Validar criação dos registros.
  3. Validar status inativo.

### CA-2 — E-mail de ativação com link para definição de senha

- **Tipo:** manual e automatizado
- **Roteiro manual:**
  1. Cadastre usuário inativo.
  2. Disparar ativação.
  3. Verifique recebimento do e-mail e funcionamento do link.
- **Roteiro automatizado:**
  1. Disparar gatilho de ativação.
  2. Validar conteúdo/estrutura do e-mail.
  3. Validar token e expiração.

### CA-3 — Login com e-mail e senha

- **Tipo:** manual e automatizado
- **Roteiro manual:**
  1. Ative conta.
  2. Defina senha válida.
  3. Faça login e verifique acesso ao dashboard.
- **Roteiro automatizado:**
  1. Simular login com credenciais válidas.
  2. Validar retorno de sessão/token.
  3. Validar acesso autorizado.

### CA-4 — Bloqueio por 30 minutos após 5 tentativas incorretas

- **Tipo:** manual e automatizado
- **Roteiro manual:**
  1. Realize 5 tentativas com senha incorreta.
  2. Verifique mensagem de bloqueio.
  3. Tente fazer login novamente antes do tempo esgotar e confirme a proibição.
- **Roteiro automatizado:**
  1. Simular 5 falhas.
  2. Simular nova tentativa.
  3. Validar bloqueio e tempo de liberação.

### CA-5 — Regra de complexidade de senha

- **Tipo:** manual e automatizado
- **Roteiro manual:**
  1. Tente define senhas fracas.
  2. Verifique rejeição.
  3. Defina senha aceitável e confirme sucesso.
- **Roteiro automatizado:**
  1. Enviar vários exemplos de senha.
  2. Validar aceite/rejeição conforme regra.

### CA-6 — Recuperação de senha com token válido por 1 hora

- **Tipo:** manual e automatizado
- **Roteiro manual:**
  1. Solicite recuperação de senha.
  2. Receba e use o link.
  3. Redefina a senha e confirme nova entrada no sistema.
- **Roteiro automatizado:**
  1. Gerar link de recuperação.
  2. Validar expiração após 1 hora.
  3. Validar alteração confirmada dentro do prazo.

---

## Testes de frontend

- **Login:** campos, mensagens de erro e redirecionamento.
- **Bloqueio:** tratamento visual da mensagem de conta bloqueada.
- **Recuperação de senha:** fluxo completo no cliente.
- **Consumo de API:** verificação de respostas e tratamento de erros.

---

## Evidências

- Evidência será registrada em `docs/product/test-evidence.md` após a execução.
- Cada evidência deve conter:
  - ID do critério de aceite
  - Ambiente testado
  - Resultado
  - Observações
  - Responsável

---

## Handoff

- **Entrada lida:** `docs/product/user-stories.md`, `docs/product/sprint-prioritization.md`, `docs/product/bugs.md`
- **Decisões tomadas:** plano de testes criado com roteiros manuais e automatizados
- **Dúvidas e riscos:** execução dependente do ambiente Laravel/React instalado
- **Saída gravada:** `docs/product/test-plan.md`
- **Status:** approved

## Aprovação do QA

- **Agente:** QA
- **Data:** 2026-09-16
- **Justificativa:** plano estruturado para validar a Sprint 1 antes da implementação real.
