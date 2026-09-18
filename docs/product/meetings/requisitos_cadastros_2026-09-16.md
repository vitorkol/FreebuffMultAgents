# Levantamento de Requisitos - Módulo de Cadastros Básicos
**Data:** 2026-09-16  
**Duração:** 2 horas  
**Local:** Sala de Reuniões Pedagógicas  
**Facilitador:** Product Owner + Analista de Requisitos  
**Participantes:** Sra. Beatriz (Secretaria), Prof. Ricardo (Coordenação), Roberto (Professor), Ana Paula (TI), Carlos (Dev)

---

## Contexto
Após definir a autenticação, precisamos estruturar a base acadêmica. Sem turmas, disciplinas e associações, o professor não tem onde criar aula e o aluno não tem onde estudar.

---

## Agenda (120 minutos)
| Horário | Atividade |
|---------|-----------|
| 0:00 - 0:20 | Contexto: como funciona hoje na secretaria |
| 0:20 - 0:50 | Requisitos de Turmas |
| 0:50 - 1:20 | Requisitos de Disciplinas e Associações |
| 1:20 - 1:45 | Matrículas e Movimentações |
| 1:45 - 2:00 | Consolidação |

---

## Transcrição da Reunião

### [0:00 - 0:20] Contexto

**Facilitador:** Hoje vamos falar da espinha dorsal do sistema: turmas, disciplinas e como tudo se conecta. Sra. Beatriz, como a secretaria organiza isso hoje?

**Sra. Beatriz:** Hoje usamos planilhas. Uma planilha de turmas, uma de disciplinas, uma de professores, e uma matriz gigante que cruza tudo. É um pesadelo quando muda algo.

**Prof. Ricardo:** E no início do ano, demora uma semana para organizar tudo. Se um professor fica doente e precisamos trocar, é caos.

**Facilitador:** Então o sistema precisa ser flexível. Vamos por partes.

---

### [0:20 - 0:50] Turmas

**Facilitador:** O que é uma turma no Kimi Academy?

**Sra. Beatriz:** Uma turma tem: nome, ano letivo, série/ano de ensino, turno, sala física (opcional), data de início, data de término.

**Prof. Ricardo:** E status. Uma turma pode estar ativa, encerrada, ou em formação.

**Ana Paula:** E código da turma? Para identificação única?

**Sra. Beatriz:** Sim. Sugiro: ano + série + turno + sequencial. Ex: 2026-2A-M-01.

**Carlos:** Técnicamente, podemos gerar automaticamente ou deixar a secretaria definir.

**Facilitador:** Vamos deixar a secretaria definir, com validação de formato. E se ela não definir, o sistema sugere.

- **RF-CAD-001:** O sistema deve permitir cadastro de turmas com: nome, código único, ano letivo, série/ano, turno, sala, data início, data término, status.
- **RF-CAD-002:** O código da turma deve ser único e validado.
- **RF-CAD-003:** O sistema deve sugerir código automático se não informado.

**Roberto:** E turmas do mesmo ano letivo? 2026 pode ter turmas de ensino médio e técnico.

**Sra. Beatriz:** Sim. Precisamos de um campo "Nível de ensino" ou "Curso".

- **RF-CAD-004:** O cadastro de turma deve incluir nível/curso (Ensino Fundamental, Médio, Técnico, etc.).

**Prof. Ricardo:** E turmas multisseriadas? Ou disciplinas eletivas onde alunos de séries diferentes ficam juntos?

**Facilitador:** No MVP, vamos manter turmas homogêneas por série. Eletivas e multisseriadas são complexidade para fase 2.

- **RF-CAD-005:** No MVP, turmas são homogêneas por série. Eletivas/multisseriadas são funcionalidade futura.

**Ana Paula:** E exclusão de turma? Se cadastrei errado?

**Carlos:** Se não tiver alunos nem aulas, pode excluir. Se tiver dados, só inativa.

- **RF-CAD-006:** Turmas sem alunos e sem aulas podem ser excluídas. Com dados, apenas inativadas.

---

### [0:50 - 1:20] Disciplinas e Associações

**Facilitador:** Agora disciplinas. O que é uma disciplina?

**Prof. Ricardo:** Matemática, Português, Física... Cada uma tem nome, carga horária, e às vezes ementa.

**Sra. Beatriz:** E código da disciplina. Ex: MAT-001.

- **RF-CAD-007:** O sistema deve permitir cadastro de disciplinas com: nome, código único, carga horária, ementa (opcional).

**Roberto:** E associação professor-disciplina-turma. Como funciona?

**Facilitador:** Essa é a peça central. O professor precisa estar vinculado a uma disciplina em uma turma.

**Prof. Ricardo:** Um professor pode dar a mesma disciplina em várias turmas. E uma turma tem várias disciplinas.

**Carlos:** Técnicamente, é uma tabela de relacionamento N:N com atributos. Professor X Disciplina X Turma.

