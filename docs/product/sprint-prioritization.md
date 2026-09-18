# Priorização da sprint

**Produzido por:** ANR
**Data:** 2026-09-16
**Entrada lida:** docs/product/user_stories.md e docs/product/technical-refinement.md

## Decisões tomadas
- A Sprint 1 prioriza as histórias que habilitam autenticação, cadastros e dashboards, seguindo o roteiro vindo do roadmap de desenvolvimento do MVP.
- Histórias dependem de refinamento técnico aprovado e só podem ser implementadas após aprovação do ANR e do Tech Leader.
- Exportação PDF foi deixada como desejável e condicional, não obrigatória para entrega básica da Sprint 1.

## Histórias selecionadas para a Sprint 1

### 1 — US-08 — Recuperação de senha
- Justificativa: habilita recuperação de acesso e é pré-requisito prático de uma plataforma com login.
- Prioridade: alta.

### 2 — US-07 — Admin cadastra usuários e turmas
- Justificativa: sem cadastro e sem turmas/disciplinas, as histórias de aula e avaliação não têm contexto.
- Prioridade: alta.

### 3 — US-01 — Professor publica uma aula simples
- Justificativa: núcleo do valor do produto; o objetivo de publicação rápida foi confirmado pelo Product Owner.
- Prioridade: alta.

### 4 — US-02 — Aluno entrega atividade
- Justificativa: parte fundamental da avaliação e do feedback; depende de turmas e aulas habilitadas.
- Prioridade: alta.

### 5 — US-05 — Aluno veja notas e feedback
- Justificativa: fechamento da ciclo de avaliação para o aluno; depende de lançamento de nota.
- Prioridade: alta.

### 6 — US-04 — Professor veja participação da turma
- Justificativa: visibilidade pedagógica básica para o professor e alinhada ao objetivo de adoção.
- Prioridade: alta.

### 7 — US-10 — Configuração de notificações
- Justificativa: funcionalidade aprovada nas reuniões e importante para adoção sem sobrecarga de comunicação.
- Prioridade: média.

### 8 — US-09 — Manual do primeiro acesso
- Justificativa: redução de risco de adoção por professores novatos; menor complexidade técnica.
- Prioridade: média.

### 9 — US-06 — Coordenador consulte indicadores pedagógicos
- Justificativa: visibilidade da coordenação; pode ir para a Sprint 1 se a equipe tiver capacidade, mas a exportação PDF permanece condicional.
- Prioridade: alta com ressalva de capacidade.

### 10 — US-03 — Aluno realiza prova objetiva com timer
- Justificativa: funcionalidade central, mas maior densidade técnica; pode ser inicializada na Sprint 1 se a equipe permitir.
- Prioridade: alta com ressalva de complexidade.

## O que não entra na Sprint 1
- Questões dissertativas com correção manual.
- Fórum de dúvidas.
- Biblioteca pessoal do professor.
- Calendário acadêmico.
- App mobile.
- Chat em tempo real.
- Gamificação.
- Certificados automáticos.
- Integração com Google Classroom.

## Critérios de composição da sprint
- Autenticação e recuperação de senha.
- Cadastro e gestão básica de turmas/disciplinas.
- Criação/publicação de aula com anexo ou link externo.
- Entrega de atividade com prazo.
- Notas, feedback e dashboards básicos.
- Notificações configuráveis.
- Manual do primeiro acesso.
- Provas objetivas com timer e salvamento automático, se houver capacidade de equipe.

## Dependências críticas
- Sem cadastro de turmas/disciplinas, as histórias de criação de aula e entrega não são plenamente testáveis.
- Sem lançamento de nota, a história de notas do aluno não é concluível.
- Sem prova objetiva implementada, o critério de salvamento automático e timer não pode ser validado.

## Riscos de sprint
- Risco 1: excesso de histórias de complexidade média/alta para o tamanho da equipe disponível.
- Risco 2: provas objetivas podem demandar mais tempo que o estimado inicialmente.
- Risco 3: critério de “até 10 minutos” para US-01 precisa ser testado como condição realista e não apenas como afirmação de produto.

## Handoff do ANR
- Entrada lida: docs/product/user_stories.md e docs/product/technical-refinement.md
- Decisões tomadas: priorização da Sprint 1 focada em autenticação, cadastros e dashboards, com provas objetivas como história complexa opcional dentro da capacidade da equipe.
- Dúvidas e riscos: composição exata da sprint deve considerar a capacidade da equipe; exportação PDF e prova objetiva podem ser ajustadas se necessário.
- Saída gravada: docs/product/sprint-prioritization.md
- Status: aprovado

## Aprovação
- Agente: ANR
- Data: 2026-09-16
- Justificativa: histórias e refinamento técnico revisados; priorização consistente com o roadmap do MVP, com foco no professor e na habilitação mínima para que as histórias subsequentes sejam testáveis.
