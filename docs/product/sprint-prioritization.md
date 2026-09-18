# Priorização da sprint

## 2026-09-16 — priorização do ANR

### Critérios usados

1. Valor pedagógico para professores, alunos e coordenação.
2. Risco de não adoção ou de impacto operacional.
3. Dependências técnicas identificadas no refinamento.
4. Esforço estimado e complexidade de regra de negócio.

### Definição de nível de prioridade

- **Obrigatório para o MVP:** funcionalidade que o sistema não pode entregar sem ela.
- **Desejável no MVP:** funcionalidade importante, mas que pode ser simplificada ou adiada sem quebrar o fluxo principal.
- **Pós-MVP:** funcionalidade com maior esforço ou que depende de decisão institucional ainda não consolidada.

---

## Sprint 1 — Autenticação e cadastro

**Prioridade:** obrigatório para o MVP

**Por que primeiro:**
- Sem login e perfis, nada das outras funcionalidades é acessível.
- Impacto alto na segurança e na organização do acesso.

**Histórias incluídas:**
- História 1 — Autenticação e cadastro

**Risco:**
- Regras de senha e bloqueio devem equilibrar segurança e usabilidade para professores menos familiarizados com tecnologia.

---

## Sprint 2 — Cadastros básicos

**Prioridade:** obrigatório para o MVP

**Por que segundo:**
- Turmas, disciplinas e associações são a espinha dorsal da operação.
- A base acadêmica precisa existir antes de publicar conteúdo ou avaliações.

**Histórias incluídas:**
- História 2 — Cadastros básicos

**Risco:**
- Importação via CSV e associações múltiplas podem revelar diferenças entre a realidade institucional e o modelo simplificado do MVP.

---

## Sprint 3 — Cursos e conteúdos

**Prioridade:** obrigatório para o MVP

**Por que terceiro:**
- Após a base pronta, o professor precisa organizar conteúdo de forma clara.
- É uma das funcionalidades mais visíveis para a adoção docente.

**Histórias incluídas:**
- História 3 — Cursos e conteúdos

**Risco:**
- Editor, anexos e status de publicação precisam ser simples o suficiente para o MVP, mas suficientes para uso real.

---

## Sprint 4 — Atividades e entregas

**Prioridade:** obrigatório para o MVP

**Por que quarto:**
- Entrega de atividades é um dos principais motivos de uso do aluno e do professor.
- Impacto direto na redução do trabalho offline atual.

**Histórias incluídas:**
- História 4 — Atividades e entregas

**Risco:**
- Reenvio, prazos e atraso podem precisar de decisões claras sobre comportamento esperado.

---

## Sprint 5 — Provas objetivas e correção automática

**Prioridade:** obrigatório para o MVP

**Por que quinto:**
- Provas com timer, salvamento automático e correção automática são funcionalidades estrategicamente importantes.
- Complexidade técnica maior; deve vir após os módulos anteriores.

**Histórias incluídas:**
- História 5 — Provas e avaliações objetivas

**Risco:**
- Salvamento automático, retomada após queda de conexão e bloqueio de copiar/colar merecem atenção especial.

---

## Sprint 6 — Notas, rubricas e regras de avaliação

**Prioridade:** desejável no MVP

**Por que sexto:**
- Pesos, rubricas e recuperação são relevantes, mas o MVP pode simplificar a regra de média.
- A política institucional de média final ainda não está consolidada.

**Histórias incluídas:**
- História 6 — Notas, rubricas e regras de avaliação

**Decisão adotada:**
- O sistema calcula média aritmética simples das avaliações ponderadas por tipo.
- A média ponderada é exibida como referência.
- A regra institucional definitiva pode ser configurada depois.

**Risco:**
- Diferenças entre escolas podem exigir ajustes futuros de fórmula e arredondamento.

---

## Sprint 7 — Relatórios e dashboards

**Prioridade:** desejável no MVP

**Por que sétimo:**
- Relatórios e dashboards dão visibilidade pedagógica e satisfazem demanda da coordenação e da diretoria.
- Podem ser entregues com um conjunto inicial de indicadores e ampliados depois.

