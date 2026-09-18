# Levantamento de Requisitos - Módulo de Aulas, Atividades e Provas
**Data:** 2026-09-16  
**Duração:** 2 horas  
**Local:** Laboratório de Informática  
**Facilitador:** Product Owner + Analista de Requisitos  
**Participantes:** Roberto (Professor), Professora Helena (Professora), Juliana (Aluna), Pedro (Aluno), Carlos (Dev), Ana Paula (TI), Prof. Ricardo (Coordenação)

---

## Contexto
Este é o módulo mais crítico para o aluno e o professor. É onde acontece a entrega de atividades, a realização de provas e o feedback pedagógico.

---

## Agenda (120 minutos)
| Horário | Atividade |
|---------|-----------|
| 0:00 - 0:15 | Contexto e expectativas |
| 0:15 - 0:50 | Atividades e Entregas |
| 0:50 - 1:30 | Provas e Avaliações Online |
| 1:30 - 1:50 | Feedback e Notas |
| 1:50 - 2:00 | Consolidação |

---

## Transcrição da Reunião

### [0:00 - 0:15] Contexto

**Facilitador:** Hoje vamos ao núcleo da experiência: como o aluno entrega trabalho e faz prova, e como o professor corrige e dá nota. Roberto, como funciona hoje?

**Roberto:** Hoje eu mando a atividade por e-mail ou WhatsApp. Os alunos respondem em foto de caderno, PDF, ou texto. Eu anoto a nota em planilha. É desorganizado.

**Juliana:** E quando é prova online no sistema atual, se a internet cai, a gente perde tudo. Já chorei por causa disso.

**Pedro:** E às vezes o professor demora semanas para devolver a nota. A gente não sabe se errou ou acertou.

**Facilitador:** Então precisamos de: entrega organizada, prova segura, correção ágil e feedback claro.

---

### [0:15 - 0:50] Atividades e Entregas

**Facilitador:** Vamos às atividades. O que é uma atividade no Kimi Academy?

**Roberto:** É uma tarefa que o professor passa, com prazo de entrega. O aluno entrega arquivo ou resposta online.

**Professora Helena:** E precisa de instruções claras. O que o aluno deve fazer, como deve fazer, critérios de avaliação.

- **RF-ATI-001:** O sistema deve permitir que o professor crie atividades com: título, descrição/instruções, critérios de avaliação, prazo de entrega, tipo de entrega.

**Juliana:** Tipo de entrega?

**Facilitador:** Arquivo (PDF, DOC, imagem) ou resposta online (texto no sistema).

- **RF-ATI-002:** O tipo de entrega pode ser: upload de arquivo ou resposta em campo de texto.
- **RF-ATI-003:** O sistema deve aceitar arquivos PDF, DOC/DOCX, JPG, PNG (máx 20MB).

**Pedro:** E se eu enviar o arquivo errado?

**Facilitador:** Até o prazo, você pode reenviar. O sistema mantém o histórico de envios.

- **RF-ATI-004:** O aluno deve poder reenviar a atividade até o prazo, preservando histórico de envios.

**Roberto:** E se o aluno não entregar no prazo?

**Prof. Ricardo:** O sistema marca como "Atrasada". O professor decide se aceita ou não.

- **RF-ATI-005:** Atividades entregues após o prazo devem ser marcadas como "Atrasada".
- **RF-ATI-006:** O professor deve poder aceitar ou recusar entregas atrasadas.

**Ana Paula:** E o prazo? É data e hora?

**Facilitador:** Sim. "Entregar até 20/10/2026 às 23:59". Depois disso, bloqueia.

- **RF-ATI-007:** O prazo deve ser definido com data e hora.

**Juliana:** E se eu quiser entregar antes?

**Facilitador:** Pode. O sistema aceita a qualquer momento antes do prazo.

**Professora Helena:** E rascunho? Eu gosto de escrever a resposta e revisar antes de enviar.

**Facilitador:** Para respostas online, há botão "Salvar rascunho". O aluno pode editar até clicar "Entregar".

- **RF-ATI-008:** Para entregas em texto, o sistema deve permitir salvar rascunho antes da entrega final.

