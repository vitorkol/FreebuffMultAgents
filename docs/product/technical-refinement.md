# Refinamento técnico

**Produzido por:** Tech Leader
**Data:** 2026-09-16
**Entrada lida:** docs/product/user_stories.md
**Histórias em scope desta sprint:** US-01 a US-10 para MVP/Sprint 1, conforme definição do product owner e refinamento da sprint.

## Decisões tomadas
- Stack definida pelo produto: Laravel no backend e React no frontend.
- MVP é web e responsivo; não há app nativo nesta sprint.
- Videoaulas são por link externo; upload nativo de vídeo não entra aqui.
- Correção automática de provas vale para objetivas; dissertativas ficam para o professor.
- Provas devem ter timer, salvamento automático e retomada com tempo mantido no servidor.
- Exportação PDF do relatório individual é desejável, mas não bloqueante para a Sprint 1.
- Login de pais não entra neste refinamento.

## Arquitetura resumida

### 01 — Separação de bounded contexts
- Autenticação e contas
- Gestão acadêmica: turmas, disciplinas e associações
- Conteúdo: aulas, anexos, links
- Avaliação: atividades, provas, notas
- Dashboards e relatórios
- Notificações

### 02 — Backend Laravel
- API voltada a consumo por React, com rotas versionadas quando necessário.
- Comandos ou jobs síncronos e assíncronos separados conforme complexidade.
- Persistência em SQLite para ambiente local, migratável para banco relacional posteriormente.
- Arquivos anexos tratados como artefatos de entidade, com validação básica de tipo/tamanho.
- Links externos validados como URL e armazenados como referência, não como arquivo para hospedagem de vídeo.

### 03 — Frontend React
- Consumo da API backend.
- Entrada de dados com estados claros de erro, carregamento e sucesso.
- Salvamento automático tratado no frontend durante prova, com confirmação de persistência no servidor.
- Responsividade como requisito de qualidade da interface.

### 04 — Regras de negócio de maior risco
- Edição da aula após o primeiro acesso do aluno: não pode alterar conteúdo já acessado de forma confusa.
- Prazo de entrega: deve ser centralizado e impeditivo no backend, não apenas no frontend.
- Timer de prova e salvamento automático: o tempo deve ser controlado no servidor para evitar contornamento do limite.
- Reenvio de entrega: até o prazo o aluno pode reenviar; depois só com liberação do professor.
- Perfis e acesso: não misturar comportamento de admin, professor e aluno nas mesmas telas sem controle de autorização.

## Riscos

### R9 — Complexidade do módulo de provas
- Dependência: temporizador, salvamento automático, retomada e correção de objetivas.
- Mitigação: escopo limitado a objetivas no MVP; testar contorno de tempo e persistência com cenários de corte de conexão.

### R8 — Adoção por professores novatos
- Dependência: experiência de uso em primeiro acesso.
- Mitigação: incluir manual/guia de primeiro acesso (US-09) e manter fluxos curtos.

### R7 — Conectividade dos alunos
- Dependência: prova e entrega online.
- Mitigação: salvamento automático, retomada e download de material quando permitido.

### R6 — Concurrency de usuários
- Dependência: comportamento do sistema com múltiplos acessos simultâneos.
- Mitigação: validar sob carga razoável e monitorar gargalos na avaliação.

### R5 —ônica de permissões e regras de edição
- Dependência: controle de quem edita, quem acessa e quando.
- Mitigação: políticas claras de acesso e regras explícitas nos critérios de aceite das histórias.

### R4 — Definição do critério de “10 minutos”
- Dependência: medição de usabilidade para US-01.
- Mitigação: condição confirmada pelo Product Owner; QA deve reproduzir no plano de teste.

## Task técnica por história

### US-01 — Publicar aula
- Modelo de aula com título, descrição, turma, data, tipo e referências de anexo/link.
- API de criação e publicação com validação de campos obrigatórios.
- Frontend de criação com feedback claro.
- Regra de edição pós-acesso a ser aplicada.

### US-02 — Entregar atividade
- Modelo de entrega com prazo e tipo de entrega.
- Validação de prazo no backend.
- Reenvio permitido até o prazo.
- Controle de liberação pós-prazo.

### US-03 — Prova objetiva com timer
- Modelo de prova, questão objetiva, resposta e estado de salvamento.
- Serviço de timer controlado pelo servidor.
- Salvamento automático e retomada.
- Correção automática de objetivas.

### US-04 — Participação da turma
- Dashboard com contagem de visualizações e entregas.
- Filtro básico por turma.

### US-05 — Notas e feedback
- Lançamento de nota por professor.
- Visualização de notas e comentários por aluno.

### US-06 — Indicadores do coordenador
- Dashboard básico com KPIs de entrega e desempenho.
- Relatório individual do aluno.
- Exportação PDF como tarefa condicional.

### US-07 — Cadastro de usuários e turmas
- Cadastro manual.
- Importação por planilha com validação e sinalização de falhas.
- Edição de turma mantendo histórico.

### US-08 — Recuperação de senha
- Fluxo de solicitação e redefinição por e-mail.

### US-09 — Manual do primeiro acesso
- Entrega de orientação/aula introdutória ao professor no primeiro login.

### US-10 — Configuração de notificações
- Preferência de notificação por usuário.
- Aplicação da regra no envio de notificações relevantes.

## Estimativa grossa
- Volume: 10 histórias MVP propostas para Sprint 1.
- Complexidade maior: US-03, US-04 e US-06 têm a maior densidade técnica.
- Complexidade média: US-01, US-02, US-05, US-07.
- Complexidade menor: US-08, US-09, US-10.
- Consideração: estimativa preliminar; detalhamento de tarefas técnicas e poker deve ser feito após alinhamento do equipe.

## Critérios de fechamento técnico
- Cada história implementada só é feita após aprovação do ANR e do Tech Leader.
- QA deve ter critérios de aceite testáveis antes do desenvolvimento.
- Se houver falha em QA, documentar em bugs.md e retornar ao Developer.

## Handoff do Tech Leader
- Entrada lida: docs/product/user_stories.md
- Decisões tomadas: refinamento técnico da Sprint 1 com arquitetura resumida, riscos, tarefas técnicas e estimativa grossa.
- Dúvidas e riscos: detalhes de implementação, divisão de tarefas e precisão de estimativa dependem do refinamento do time.
- Saída gravada: docs/product/technical-refinement.md
- Status: aprovado

## Aprovação
- Agente: Tech Leader
- Data: 2026-09-16
- Justificativa: requisitos e histórias revisados; refinamento técnico alinhado ao escopo do MVP; sem implementação, apenas preparação técnica.