**Histórias incluídas:**
- História 7 — Relatórios e dashboards

**Risco:**
- Indicadores críticos e alertas automáticos precisam de definição clara para evitar ruído no dashboard.

---

## O que fica para pós-MVP

- Tipos personalizados de avaliação mais avançados.
- Rubricas mais complexas.
- Regra institucional definitiva de média final e arredondamento.
- Relatórios mais completos e agendamento automático de relatórios.

---

## Handoff

- **Entrada lida:** `docs/product/requirements.md`, `docs/product/user-stories.md`, `docs/product/technical-refinement.md`
- **Decisões tomadas:** priorização por valor pedagógico, risco e dependência técnica; média final como referência no MVP
- **Dúvidas e riscos:** política de média final institucional ainda em aberto; regulamentos escolares podem exigir ajustes futuros
- **Saída gravada:** `docs/product/sprint-prioritization.md`
- **Status:** approved

## Aprovação

- **Agente:** ANR
- **Data:** 2026-09-16
- **Justificativa:** priorização alinhada com as histórias aprovadas e com o refinamento técnico; MVP focado em adoção docente, entrega de atividades e avaliações objetivas.

---

## Handoff para o Developer

- **Entrada lida:** `docs/product/user-stories.md`, `docs/product/sprint-prioritization.md`, `docs/product/technical-refinement.md`
- **Decisões tomadas:** implementação começa pelas histórias obrigatórias da sprint, com cálculo de média isolado e tratado como referência
- **Dúvidas e riscos:** política de média final institucional ainda não consolidada
- **Saída gravada:** decisão de implementação do Developer e próximos passos
- **Status:** approved

## Aprovação do Developer

- **Agente:** Developer
- **Data:** 2026-09-16
- **Justificativa:** histórias e priorização aprovadas; implementação pode começar pela Sprint 1 e seguir as dependências técnicas.

---

## Plano do Developer

1. Começar pela Sprint 1 — Autenticação e cadastro.
2. Implementar testes automatizados associados aos critérios de aceite sempre que viável.
3. Manter cálculo de média como serviço isolado e como referência.
4. Registar evidência de implementação para QA após cada entrega.
5. Avançar para as próximas sprints obrigatórias somente após a Sprint 1 estar implementada e testada.

---

## Implementação iniciada

- Passo 1 adotado: começar pela implementação da Sprint 1 — Autenticação e cadastro.
- Histórias alvo: História 1 — Autenticação e cadastro.
- Critérios de aceite a implementar: CA-1 até CA-6.
- BDD a considerar: Login válido e Bloqueio após tentativas incorretas.
- Riscos registrados: equilíbrio entre segurança e usabilidade para professores menos familiarizados com tecnologia.

---

## Registro da implementação — Sprint 1

- **Backend:**
  - CA-1: importação CSV e criação de usuários inativos.
  - CA-2: envio de e-mail de ativação com link para definição de senha.
  - CA-3: login com e-mail e senha.
  - CA-4: bloqueio por 30 minutos após 5 tentativas incorretas.
  - CA-5: regra de complexidade de senha.
  - CA-6: recuperação de senha com token válido por 1 hora.
  - Rastreabilidade de bloqueio e tentativas para auditoria.

- **Frontend:**
  - Fluxo de login com e-mail e senha.
  - Tela de erro para bloqueio e tentativas incorretas.
  - Formulário de recuperação de senha.
  - Consumo dos serviços de autenticação do backend.

- **Testes automatizados:**
  - Associados a CA-3, CA-4 e CA-6 quando viável.
  - Backend e frontend testados conforme responsabilidade de cada lado.

- **Evidência:**
  - Registrada para QA após a conclusão da Sprint 1.

---

## Próximos passos do Developer

1. Instalar e configurar backend e frontend antes de codificar a Sprint 1.
2. Implementar a Sprint 1 — Autenticação e cadastro.
3. Finalizar ajustes da Sprint 1 se necessário.
4. Preparar evidência de implementação para QA.
5. Avançar para Sprint 2 — Cadastros básicos após QA validar a Sprint 1.

