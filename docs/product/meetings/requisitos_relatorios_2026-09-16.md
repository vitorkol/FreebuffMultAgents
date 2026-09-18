# Levantamento de Requisitos - Módulo de Relatórios e Dashboards
**Data:** 2026-09-16  
**Duração:** 2 horas  
**Local:** Sala da Diretoria  
**Facilitador:** Product Owner + Analista de Requisitos  
**Participantes:** Dra. Mariana (Diretora), Prof. Ricardo (Coordenação), Ana Paula (TI), Carlos (Dev), Sra. Beatriz (Secretaria), Roberto (Professor)

---

## Contexto
Este é o módulo de inteligência pedagógica. Sem visibilidade, a coordenação não consegue intervir a tempo. Sem dados, a diretoria não consegue decidir.

---

## Agenda (120 minutos)
| Horário | Atividade |
|---------|-----------|
| 0:00 - 0:15 | Contexto: o que a coordenação precisa saber hoje |
| 0:15 - 0:50 | Dashboard do Coordenador |
| 0:50 - 1:20 | Dashboard do Professor |
| 1:20 - 1:45 | Dashboard do Aluno e Relatórios Institucionais |
| 1:45 - 2:00 | Exportação e Comunicação |

---

## Transcrição da Reunião

### [0:00 - 0:15] Contexto

**Dra. Mariana:** Hoje eu recebo relatórios de desempenho em PDF, gerados manualmente pela secretaria. Demora dias. Quando chega em mim, já é tarde para interferir.

**Prof. Ricardo:** E eu, coordenador, preciso ligar para cada professor para saber como está a turma. Não tenho visão consolidada.

**Sra. Beatriz:** A secretaria gasta 3 dias por bimestre só montando relatórios. É insustentável.

**Facilitador:** Então o sistema precisa entregar informação em tempo real, de forma visual e acionável.

---

### [0:15 - 0:50] Dashboard do Coordenador

**Facilitador:** Prof. Ricardo, quando você abre o sistema, o que precisa ver?

**Prof. Ricardo:** Primeiro, alertas. Quais turmas estão com problema? Quais alunos estão em risco?

- **RF-REL-001:** O dashboard do coordenador deve exibir alertas de turmas com indicadores críticos (baixa entrega, baixa média, baixa frequência de acesso).

**Dra. Mariana:** E quantitativos. Quantos alunos na instituição? Taxa geral de aprovação?

- **RF-REL-002:** O dashboard deve exibir KPIs institucionais: total de alunos, taxa de entrega, média geral, taxa de aprovação.

**Prof. Ricardo:** E eu preciso filtrar. Por turma, por disciplina, por período.

- **RF-REL-003:** O coordenador deve poder filtrar dados por turma, disciplina, período (bimestre) e professor.

**Ana Paula:** E o que é "baixa frequência de acesso"?

**Facilitador:** Definimos como: aluno que não acessou o sistema nos últimos 7 dias.

- **RF-REL-004:** O sistema deve identificar alunos sem acesso nos últimos 7 dias.

**Carlos:** E como calculamos "aluno em risco"?

**Prof. Ricardo:** Média abaixo de 5,0 OU mais de 3 atividades não entregues no bimestre.

- **RF-REL-005:** O sistema deve identificar alunos em risco (média < 5,0 ou 3+ atividades pendentes).

**Dra. Mariana:** E eu quero clicar no aluno e ver tudo. Notas, entregas, frequência de acesso, histórico.

- **RF-REL-006:** O coordenador deve visualizar perfil completo do aluno com histórico acadêmico e comportamental.

---

### [0:50 - 1:20] Dashboard do Professor

**Facilitador:** Roberto, o que você precisa ver?

**Roberto:** Minhas turmas. Quantos alunos entregaram a atividade da semana? Quem não entregou?

- **RF-REL-007:** O dashboard do professor deve exibir resumo de entregas por turma e por atividade.

**Professora Helena:** E estatísticas de prova. Média da turma, nota mais alta, mais baixa, desvio padrão.

