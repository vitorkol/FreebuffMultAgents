# Protótipos — Sprint 1 · Autenticação e cadastro

**Agente:** Designer (Biome DS Specialist)
**Data:** 2026-09-21
**Status:** entregue ao ANR (aguardando validação)

## Entrada lida

- `docs/product/user-stories.md` — História 1 — Autenticação e cadastro (status: approved)
- `docs/product/requirements.md` — RN/RF/RNF derivadas das reuniões em `docs/product/meetings/`
- `agents/knowledge/designSystem/biomeDS/src/tokens.css` — fonte de verdade dos tokens (nenhum valor inventado)

## Verificação obrigatória (fluxo definido em agents/agents.md)

### a) Critérios de Aceite (CA)

| CA | O que exige | Cobertura no protótipo |
|---|---|---|
| CA-1 | Admin importa CSV e cria usuários inativos | `04-importacao-usuarios.html`: dropzone, modelo de CSV, validação linha a linha, badge "usuário inativo", resumo 42/39/3 |
| CA-2 | E-mail de ativação com link para definir senha | `04` (fluxo pós-importação) + `03-definicao-senha.html` (destino do link, estado de sucesso) |
| CA-3 | Login com e-mail e senha | `01-login.html`: formulário completo com autocomplete e validação |
| CA-4 | Bloqueio de 30 min após 5 tentativas | `01-login.html`: estado de bloqueio com horário de liberação + aviso prévio na dica do campo senha |
| CA-5 | Complexidade de senha | `03-definicao-senha.html`: checklist ao vivo (8+ caracteres, maiúsculas/minúsculas, número, símbolo) |
| CA-6 | Recuperação com token válido por 1 hora | `02-recuperacao-senha.html` (solicitação) + `03` (estado "link expirado") |

### b) RN, RF e RNF

- **RF de importação:** pré-visualização antes de confirmar; erros linha a linha sem abortar o lote.
- **RN de bloqueio:** mensagem não revela se o e-mail existe (evita enumeração de contas); contador de tentativas restantes.
- **RN de senha:** regras exibidas antes e durante a digitação; confirmação obrigatória.
- **RNF de segurança:** tokens de 1h com mensagem de expiração clara; estados de erro não expõem detalhes internos.
- **RNF de acessibilidade (WCAG 2.1 AA):** HTML semântico (`header`, `main`, `aside`, `nav`, `footer`), `label` associado a todo campo, `role="alert"`/`role="status"` nos estados, foco visível (`outline` com token `--ring`), contraste AA com os tokens do DS, navegação por teclado.
- **RNF de consistência:** sidebar/topbar e cabeçalho alinhados ao padrão visual do sistema (ver `05-dashboard.html`).

### c) Cenários BDD

- **"Login válido de professor"** → `01-login.html` estado de sucesso + `05-dashboard.html` (o professor vê seu dashboard). 
- **"Bloqueio após tentativas incorretas"** → `01-login.html` estado de bloqueio (impede login e informa os 30 minutos).

## Mapeamento spec → componentes Biome DS

- Formulários → `Input`, `Label`, `Button` (primary/ghost), dicas e erro via `--color-input-error` / `--label-required`
- Mensagens de estado → `Alert` (warning/error/success/info, variantes surface)
- Tabela de validação do CSV → `Table` + `Badge` (status por linha)
- Navegação → sidebar `nav` + topbar com `Avatar` e menu
- Métricas do dashboard → cartões com tokens `--card`, `--radius-lg`, `--shadow-sm`
- Tokens: `--primary #264c37`, `--brand-green #198754`, `--brand-lime #92b123`, fontes Poppins (display) e Roboto (texto), spacing 4px, radius 4–24px — todos de `biomeDS/src/tokens.css`

## Artefatos gerados

- `docs/product/prototype/index.html` — galeria navegável
- `docs/product/prototype/01-login.html`
- `docs/product/prototype/02-recuperacao-senha.html`
- `docs/product/prototype/03-definicao-senha.html`
- `docs/product/prototype/04-importacao-usuarios.html`
- `docs/product/prototype/05-dashboard.html`

## Decisões tomadas

- Protótipos em HTML/CSS puro (dual-delivery: podem evoluir para React/TSX consumindo `@biome/design-system`).
- Estados desenhados lado a lado com a tela base para facilitar validação do ANR e servir de spec para o Developer.

## Dúvidas e riscos

- Duplicação de e-mail no CSV: protótipo assume erro por linha (CA-1); confirmar com ANR se deve haver opção de "atualizar existente".
- Texto do e-mail de ativação (CA-2) não faz parte do protótipo de UI; sugerido alinhar com o modelo de notificação do backend.

## Saída gravada / Status

- Saída: `docs/product/prototype/` (6 arquivos) + este registro.
- **Correção aplicada em 2026-09-21:** divergência da regra de complexidade de senha detectada durante o gate de validação — o protótipo exibia mínimo de 12 caracteres enquanto RF-07 exige 8. Protótipo alinhado a 8 caracteres, em conformidade com RF-07 e com backend/frontend.
- **Status: aprovado pelo ANR (gate 6 — 2026-09-21).** Validação concluída: a) CA-1 a CA-6 cobertos nas telas 01–05; b) RN/RF/RNF refletidas (mensagem de bloqueio não revela existência da conta, checklist de senha visível durante a digitação, RNF de acessibilidade WCAG 2.1 AA presente); c) cenários BDD "Login válido de professor" e "Bloqueio após tentativas incorretas" representados nos estados das telas 01 e 05. Próximo passo do fluxo: Tech Leader já refinado (etapa 7 registrada em `technical-refinement.md`), Sprint 1 priorizada (etapa 8) e implementação em andamento (etapa 9).
