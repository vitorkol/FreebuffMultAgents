# Levantamento de Requisitos - Módulo de Avaliações Pedagógicas
**Data:** 2026-09-16  
**Duração:** 2 horas  
**Local:** Sala de Reuniões Pedagógicas  
**Facilitador:** Product Owner + Analista de Requisitos  
**Participantes:** Prof. Ricardo (Coordenação), Roberto (Professor), Professora Helena (Professora), Dra. Mariana (Diretora), Juliana (Aluna), Carlos (Dev)

---

## Contexto
Este módulo aprofunda o sistema de avaliação, indo além das provas objetivas. Aqui discutimos rubricas, pesos, recuperação e como a instituição entende nota e aprendizagem.

---

## Agenda (120 minutos)
| Horário | Atividade |
|---------|-----------|
| 0:00 - 0:20 | Filosofia avaliativa da instituição |
| 0:20 - 0:55 | Tipos de Avaliação e Pesos |
| 0:55 - 1:25 | Rubricas e Critérios |
| 1:25 - 1:50 | Recuperação e Segunda Chamada |
| 1:50 - 2:00 | Consolidação |

---

## Transcrição da Reunião

### [0:00 - 0:20] Filosofia Avaliativa

**Dra. Mariana:** Antes de falarmos de sistema, preciso deixar clara a nossa filosofia. Nós não acreditamos em prova única. A nota do aluno é composta por vários instrumentos: provas, trabalhos, participação, projetos.

**Prof. Ricardo:** Exatamente. Nossa matriz avaliativa atual tem: prova bimestral (40%), trabalhos (30%), participação (20%), e autoavaliação (10%).

**Roberto:** E cada professor pode ajustar os pesos dentro de limites. Não é tudo igual.

**Facilitador:** Então o sistema precisa ser flexível para diferentes composições de nota.

---

### [0:20 - 0:55] Tipos de Avaliação e Pesos

**Facilitador:** Vamos definir os tipos de avaliação que o sistema reconhece.

**Prof. Ricardo:** Sugiro: Prova, Trabalho, Participação, Projeto, Autoavaliação, Recuperação.

**Professora Helena:** E eu gostaria de "Leitura" como tipo separado. Para quando avalio resenha de livro.

**Facilitador:** Podemos ter tipos padrão e permitir que o professor crie tipos personalizados.

- **RF-AVA-001:** O sistema deve ter tipos padrão de avaliação: Prova, Trabalho, Participação, Projeto, Autoavaliação, Recuperação.
- **RF-AVA-002:** O professor deve poder criar tipos personalizados de avaliação.

**Roberto:** E pesos? Como o sistema calcula?

**Prof. Ricardo:** No MVP, o sistema não calcula média automaticamente. Mas deve permitir que o professor defina pesos para cada tipo, e o sistema mostra a média ponderada como referência.

- **RF-AVA-003:** O professor deve poder definir pesos percentuais para cada tipo de avaliação.
- **RF-AVA-004:** O sistema deve exibir média ponderada como referência, sem bloquear ajuste manual.

**Juliana:** E eu, aluna, vejo como minha nota está composta?

**Facilitador:** Sim. Você vê uma tabela: Prova 1: 8,0 (peso 40%), Trabalho 1: 7,5 (peso 30%), etc.

- **RF-AVA-005:** O aluno deve visualizar a composição da nota com valores e pesos.

**Dra. Mariana:** E arredondamento? Nossa regra é: acima de 0,5 arredonda para cima.

**Carlos:** Podemos configurar regra de arredondamento por instituição.

- **RF-AVA-006:** O sistema deve permitir configuração de regra de arredondamento (ex: 0,5 para cima).

---

### [0:55 - 1:25] Rubricas e Critérios

**Professora Helena:** Eu gosto de avaliar por rubrica. Critérios claros. O aluno sabe exatamente o que é esperado.

**Facilitador:** No MVP, podemos ter rubrica simples: critérios com notas de 0 a 10, e o sistema calcula a média dos critérios.