- **RF-REL-008:** O professor deve visualizar estatísticas de provas (média, máxima, mínima, desvio padrão).

**Roberto:** E quem não acessou a aula? Para eu saber quem está acompanhando.

- **RF-REL-009:** O professor deve visualizar taxa de acesso por aula e lista de alunos que não acessaram.

**Prof. Ricardo:** E comparativo entre turmas? Eu dou aula para 2º A e 2º B. Quero ver qual está indo melhor.

- **RF-REL-010:** O professor deve poder comparar indicadores entre turmas diferentes da mesma disciplina.

---

### [1:20 - 1:45] Dashboard do Aluno e Relatórios Institucionais

**Facilitador:** Juliana, o que você quer ver?

**Juliana:** Minha evolução. Um gráfico mostrando minhas notas ao longo do bimestre. Se estou melhorando ou piorando.

- **RF-REL-011:** O aluno deve visualizar gráfico de evolução de notas por disciplina ao longo do tempo.

**Pedro:** E um ranking? Não de nota, mas de engajamento. Quantas aulas eu acessei, quantas atividades entreguei.

- **RF-REL-012:** O aluno deve visualizar indicadores de engajamento (acessos, entregas, participação).

**Dra. Mariana:** E relatórios para a diretoria? Eu preciso de relatório mensal para o conselho.

**Facilitador:** Relatório institucional com: matrículas ativas, taxa de aprovação, taxa de retenção, ranking de disciplinas com maior dificuldade, professores mais engajados.

- **RF-REL-013:** O sistema deve gerar relatório institucional mensal com indicadores estratégicos.

**Sra. Beatriz:** E para reunião de pais? Eu preciso de relatório individual do aluno.

- **RF-REL-014:** O sistema deve gerar relatório individual do aluno para reunião de pais, com notas, frequência, comportamento e observações.

---

### [1:45 - 2:00] Exportação e Comunicação

**Facilitador:** Como exportamos tudo isso?

**Ana Paula:** PDF é essencial. E Excel/CSV para quem quer manipular dados.

- **RF-REL-015:** Todo relatório e dashboard deve ter opção de exportação para PDF.
- **RF-REL-016:** Dados tabulares devem ter opção de exportação para CSV/Excel.

**Dra. Mariana:** E envio automático? Eu quero receber na segunda-feira de manhã um e-mail com o resumo da semana.

- **RF-REL-017:** O sistema deve permitir agendamento de envio automático de relatórios por e-mail.

**Prof. Ricardo:** E alertas em tempo real? Se uma turma inteira não entregar atividade, eu quero saber no dia seguinte.

- **RF-REL-018:** O sistema deve enviar alertas automáticos quando indicadores críticos forem atingidos.

---

## Requisitos Consolidados

### Funcionais
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-REL-001 | Alertas de turmas críticas | Alta |
| RF-REL-002 | KPIs institucionais | Alta |
| RF-REL-003 | Filtros por turma/disciplina/período | Alta |
| RF-REL-004 | Alunos sem acesso em 7 dias | Média |
| RF-REL-005 | Identificação de alunos em risco | Alta |
| RF-REL-006 | Perfil completo do aluno | Alta |
| RF-REL-007 | Resumo de entregas por turma | Alta |
| RF-REL-008 | Estatísticas de provas | Média |
| RF-REL-009 | Taxa de acesso por aula | Média |
| RF-REL-010 | Comparativo entre turmas | Baixa |
| RF-REL-011 | Gráfico de evolução do aluno | Média |
| RF-REL-012 | Indicadores de engajamento | Baixa |
| RF-REL-013 | Relatório institucional mensal | Média |
| RF-REL-014 | Relatório individual para pais | Média |
| RF-REL-015 | Exportação PDF | Alta |
| RF-REL-016 | Exportação CSV/Excel | Média |
| RF-REL-017 | Envio automático de relatórios | Baixa |
| RF-REL-018 | Alertas automáticos | Média |

---
*Documento gerado em 2026-09-16*