**Carlos:** E notificações? O aluno precisa ser lembrado?

**Ana Paula:** Sim. 24 horas antes do prazo, e no dia do prazo.

- **RF-ATI-009:** O sistema deve enviar notificação ao aluno 24h antes e no dia do prazo.

---

### [0:50 - 1:30] Provas e Avaliações Online

**Facilitador:** Agora provas. Essa é a parte mais complexa. Vamos com calma.

**Roberto:** Uma prova tem: título, instruções, tempo de duração, data de início e fim, e as questões.

**Prof. Ricardo:** E o professor precisa poder visualizar como a prova ficará antes de publicar.

- **RF-PRO-001:** O sistema deve permitir criação de provas com: título, instruções, tempo de duração, data/hora de início, data/hora de término.
- **RF-PRO-002:** O professor deve poder visualizar prévia da prova antes de publicar.

**Carlos:** E as questões? Quais tipos no MVP?

**Facilitador:** No MVP, só objetivas: múltipla escolha e verdadeiro/falso. Dissertativas são Onda 2.

- **RF-PRO-003:** No MVP, o sistema deve suportar questões objetivas: múltipla escolha (com 1 resposta correta) e verdadeiro/falso.

**Roberto:** E quantas alternativas na múltipla escolha?

**Facilitador:** Mínimo 2, máximo 5. O professor define.

- **RF-PRO-004:** Múltipla escolha deve permitir de 2 a 5 alternativas.

**Juliana:** E se eu marcar uma alternativa e quiser mudar?

**Facilitador:** Pode mudar até clicar "Finalizar".

- **RF-PRO-005:** O aluno deve poder alterar respostas durante a prova, antes de finalizar.

**Pedro:** E o tempo? Como funciona?

**Facilitador:** O professor define o tempo (ex: 30 minutos). O cronômetro começa quando o aluno clica "Iniciar". Se o tempo acabar, a prova é entregue automaticamente com as respostas dadas.

- **RF-PRO-006:** O sistema deve exibir cronômetro regressivo visível durante toda a prova.
- **RF-PRO-007:** Ao término do tempo, a prova deve ser entregue automaticamente.

**Juliana:** E se minha internet cair?

**Carlos:** Salvamento automático a cada resposta. O estado é persistido no servidor. Quando você volta, continua de onde parou.

- **RF-PRO-008:** O sistema deve salvar respostas automaticamente a cada interação.
- **RF-PRO-009:** O aluno deve poder retomar a prova após queda de conexão, sem perder respostas.

**Ana Paula:** E trapaça? O aluno pode abrir outra aba?

**Carlos:** No MVP, não teremos monitoramento anti-trapaça sofisticado. Mas podemos desabilitar copiar/colar e alertar se o aluno sai da aba.

- **RF-PRO-010:** O sistema deve desabilitar copiar/colar durante a prova.
- **RF-PRO-011:** O sistema deve registrar quantas vezes o aluno sai da aba da prova.

**Prof. Ricardo:** E correção automática?

**Facilitador:** Para objetivas, sim. O sistema corrige na hora. O professor vê estatísticas: média da turma, questão mais errada, etc.

- **RF-PRO-012:** O sistema deve corrigir automaticamente questões objetivas ao finalizar.
- **RF-PRO-013:** O professor deve visualizar estatísticas da prova (média, questões mais erradas, distribuição de notas).

**Roberto:** E o aluno vê o gabarito?

**Facilitador:** O professor decide: libera gabarito imediatamente, após prazo de todos, ou nunca.

- **RF-PRO-014:** O professor deve configurar quando o gabarito é liberado (imediato, após prazo, ou manual).

---

### [1:30 - 1:50] Feedback e Notas

**Facilitador:** Como o professor dá nota e feedback?

**Roberto:** Para atividades, eu abro a entrega, vejo o arquivo ou texto, dou uma nota de 0 a 10 e escrevo um comentário.

**Professora Helena:** E eu gosto de usar rubrica. Critérios com pontuação. Mas no MVP, nota simples está ok.

