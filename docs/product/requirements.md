# Requisitos

## 2026-09-16 — consolidação a partir de docs/product/meetings/

### Hiências e reuniões usadas

- `requisitos_login_2026-09-16.md`
- `requisitos_cadastros_2026-09-16.md`
- `requisitos_cursos_2026-09-16.md`
- `requisitos_aulas_2026-09-16.md`
- `requisitos_avaliacoes_2026-09-16.md`
- `requisitos_relatorios_2026-09-16.md`

### 1. Visão e escopo

**RN-01:** O Kimi Academy é uma plataforma institucional de gestão de conhecimento escolar, focada em organização de conteúdo, avaliação e acompanhamento pedagógico.

**RN-02:** O MVP não é rede social, sistema financeiro, nem substituto do professor.

**RN-03:** No MVP, o sistema foca nos seguintes módulos:
- Autenticação e acesso
- Cadastros básicos
- Cursos e conteúdos
- Aulas, atividades e provas
- Avaliações pedagógicas
- Relatórios e dashboards

### 2. Perfil e acesso

**RF-01:** O sistema deve ter 3 perfis fixos no MVP:
- Administrador
- Professor
- Aluno

**RF-02:** O coordenador pedagógico é um professor com acesso ampliado a relatórios.

**RF-03:** Todo cadastro é realizado ou aprovado pelo administrador; não há auto-cadastro público.

**RF-04:** O CPF é obrigatório e único para todos os perfis.

**RF-05:** O login é feito com e-mail e senha.

**RF-06:** A conta é bloqueada por 30 minutos após 5 tentativas incorretas.

**RF-07:** A senha deve ter no mínimo 8 caracteres, com maiúscula, minúscula, número e caractere especial.

**RF-08:** A recuperação de senha é feita por e-mail com link temporário válido por 1 hora.

**RF-09:** A nova senha não pode ser igual às últimas 3 senhas usadas.

**RF-10:** O sistema deve ter opção "Lembrar-me" com sessão de 30 dias.

**RF-11:** O sistema deve permitir login em múltiplos dispositivos simultâneos no MVP.

**RF-12:** O usuário pode encerrar sessão em todos os dispositivos pelo perfil.

**RNF-01:** O sistema deve ser conforme LGPD.

**RNF-02:** As senhas devem ser armazenadas com hash seguro (bcrypt ou equivalente no backend).

**RNF-03:** A comunicação deve usar HTTPS.

### 3. Cadastros básicos

**RF-13:** O sistema deve permitir cadastro de turmas com:
- nome
- código único
- ano letivo
- série/ano
- turno
- sala
- data de início
- data de término
- status

**RF-14:** O código da turma deve ser único e validado.

**RF-15:** O sistema deve sugerir código automático se não informado.

**RF-16:** O cadastro de turma deve incluir nível/curso.

**RF-17:** No MVP, as turmas são homogêneas por série.

**RF-18:** Turmas sem alunos e sem aulas podem ser excluídas. Turmas com dados podem ser apenas inativadas.

**RF-19:** O sistema deve permitir cadastro de disciplinas com nome, código único, carga horária e ementa opcional.

**RF-20:** O sistema deve permitir associar professor(es) a disciplina(s) em turma(s).

**RF-21:** Uma disciplina-turma pode ter múltiplos professores, com indicação de titular ou substituto.

**RF-22:** Um professor pode estar associado a múltiplas disciplinas e turmas.

**RF-23:** O sistema deve permitir importação de associações professor-disciplina-turma via CSV.

**RF-24:** A remoção de professor de turma deve inativar a associação, preservando histórico.

**RF-25:** O sistema deve permitir matricular aluno em turma.

**RF-26:** O sistema deve permitir transferência de aluno entre turmas, com registro de data e motivo.

**RF-27:** O histórico de turmas do aluno deve ser preservado.

**RF-28:** Cada aluno deve ter apenas uma matrícula ativa por ano letivo.

**RF-29:** O sistema deve permitir importação de matrículas via CSV.

**RF-30:** No MVP, um aluno está matriculado em apenas uma turma por vez.

### 4. Cursos e conteúdos

**RF-31:** O sistema deve permitir que o professor crie módulos/unidades dentro de uma disciplina-turma.

**RF-32:** O professor deve poder definir título, descrição e ordem do módulo.

**RF-33:** O professor deve poder reordenar módulos.

