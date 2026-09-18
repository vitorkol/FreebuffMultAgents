# Refinamento técnico

## 2026-09-16 — refinamento a partir de `docs/product/user-stories.md`

### Objetivo

Avaliar riscos, arquitetura, estimativas e tarefas técnicas para o MVP do Kimi Academy.

### Decisão principal considerada

- A fórmula de média final será tratada como serviço isolado e exibida como referência até decisão institucional definitiva.
- A política de arredondamento pode ser configurável, mas não deve bloquear o MVP.

### Risco principal

- Políticas escolares podem diferir para pesos, arredondamento e composição de nota.
- Mitigação: manter cálculo como referência, com ajuste manual ou configuração institucional futura.

### Arquitetura sugerida

- Backend isola cálculo de média, composição de nota e regras de avaliação.
- Frontend consome e mostra claramente o que é referência versus valor oficial.
- Entidades de peso, tipo de avaliação e rubrica devem ser modeladas separadamente.
- Logs ou rastreamento para alterações de regra pedagógica.

### Estimativa preliminar

- Histórias divididas por módulo.
- Histórias de autenticação e cadastro são pré-requisito para o resto.
- Histórias de avaliação e relatórios têm maior densidade de regra.

### Tarefas técnicas sugeridas

- Definir modelo de dados para tipos de avaliação, pesos e rubricas.
- Implementar serviço de cálculo de média como referência.
- Implementar auditoria de alterações de regra.
- Validar política de arredondamento com a instituição.

---

## Decisão de ambiente — Tech Leader

- **Decisão:** instalar e configurar os ambientes de backend e frontend antes da Sprint 1.
- **Motivo:** a implementação e a validação do QA dependem de um ambiente funcional.
- **Backlog mínimo de setup:**
  - Projeto Laravel no backend com dependências básicas
  - Projeto React no frontend com dependências básicas
  - Configuração de comunicação entre frontend e backend
  - Ambiente preparado para rodar a Sprint 1

---

## Handoff

- **Entrada lida:** `docs/product/user-stories.md`
- **Decisões tomadas:** fórmula de média final como referência; arquitetura sugerida com cálculo isolado; instalação do ambiente tem precedência antes da Sprint 1
- **Dúvidas e riscos:** versões do Laravel/React e ferramentas de build ainda são decisão do time
- **Saída gravada:** `docs/product/technical-refinement.md`
- **Status:** approved

## Aprovação

- **Agente:** Tech Leader
- **Data:** 2026-09-16
- **Justificativa:** refinamento técnico coerente com a decisão sobre fórmula de média final e com escopo do MVP; ambiente deve ser instalado antes da implementação.