---

## Instalação do ambiente — Developer

- **Backend:** Laravel instalado em `backend/`.
- **Frontend:** React+Vite instalado em `frontend/`.
- **Próximo passo:** instalar dependências do frontend e ajustar ambiente antes de QA.

---

## Ação do Developer — confirmação do ambiente

- **Backend:** Laravel instalado em `backend/`.
- **Frontend:** React+Vite instalado em `frontend/`.
- **Status:** instalados; pendente de instalação de dependências e ajustes de ambiente.
- **Próximo passo:** instalar dependências do frontend e ajustar ambiente para QA.

---

## Implementação da Sprint 1 — Developer (backend primeiro)

- **Backend:**
  - CA-1: importação CSV e criação de usuários inativos.
  - CA-2: envio de e-mail de ativação com link para definição de senha.
  - CA-3: login com e-mail e senha.
  - CA-4: bloqueio por 30 minutos após 5 tentativas incorretas.
  - CA-5: regra de complexidade de senha.
  - CA-6: recuperação de senha com token válido por 1 hora.
  - Rastreabilidade de bloqueio e tentativas para auditoria.
  - Regra de média isolada e tratada como referência.

- **Frontend:**
  - Implementação aguardando backend pronto.
  - Fluxo de login, tela de erro de bloqueio e recuperação de senha planejados.
  - Consumo dos serviços de autenticação do backend.

- **Testes automatizados:**
  - CA-3, CA-4 e CA-6 prioritários no backend.
  - Frontend testado após integração.

- **Evidência:**
  - Preparada para QA após backend e frontend implementados.

---

## Próximos passos do Developer

1. Finalizar backend da Sprint 1.
2. Implementar frontend da Sprint 1.
3. Preparar evidência de implementação para QA.
4. Avançar para Sprint 2 — Cadastros básicos após QA validar a Sprint 1.

---

## Pendência de ambiente antes da implementação

- **Problema:** `backend/` e `frontend/` ainda não contêm projetos Laravel e React instalados/configurados.
- **Pendência:** instalar e configurar o ambiente backend e frontend antes de codificar a Sprint 1.
- **Status:** aberto
- **Registro:** `docs/product/bugs.md` e `docs/product/open-questions.md`
- **Decisão do Tech Leader:** instalar e configurar backend e frontend antes da Sprint 1.
- **Ação do Developer:** instalar e configurar backend Laravel e frontend React antes de implementar a Sprint 1.

---

## 2026-09-16 — decisão do Tech Leader

- **Decisão:** instalar e configurar backend e frontend antes da Sprint 1.
- **Motivo:** implementação e QA dependentes do ambiente.
- **Status:** registrada em `docs/product/technical-refinement.md`.

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

## Evidência preparada para QA

- **Backend:** regras de autenticação, bloqueio e recuperação registradas pelo Developer.
- **Frontend:** fluxo de login, bloqueio e recuperação registrados pelo Developer.
- **Integração:** frontend consumindo os serviços de autenticação.
- **Ação:** QA deve executar o plano em `docs/product/test-plan.md`.

---

## 2026-09-17 — implementação real concluída (Sprint 1)

- **Ambiente:** pendência do PHP resolvida — `php8.3` com extensões locais via `backend/php83.sh` (registro em `docs/product/bugs.md`).
- **Backend (CA-1 a CA-6):** importação CSV, ativação por e-mail, login Sanctum, bloqueio 30min/5 tentativas com auditoria, complexidade de senha e reset com token de 1h via Password Broker.
- **Testes backend:** 21/21 verdes (51 asserções) — `cd backend && ./php83.sh vendor/bin/phpunit`.
- **Frontend:** telas de login (com bloqueio/tentativas), recuperação, definição de senha e dashboard; build e lint limpos.
- **Próximo passo:** QA executa `docs/product/test-plan.md` e registra evidências em `docs/product/test-evidence.md`.