- **RF-NOT-001:** O sistema deve permitir que o professor atribua nota numérica (0 a 10) e comentário para atividades.
- **RF-NOT-002:** O sistema deve calcular nota automática para provas objetivas.

**Juliana:** E eu vejo a nota onde?

**Facilitador:** No menu "Minhas Notas". Você vê disciplina por disciplina, com atividades, provas e média.

- **RF-NOT-003:** O aluno deve visualizar notas organizadas por disciplina, com detalhamento de atividades e provas.

**Pedro:** E a média? O sistema calcula?

**Prof. Ricardo:** No MVP, o sistema mostra as notas, mas a média final é calculada pelo professor ou coordenador. Cada escola tem fórmula diferente.

- **RF-NOT-004:** No MVP, o sistema exibe notas individuais. Cálculo de média final é manual ou funcionalidade futura.

**Ana Paula:** E visibilidade? O aluno vê nota dos colegas?

**Facilitador:** Não. Cada aluno vê apenas suas próprias notas.

- **RF-NOT-005:** O aluno deve visualizar apenas suas próprias notas.

**Roberto:** E se eu quiser devolver a atividade para o aluno refazer?

**Facilitador:** O professor pode "Devolver para correção". O aluno recebe notificação e pode reenviar.

- **RF-NOT-006:** O professor deve poder devolver atividade para reenvio, com instruções de correção.

---

### [1:50 - 2:00] Consolidação

**Facilitador:** Resumo: atividades com prazo e reenvio, provas objetivas com timer e salvamento automático, correção automática, notas com feedback, e tudo visível apenas para quem deve ver.

**Carlos:** Técnicamente, o módulo de provas é o mais desafiador. Mas é factível.

**Juliana:** Eu me sinto mais segura sabendo que se a internet cair, não perco tudo.

**Facilitador:** Próxima reunião: Relatórios e Dashboards — como a coordenação acompanha tudo.

---

## Requisitos Consolidados

### Funcionais - Atividades
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-ATI-001 | Criação de atividades com instruções e critérios | Alta |
| RF-ATI-002 | Tipo de entrega: arquivo ou texto | Alta |
| RF-ATI-003 | Aceitar PDF, DOC, JPG, PNG (máx 20MB) | Alta |
| RF-ATI-004 | Reenvio até prazo com histórico | Alta |
| RF-ATI-005 | Marcação de atraso | Alta |
| RF-ATI-006 | Aceitar/rejeitar entregas atrasadas | Média |
| RF-ATI-007 | Prazo com data e hora | Alta |
| RF-ATI-008 | Salvar rascunho de resposta | Média |
| RF-ATI-009 | Notificações 24h e no dia do prazo | Média |

### Funcionais - Provas
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-PRO-001 | Criação de provas com tempo e datas | Alta |
| RF-PRO-002 | Prévia da prova | Média |
| RF-PRO-003 | Questões objetivas (MC e V/F) | Alta |
| RF-PRO-004 | 2 a 5 alternativas | Alta |
| RF-PRO-005 | Alterar respostas antes de finalizar | Alta |
| RF-PRO-006 | Cronômetro regressivo visível | Alta |
| RF-PRO-007 | Entrega automática ao término do tempo | Alta |
| RF-PRO-008 | Salvamento automático | Alta |
| RF-PRO-009 | Retomada após queda | Alta |
| RF-PRO-010 | Desabilitar copiar/colar | Média |
| RF-PRO-011 | Registrar saídas de aba | Média |
| RF-PRO-012 | Correção automática de objetivas | Alta |
| RF-PRO-013 | Estatísticas da prova | Média |
| RF-PRO-014 | Configuração de liberação de gabarito | Média |

### Funcionais - Notas
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-NOT-001 | Nota e comentário para atividades | Alta |
| RF-NOT-002 | Nota automática para provas | Alta |
| RF-NOT-003 | Visualização de notas por disciplina | Alta |
| RF-NOT-004 | Média manual no MVP | Média |
| RF-NOT-005 | Privacidade de notas | Alta |
| RF-NOT-006 | Devolver para reenvio | Média |

---
*Documento gerado em 2026-09-16*