**Ana Paula:** E se dois professores dividem a mesma disciplina na mesma turma?

**Prof. Ricardo:** Acontece. Matemática pode ter professor titular e substituto.

**Facilitador:** Então a associação permite múltiplos professores por disciplina-turma, com indicação de titular/substituto.

- **RF-CAD-008:** O sistema deve permitir associar professor(es) a disciplina(s) em turma(s).
- **RF-CAD-009:** Uma disciplina-turma pode ter múltiplos professores, com indicação de titular ou substituto.
- **RF-CAD-010:** Um professor pode estar associado a múltiplas disciplinas e turmas.

**Sra. Beatriz:** E como a secretaria faz isso na prática? Uma por uma?

**Carlos:** Podemos ter importação de CSV para associações também. A secretaria manda planilha com: código turma, código disciplina, e-mail professor.

- **RF-CAD-011:** O sistema deve permitir importação de associações professor-disciplina-turma via CSV.

**Roberto:** E se eu, professor, for removido de uma turma no meio do ano?

**Prof. Ricardo:** A associação é inativada, não excluída. O histórico permanece.

- **RF-CAD-012:** Remoção de professor de turma inativa a associação, preservando histórico.

**Ana Paula:** E o aluno? Como entra na turma?

**Facilitador:** Vamos para matrículas.

---

### [1:20 - 1:45] Matrículas e Movimentações

**Sra. Beatriz:** A matrícula liga aluno a turma. Um aluno está em uma turma para aquele ano letivo.

**Prof. Ricardo:** E se o aluno muda de turma no meio do ano? Troca de turno?

**Sra. Beatriz:** Acontece. Precisamos de transferência de turma.

**Facilitador:** Então:
- **RF-CAD-013:** O sistema deve permitir matricular aluno em turma.
- **RF-CAD-014:** O sistema deve permitir transferência de aluno entre turmas, com registro de data e motivo.
- **RF-CAD-015:** O histórico de turmas do aluno deve ser preservado.

**Juliana:** E se eu repetir de ano? Fico na mesma turma?

**Sra. Beatriz:** Não. Você é matriculada na turma do novo ano letivo.

**Carlos:** Então a matrícula é sempre por ano letivo. O aluno pode ter várias matrículas (uma por ano), mas só uma ativa.

- **RF-CAD-016:** Cada aluno deve ter apenas uma matrícula ativa por ano letivo.

**Ana Paula:** E importação de matrículas?

**Sra. Beatriz:** Sim, CSV com: nome aluno, e-mail, CPF, código turma.

- **RF-CAD-017:** O sistema deve permitir importação de matrículas via CSV.

**Prof. Ricardo:** E turmas de recuperação paralela? Aluno fazendo matéria em turma diferente?

**Facilitador:** No MVP, não. Um aluno, uma turma. Recuperação paralela é fase 2.

- **RF-CAD-018:** No MVP, um aluno está matriculado em apenas uma turma por vez.

---

### [1:45 - 2:00] Consolidação

**Facilitador:** Resumo: turmas com código único, disciplinas com carga horária, associações professor-disciplina-turma, matrículas com histórico, tudo importável por CSV.

**Carlos:** Técnicamente, são entidades relacionais bem definidas. Laravel com Eloquent resolve bem.

**Sra. Beatriz:** Da secretaria, precisamos dos templates de CSV. Vou preparar.

**Facilitador:** Próxima reunião: Gestão de Cursos e Conteúdos — como o professor estrutura o que vai ensinar.

---

## Requisitos Consolidados

### Funcionais
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-CAD-001 | Cadastro de turmas | Alta |
| RF-CAD-002 | Código único de turma | Alta |
| RF-CAD-003 | Sugestão automática de código | Baixa |
| RF-CAD-004 | Nível/curso da turma | Alta |
| RF-CAD-005 | Turmas homogêneas no MVP | Alta |
| RF-CAD-006 | Exclusão vs inativação de turma | Média |
| RF-CAD-007 | Cadastro de disciplinas | Alta |
| RF-CAD-008 | Associação professor-disciplina-turma | Alta |
| RF-CAD-009 | Múltiplos professores por disciplina-turma | Média |
| RF-CAD-010 | Professor em múltiplas turmas/disciplinas | Alta |
| RF-CAD-011 | Importação de associações via CSV | Média |
| RF-CAD-012 | Inativação preservando histórico | Média |
| RF-CAD-013 | Matrícula de aluno em turma | Alta |
| RF-CAD-014 | Transferência entre turmas | Média |
| RF-CAD-015 | Histórico de turmas do aluno | Média |
| RF-CAD-016 | Uma matrícula ativa por ano letivo | Alta |
| RF-CAD-017 | Importação de matrículas via CSV | Média |
| RF-CAD-018 | Um aluno por turma no MVP | Alta |

---
*Documento gerado em 2026-09-16*
