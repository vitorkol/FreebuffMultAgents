# Levantamento de Requisitos - Módulo de Cursos e Conteúdos
**Data:** 2026-09-16  
**Duração:** 2 horas  
**Local:** Sala dos Professores  
**Facilitador:** Product Owner + Analista de Requisitos  
**Participantes:** Roberto (Professor), Professora Helena (Professora), Prof. Ricardo (Coordenação), Juliana (Aluna), Carlos (Dev), Ana Paula (TI)

---

## Contexto
Este módulo é o coração pedagógico do Kimi Academy. É onde o professor organiza o que vai ensinar e o aluno acessa o que precisa aprender.

---

## Agenda (120 minutos)
| Horário | Atividade |
|---------|-----------|
| 0:00 - 0:15 | Contexto: como os professores organizam conteúdo hoje |
| 0:15 - 0:50 | Estrutura de Cursos e Módulos |
| 0:50 - 1:25 | Criação de Aulas e Materiais |
| 1:25 - 1:50 | Visibilidade e Acesso pelo Aluno |
| 1:50 - 2:00 | Consolidação |

---

## Transcrição da Reunião

### [0:00 - 0:15] Contexto

**Facilitador:** Hoje vamos desenhar como o conteúdo é organizado. Roberto, como você organiza suas aulas hoje?

**Roberto:** Hoje eu tenho pastas no Google Drive. Uma pasta por turma, uma por bimestre, e dentro vão os PDFs, links de vídeo, provas. É funcional, mas confuso para o aluno.

**Professora Helena:** Eu uso o caderno de planejamento. Escrevo o que vou dar na semana, depois digitalizo. O aluno nunca sabe o que vem por aí.

**Juliana:** E quando o professor muda de pasta ou apaga algo, a gente perde o link. Já aconteceu de eu estudar para prova e o material ter sumido.

**Facilitador:** Então precisamos de uma estrutura clara, estável e previsível.

---

### [0:15 - 0:50] Estrutura de Cursos e Módulos

**Facilitador:** Vamos pensar em hierarquia. No topo, temos o quê?

**Prof. Ricardo:** A disciplina na turma. Ex: Matemática - 2º ano A.

**Roberto:** Dentro da disciplina, eu divido por bimestre. Ou por unidade temática.

**Professora Helena:** Eu prefiro por unidade. "Funções", "Geometria", "Estatística".

**Facilitador:** Então a hierarquia é:
1. Disciplina-Turma (ex: Matemática - 2º ano A)
2. Módulo/Unidade (ex: Unidade 1: Funções do 2º Grau)
3. Aula (ex: Aula 3: Gráfico da Parábola)

**Carlos:** Técnicamente, Disciplina-Turma já existe como associação. Precisamos de uma entidade "Módulo" e "Aula".

**Prof. Ricardo:** E o professor pode criar quantos módulos quiser?

**Facilitador:** Sim. E pode reordenar.

- **RF-CON-001:** O sistema deve permitir que o professor crie módulos/unidades dentro de uma disciplina-turma.
- **RF-CON-002:** O professor deve poder definir título, descrição e ordem do módulo.
- **RF-CON-003:** O professor deve poder reordenar módulos por drag-and-drop.

**Roberto:** E se eu não quiser usar módulos? Só jogar aulas soltas?

**Facilitador:** O sistema cria um módulo padrão "Conteúdo Geral" se o professor não quiser organizar.

- **RF-CON-004:** Se o professor não criar módulos, o sistema deve agrupar aulas em um módulo padrão.

**Juliana:** E o aluno vê essa estrutura?

**Facilitador:** Sim. O aluno entra na disciplina e vê: Módulo 1 → Aula 1, Aula 2, Aula 3. Módulo 2 → Aula 4, Aula 5.

**Professora Helena:** E posso definir datas para cada módulo? Tipo, esse módulo é de agosto a setembro?

**Facilitador:** Pode. Data de início e fim do módulo é opcional.

- **RF-CON-005:** O módulo pode ter data de início e término opcionais.

**Prof. Ricardo:** E se o professor quiser ocultar um módulo? Para não liberar tudo de uma vez?

**Facilitador:** Sim. Status do módulo: Publicado, Rascunho, Agendado.

- **RF-CON-006:** O módulo deve ter status: Publicado, Rascunho ou Agendado (com data de publicação automática).

---

### [0:50 - 1:25] Criação de Aulas e Materiais

**Facilitador:** Vamos à aula em si. O que compõe uma aula?

**Roberto:** Título, descrição/objetivo, conteúdo (texto, PDF, link de vídeo), e atividade/prova opcional.

**Professora Helena:** E eu gostaria de colocar uma imagem de capa. Para identificar visualmente.

**Facilitador:** Registrado. Uma aula tem:
- Título
- Descrição/objetivo de aprendizagem
- Conteúdo em texto (editor rico)
- Anexos (PDF, DOC, imagens)
- Link de videoaula externa
- Imagem de capa (opcional)
- Atividade vinculada (opcional)
- Prova vinculada (opcional)
- Data de publicação
- Status

- **RF-CON-007:** O sistema deve permitir criação de aulas com título, descrição, conteúdo em editor de texto rico, anexos, link de vídeo e imagem de capa.
- **RF-CON-008:** O professor deve poder vincular atividade ou prova à aula.
- **RF-CON-009:** A aula deve ter status: Rascunho, Publicada ou Agendada.