**RF-34:** Se o professor não criar módulos, o sistema deve agrupar aulas em um módulo padrão.

**RF-35:** O módulo pode ter data de início e término opcionais.

**RF-36:** O módulo deve ter status: Publicado, Rascunho ou Agendado.

**RF-37:** O sistema deve permitir criação de aulas com título, descrição, conteúdo em editor de texto rico, anexos, link de vídeo e imagem de capa.

**RF-38:** O professor deve poder vincular atividade ou prova à aula.

**RF-39:** A aula deve ter status: Rascunho, Publicada ou Agendada.

**RF-40:** O sistema deve ter limite de 50MB por arquivo e máximo 5 anexos por aula.

**RF-41:** O editor de texto deve ter formatação básica: negrito, itálico, listas, links e títulos.

**RF-42:** No MVP, não há duplicação de aulas entre turmas.

**RF-43:** A edição de aula publicada deve notificar alunos sobre atualização, com opção do professor.

**RF-44:** A exclusão de aula deve inativá-la, preservando acesso histórico para alunos.

**RF-45:** O aluno deve visualizar conteúdo organizado por disciplina → módulo → aula.

**RF-46:** O aluno deve poder marcar aula como estudada.

**RF-47:** O professor deve visualizar estatísticas de acesso por aula.

**RF-48:** O aluno deve poder baixar anexos das aulas.

**RF-49:** Links de videoaula abrem em nova aba do navegador.

### 5. Aulas, atividades e provas

**RF-50:** O sistema deve permitir criação de atividades com:
- título
- descrição/instruções
- critérios de avaliação
- prazo de entrega
- tipo de entrega

**RF-51:** O tipo de entrega pode ser upload de arquivo ou resposta em campo de texto.

**RF-52:** O sistema deve aceitar arquivos PDF, DOC/DOCX, JPG, PNG, com limite de 20MB.

**RF-53:** O aluno deve poder reenviar atividade até o prazo, preservando histórico.

**RF-54:** Atividades entregues após o prazo devem ser marcadas como "Atrasada".

**RF-55:** O professor deve poder aceitar ou recusar entregas atrasadas.

**RF-56:** O prazo deve ser definido com data e hora.

**RF-57:** Para entregas em texto, o sistema deve permitir salvar rascunho antes da entrega final.

**RF-58:** O sistema deve enviar notificação ao aluno 24h antes e no dia do prazo.

**RF-59:** O sistema deve permitir criação de provas com título, instruções, tempo de duração, data/hora de início e término.

**RF-60:** O professor deve poder visualizar prévia da prova antes de publicar.

**RF-61:** No MVP, o sistema deve suportar questões objetivas: múltipla escolha e verdadeiro/falso.

**RF-62:** Múltipla escolha deve permitir de 2 a 5 alternativas.

**RF-63:** O aluno deve poder alterar respostas durante a prova, antes de finalizar.

**RF-64:** O sistema deve exibir cronômetro regressivo visível durante toda a prova.

**RF-65:** Ao término do tempo, a prova deve ser entregue automaticamente.

**RF-66:** O sistema deve salvar respostas automaticamente a cada interação.

**RF-67:** O aluno deve poder retomar a prova após queda de conexão, sem perder respostas.

**RF-68:** O sistema deve desabilitar copiar/colar durante a prova.

**RF-69:** O sistema deve registrar quantas vezes o aluno sai da aba da prova.

**RF-70:** O sistema deve corrigir automaticamente questões objetivas ao finalizar.

**RF-71:** O professor deve visualizar estatísticas da prova: média, questões mais erradas, distribuição de notas.

**RF-72:** O professor deve configurar quando o gabarito é liberado: imediato, após prazo ou manual.

### 6. Notas e avaliações

**RF-73:** O sistema deve permitir que o professor atribua nota numérica de 0 a 10 e comentário para atividades.

**RF-74:** O sistema deve calcular nota automaticamente para provas objetivas.

**RF-75:** O aluno deve visualizar notas organizadas por disciplina, com detalhamento de atividades e provas.

**RF-76:** No MVP, o sistema exibe notas individuais; cálculo de média final é manual ou funcionalidade futura.

**RF-77:** O aluno deve visualizar apenas suas próprias notas.

**RF-78:** O professor deve poder devolver atividade para reenvio, com instruções de correção.