**Professora Helena:** Perfeito. Ex: "Organização do texto" (0-10), "Argumentação" (0-10), "Gramática" (0-10). A nota final é a média.

- **RF-AVA-007:** O sistema deve permitir criação de rubricas com critérios e notas individuais.
- **RF-AVA-008:** O sistema deve calcular nota final da rubrica como média dos critérios.

**Roberto:** E o aluno vê a rubrica antes de entregar?

**Facilitador:** Sim. Quando o professor cria a atividade, pode anexar a rubrica. O aluno vê antes de começar.

- **RF-AVA-009:** A rubrica deve ser visível para o aluno antes da entrega.

**Prof. Ricardo:** E comentários por critério?

**Facilitador:** O professor pode escrever um feedback para cada critério da rubrica.

- **RF-AVA-010:** O professor deve poder adicionar comentário por critério da rubrica.

---

### [1:25 - 1:50] Recuperação e Segunda Chamada

**Dra. Mariana:** E quando o aluno não vai bem? Precisamos de recuperação.

**Prof. Ricardo:** Nossa regra é: aluno com média abaixo de 6,0 faz recuperação. A nota da recuperação substitui a menor nota do bimestre.

**Facilitador:** Então o sistema precisa:
- Identificar alunos abaixo da média
- Permitir criação de avaliação de recuperação
- Substituir a menor nota pela nota da recuperação (se for maior)

- **RF-AVA-011:** O sistema deve identificar alunos com média abaixo do mínimo para recuperação.
- **RF-AVA-012:** O professor deve poder criar avaliação de recuperação vinculada a alunos específicos.
- **RF-AVA-013:** O sistema deve permitir substituição da menor nota pela nota de recuperação, quando aplicável.

**Juliana:** E segunda chamada? Quando eu falto na prova por motivo de saúde?

**Prof. Ricardo:** A secretaria valida o atestado. O professor marca "Segunda chamada autorizada" e cria uma prova equivalente.

- **RF-AVA-014:** O sistema deve permitir marcação de "Segunda chamada autorizada" com justificativa.
- **RF-AVA-015:** O professor deve poder criar prova de segunda chamada para alunos específicos.

**Roberto:** E a nota da segunda chamada? Substitui a prova original?

**Prof. Ricardo:** Sim. Mesma regra da recuperação.

- **RF-AVA-016:** A nota de segunda chamada deve substituir a nota da prova original.

---

### [1:50 - 2:00] Consolidação

**Facilitador:** Resumo: tipos de avaliação flexíveis, pesos configuráveis, rubricas com critérios, recuperação e segunda chamada com substituição de nota.

**Dra. Mariana:** Isso reflete a nossa realidade pedagógica. Não estamos simplificando demais.

**Carlos:** Técnicamente, é um módulo de regras de negócio. Precisamos deixar as fórmulas configuráveis.

**Facilitador:** Próxima reunião: Relatórios e Dashboards — como a coordenação vê tudo isso.

---

## Requisitos Consolidados

### Funcionais
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-AVA-001 | Tipos padrão de avaliação | Alta |
| RF-AVA-002 | Tipos personalizados de avaliação | Média |
| RF-AVA-003 | Pesos percentuais por tipo | Média |
| RF-AVA-004 | Média ponderada de referência | Média |
| RF-AVA-005 | Visualização da composição da nota | Alta |
| RF-AVA-006 | Configuração de arredondamento | Baixa |
| RF-AVA-007 | Criação de rubricas | Média |
| RF-AVA-008 | Cálculo de nota por rubrica | Média |
| RF-AVA-009 | Rubrica visível antes da entrega | Média |
| RF-AVA-010 | Comentário por critério | Baixa |
| RF-AVA-011 | Identificação de alunos para recuperação | Média |
| RF-AVA-012 | Criação de avaliação de recuperação | Média |
| RF-AVA-013 | Substituição de nota por recuperação | Média |
| RF-AVA-014 | Marcação de segunda chamada | Média |
| RF-AVA-015 | Prova de segunda chamada | Média |
| RF-AVA-016 | Substituição de nota por segunda chamada | Média |

---
*Documento gerado em 2026-09-16*
