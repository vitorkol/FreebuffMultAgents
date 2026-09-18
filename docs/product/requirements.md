# Requisitos

**Produzido por:** ANR
**Data:** 2026-09-16
**Entrada lida:** docs/product/meeting_summary-reviewed.md
**Nota de handoff:** este documento ainda depende de revisão e aprovação antes de qualquer implementação.

## 1. Visão do produto
O Kimi Academy é uma plataforma institucional de gestão do conhecimento escolar que visa tornar o uso da plataforma mais simples para professores, mais visível para alunos e mais inteligente para a coordenação pedagógica.

## 2. Objetivos de negócio
### 2.1 Primários
- Aumentar a adoção de professores ativos na plataforma.
- Reduzir o tempo operacional que o professor gasta para publicar uma aula.

### 2.2 Secundários
- Aumentar o acesso regular de alunos à plataforma.
- Tornar visível o que cada aluno precisa fazer e quando.
- Permitir que a coordenação identifique alunos em risco antes da prova final.
- Suportar um número significativo de usuários simultâneos de forma estável.

## 3. Restrições do MVP
- No MVP, a interface é web e responsiva; não há aplicativo nativo.
- No MVP, não há login de pais.
- No MVP, videoaulas são feitas por links externos; upload nativo de vídeo não entra.
- No MVP, correção automática vale apenas para questões objetivas.
- No MVP, provas exigem temporizador e salvamento automático.
- No MVP, funcionalidades como fórum, questões dissertativas, biblioteca do professor, calendário acadêmico, chat, gamificação, certificados e integrações são posteriores.

## 4. Requisitos funcionais
### 4.1 Autenticação e contas
- O sistema deve permitir login com e-mail e senha.
- O sistema deve permitir recuperação de senha por e-mail.
- O sistema deve suportar perfis distintos para admin, professor e aluno.
- O sistema deve permitir que o administrador cadastre usuários manualmente ou por planilha.
- O sistema deve permitir que o professor defina sua senha no primeiro acesso.

### 4.2 Gestão acadêmica
- O sistema deve permitir cadastro de turmas, disciplinas e associações entre professores, turmas e disciplinas.
- O sistema deve permitir que o administrador altere a turma de um aluno mantendo o histórico.

### 4.3 Conteúdo de aula
- O sistema deve permitir criar uma aula com título, descrição, turma, data de publicação e tipo.
- O sistema deve permitir anexar arquivos ao criar ou editar uma aula.
- O sistema deve permitir associar links externos de videoaula.
- O sistema deve permitir publicar aula para uma turma.
- O sistema deve permitir edição da aula até o momento do primeiro acesso por um aluno, com limitações posteriores claras.

### 4.4 Atividades
- O sistema deve permitir criar atividades com prazo de entrega e descrição.
- O sistema deve permitir que o aluno entregue atividades por texto ou arquivo.
- O sistema deve permitir que o aluno reenvien atividades até o prazo.
- O sistema deve permitir que o professor lance notas de atividades.

### 4.5 Provas
- O sistema deve permitir criar provas com questões objetivas.
- O sistema deve permitir definir tempo limite para a prova.
- O sistema deve permitir definir período de início e término da prova.
- O sistema deve salvar as respostas automaticamente durante a prova.
- O sistema deve permitir retomada da prova em caso de queda de conexão, mantendo a contagem de tempo no servidor.
- O sistema deve corrigir automaticamente questões objetivas.
- O sistema deve permitir que o professor lance notas finais e comentários.

### 4.6 Dashboards
- O dashboard do professor deve mostrar turmas, aulas e sinalizações como atividades pendentes de correção.
- O dashboard do aluno deve mostrar tarefas pendentes e próximas provas.
- O dashboard do coordenador deve mostrar indicadores básicos de desempenho e entrega por turma.
- O sistema deve permitir consulta ao histórico individual de um aluno.

### 4.7 Relatórios
- O sistema deve permitir visualizar relatório individual do aluno.
- O sistema deve permitir, se houver tempo no MVP, exportar relatórios para PDF.

### 4.8 Notificações
- O sistema deve notificar alunos sobre novas aulas e atividades relevantes.
- O sistema deve permitir que o aluno escolha entre receber notificações constantes, somente resumo diário ou apenas notificações importantes.
- O sistema deve enviar notificação por e-mail e/ou no próprio sistema.

### 4.9 Administração
- O administrador deve poder cadastrar usuários um a um.
- O administrador deve poder importar usuários por planilha com colunas padronizadas.
- O administrador deve poder editar cadastros e turmas.

### 4.10 Onboarding e suporte
- O sistema deve fornecer, no primeiro acesso, um manual ou orientação básica para o professor.

## 5. Requisitos não funcionais
- Responsividade para navegação no celular.
- Salvamento automático durante a realização de provas.
- Rastreabilidade de acesso e entrega para apoio pedagógico.
- Estabilidade adequada para uso simultâneo relevante no contexto escolar.
- Manutenibilidade e separação clara entre backend e frontend conforme stack adotada.

## 6. Dúvidas e pendências de requisito
- Não foi definido, nos registros disponíveis, o critério de medição exato para “publicar em até 10 minutos”.
- Não foi definido qual será a política padrão de notificação para alunos no MVP.
- Não foi definido se o auto-cadastro do professor será permitido e em que condições.
- Não foi definido o padrão aceito para a migração da secretaria.
- Não foi definido o comportamento exato de fallback para links externos indisponíveis.
- Não foram detalhados os critérios de aceite de cada história; isso deve sair do refinamento e da priorização da sprint.

## 7. Entregáveis derivados
- Histórias de usuário: `docs/product/user-stories.md`
- Prototipagem das histórias de usuário `docs/product/prototype.md`
- Refinamento técnico: `docs/product/technical-refinement.md`
- Priorização da sprint: `docs/product/sprint-prioritization.md`
- Plano e evidências de teste: `docs/product/test-plan.md` e `docs/product/test-evidence.md`
- Registro de bugs: `docs/product/bugs.md`
- Questões em aberto: `docs/product/open-questions.md`