**Carlos:** Quanto de armazenamento por arquivo?

**Ana Paula:** Sugiro limite de 50MB por arquivo. PDFs e imagens raramente passam disso.

**Carlos:** E quantos arquivos por aula?

**Roberto:** No máximo 5. Mais que isso vira bagunça.

- **RF-CON-010:** Limite de 50MB por arquivo e máximo 5 anexos por aula.

**Prof. Ricardo:** E o editor de texto? Precisa ser sofisticado?

**Facilitador:** Não. Negrito, itálico, listas, links, títulos. Não precisa de tabelas complexas nem fórmulas matemáticas nativas — o professor pode anexar PDF com fórmulas.

- **RF-CON-011:** Editor de texto rico com formatação básica (negrito, itálico, listas, links, títulos).

**Professora Helena:** E se eu quiser reutilizar uma aula de outra turma?

**Facilitador:** No MVP, você copia manualmente. Duplicação de aulas é Onda 2.

- **RF-CON-012:** No MVP, não há duplicação de aulas entre turmas. Funcionalidade futura.

**Roberto:** E posso editar uma aula depois de publicada?

**Facilitador:** Sim, mas com aviso. Se alunos já acessaram, o sistema pergunta se quer notificar sobre a atualização.

- **RF-CON-013:** Edição de aula publicada deve notificar alunos sobre atualização, com opção do professor.

**Juliana:** E se o professor apagar uma aula que eu já estudei?

**Facilitador:** A aula é inativada, não apagada. Você ainda vê no histórico, mas marcada como "Removida".

- **RF-CON-014:** Exclusão de aula inativa o conteúdo, preservando acesso histórico para alunos.

---

### [1:25 - 1:50] Visibilidade e Acesso pelo Aluno

**Facilitador:** Como o aluno vê isso?

**Juliana:** Eu entro na disciplina. Vejo os módulos. Clico no módulo e vejo as aulas.

**Pedro:** E se eu quiser ver tudo que tenho para fazer em todas as disciplinas?

**Facilitador:** Dashboard do aluno mostra tarefas pendentes de todas as disciplinas. Mas para ver conteúdo, você navega por disciplina → módulo → aula.

- **RF-CON-015:** O aluno deve visualizar conteúdo organizado por disciplina → módulo → aula.
- **RF-CON-016:** O aluno deve poder marcar aula como "Estudada" ou concluída.

**Juliana:** Isso é bom. Para eu saber o que já vi.

**Prof. Ricardo:** E o professor vê quem estudou?

**Facilitador:** Sim. No relatório da aula, o professor vê taxa de visualização.

- **RF-CON-017:** O professor deve visualizar estatísticas de acesso por aula (quem visualizou e quando).

**Ana Paula:** E download de materiais? O aluno pode baixar?

**Facilitador:** Sim. Cada anexo tem botão de download.

- **RF-CON-018:** O aluno deve poder baixar anexos das aulas.

**Carlos:** E os links de vídeo? Abrem onde?

**Facilitador:** Em nova aba. O sistema não embeda o vídeo no MVP — abre o link externo.

- **RF-CON-019:** Links de videoaula abrem em nova aba do navegador.

---

### [1:50 - 2:00] Consolidação

**Facilitador:** Resumo: estrutura hierárquica disciplina → módulo → aula, com editor rico, anexos, links externos, status de publicação, e visibilidade clara para o aluno.

**Roberto:** Faz sentido. É organizado sem ser engessado.

**Professora Helena:** Concordo. Dá para planejar o semestre inteiro.

**Facilitador:** Próxima reunião: Aulas e Interação — foco em como o aluno entrega atividades e faz provas.

---

## Requisitos Consolidados

### Funcionais
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-CON-001 | Criação de módulos/unidades | Alta |
| RF-CON-002 | Título, descrição e ordem do módulo | Alta |
| RF-CON-003 | Reordenação de módulos | Média |
| RF-CON-004 | Módulo padrão automático | Média |
| RF-CON-005 | Data de início/fim do módulo | Baixa |
| RF-CON-006 | Status do módulo (Publicado/Rascunho/Agendado) | Alta |
| RF-CON-007 | Criação de aulas com editor rico e anexos | Alta |
| RF-CON-008 | Vinculação de atividade/prova à aula | Alta |
| RF-CON-009 | Status da aula (Rascunho/Publicada/Agendada) | Alta |
| RF-CON-010 | Limite de 50MB/5 anexos | Média |
| RF-CON-011 | Editor de texto com formatação básica | Alta |
| RF-CON-012 | Sem duplicação entre turmas no MVP | Alta |
| RF-CON-013 | Notificação de atualização de aula | Média |
| RF-CON-014 | Inativação preservando histórico | Média |
| RF-CON-015 | Navegação disciplina→módulo→aula | Alta |
| RF-CON-016 | Marcar aula como estudada | Baixa |
| RF-CON-017 | Estatísticas de acesso para professor | Média |
| RF-CON-018 | Download de anexos | Alta |
| RF-CON-019 | Links de vídeo em nova aba | Alta |

---
*Documento gerado em 2026-09-16*