**RF-79:** O sistema deve ter tipos padrão de avaliação: Prova, Trabalho, Participação, Projeto, Autoavaliação, Recuperação.

**RF-80:** O professor deve poder criar tipos personalizados de avaliação.

**RF-81:** O professor deve poder definir pesos percentuais para cada tipo de avaliação.

**RF-82:** O sistema deve exibir média ponderada como referência, sem bloquear ajuste manual.

**RF-83:** O aluno deve visualizar a composição da nota com valores e pesos.

**RF-84:** O sistema deve permitir configuração de regra de arredondamento, ex: 0,5 para cima.

**RF-85:** O sistema deve permitir criação de rubricas com critérios e notas individuais.

**RF-86:** O sistema deve calcular nota final da rubrica como média dos critérios.

**RF-87:** A rubrica deve ser visível para o aluno antes da entrega.

**RF-88:** O professor deve poder adicionar comentário por critério da rubrica.

**RF-89:** O sistema deve identificar alunos com média abaixo do mínimo para recuperação.

**RF-90:** O professor deve poder criar avaliação de recuperação vinculada a alunos específicos.

**RF-91:** O sistema deve permitir substituição da menor nota pela nota de recuperação, quando aplicável.

**RF-92:** O sistema deve permitir marcação de "Segunda chamada autorizada" com justificativa.

**RF-93:** O professor deve poder criar prova de segunda chamada para alunos específicos.

**RF-94:** A nota de segunda chamada deve substituir a nota da prova original.

### 7. Relatórios e dashboards

**RF-95:** O dashboard do coordenador deve exibir alertas de turmas com indicadores críticos: baixa entrega, baixa média, baixa frequência de acesso.

**RF-96:** O dashboard deve exibir KPIs institucionais: total de alunos, taxa de entrega, média geral, taxa de aprovação.

**RF-97:** O coordenador deve poder filtrar dados por turma, disciplina, período e professor.

**RF-98:** O sistema deve identificar alunos sem acesso nos últimos 7 dias.

**RF-99:** O sistema deve identificar alunos em risco: média menor que 5,0 ou 3 ou mais atividades pendentes no bimestre.

**RF-100:** O coordenador deve visualizar perfil completo do aluno com histórico acadêmico e comportamental.

**RF-101:** O dashboard do professor deve exibir resumo de entregas por turma e por atividade.

**RF-102:** O professor deve visualizar estatísticas de provas: média, máxima, mínima, desvio padrão.

**RF-103:** O professor deve visualizar taxa de acesso por aula e lista de alunos que não acessaram.

**RF-104:** O professor deve poder comparar indicadores entre turmas diferentes da mesma disciplina.

**RF-105:** O aluno deve visualizar gráfico de evolução de notas por disciplina ao longo do tempo.

**RF-106:** O aluno deve visualizar indicadores de engajamento: acessos, entregas, participação.

**RF-107:** O sistema deve gerar relatório institucional mensal com indicadores estratégicos.

**RF-108:** O sistema deve gerar relatório individual do aluno para reunião de pais.

**RF-109:** Todo relatório e dashboard deve ter opção de exportação para PDF.

**RF-110:** Dados tabulares devem ter opção de exportação para CSV/Excel.

**RF-111:** O sistema deve permitir agendamento de envio automático de relatórios por e-mail.

**RF-112:** O sistema deve enviar alertas automáticos quando indicadores críticos forem atingidos.

---

## Decisões

- A sequência de desenvolvimento sugerida pelo pipeline é:
  1. Autenticação e cadastros
  2. Cursos e conteúdos
  3. Aulas, atividades e provas
  4. Avaliações pedagógicas
  5. Relatórios e dashboards

## Dúvidas/riscos

- A definição de "média final" e fórmulas institucionais ainda não foi consolidada.
- A arquitetura exata de backend/frontend precisa de refinamento técnico.
- O escopo do MVP ainda depende de priorização.

---

## Handoff

- **Entrada lida:** `docs/product/meeting-summary.md`
- **Decisões tomadas:** consolidação de requisitos por módulo + lista de RNF
- **Dúvidas e riscos:** ver seção Dúvidas/riscos
- **Saída gravada:** `docs/product/requirements.md`
- **Status:** approved

## Aprovação

- **Agente:** ANR
- **Data:** 2026-09-16
- **Justificativa:** requisitos consolidados a partir das reuniões de requisitos disponíveis; portanto, a etapa pode avançar com base no material existente.
