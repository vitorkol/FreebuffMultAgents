# Histórias de usuário

## 2026-09-16 — consolidação a partir dos requisitos em `docs/product/meetings/`

Este arquivo contém histórias, critérios de aceite e exemplos BDD derivados dos requisitos disponíveis.

---

### História 1 — Autenticação e cadastro

**Dono do serviço:** TI / Backend

**Como** administrador,
**quero** importar e cadastrar usuários,
**para que** professores e alunos possam acessar o sistema com seus perfis corretos.

#### Critérios de aceite

- CA-1: O administrador pode importar CSV e criar usuários inativos.
- CA-2: O sistema envia e-mail de ativação com link para definição de senha.
- CA-3: O login usa e-mail e senha.
- CA-4: A conta é bloqueada por 30 minutos após 5 tentativas incorretas.
- CA-5: A senha obedece às regras de complexidade.
- CA-6: A recuperação de senha envia link com token válido por 1 hora.

#### BDD — Login válido

**Cenário:** Login válido de professor

Dado que existe uma conta ativa
E que o professor informa e-mail e senha corretos
Quando o professor faz login
Então o sistema retorna o token de sessão
E o professor vê seu dashboard

#### BDD — Tentativas incorretas

**Cenário:** Bloqueio após tentativas incorretas

Dado que o professor errou a senha 5 vezes
Quando ele tenta novamente
Então o sistema impede o login
E informa bloqueio por 30 minutos

---

### História 2 — Cadastros básicos

**Dono do serviço:** TI / Backend

**Como** administrador,
**quero** cadastrar turmas, disciplinas e associações professor-disciplina-turma,
**para que** a base acadêmica esteja pronta para a operação.

#### Critérios de aceite

- CA-7: Turma pode ser criada com nome, código, ano, série, turno, sala, datas e status.
- CA-8: Código da turma é único e validado.
- CA-9: Sistema sugere código automático.
- CA-10: Turma tem nível/curso.
- CA-11: Em MVP, turma é homogênea por série.
- CA-12: Turma sem alunos e sem aulas pode ser excluída; com dados, apenas inativada.
- CA-13: Disciplina tem nome, código, carga horária e ementa opcional.
- CA-14: Professor pode ser associado a múltiplas disciplinas e turmas.
- CA-15: Uma disciplina-turma pode ter múltiplos professores, com titular/substituto.
- CA-16: Admin pode importar associações e matrículas via CSV.
- CA-17: Aluno pode ser transferido entre turmas com registro de data e motivo.
- CA-18: Histórico de turmas do aluno é preservado.
- CA-19: Cada aluno tem apenas uma matrícula ativa por ano letivo.

#### BDD — Criação de turma

**Cenário:** Criação de turma com código único

Dado que o administrador está cadastrando uma turma
Quando ele insere dados válidos
Então a turma é criada
E o código é único

---

### História 3 — Cursos e conteúdos

**Dono do serviço:** Backend e Frontend

**Como** professor,
**quero** organizar a disciplina em módulos e aulas,
**para que** o aluno tenha estrutura clara de conteúdo.

#### Critérios de aceite

- CA-20: O professor pode criar módulos dentro de uma disciplina-turma.
- CA-21: Módulo tem título, descrição e ordem.
- CA-22: O professor pode reordenar módulos.
- CA-23: Se não houver módulos, o sistema cria módulo padrão.
- CA-24: Módulo pode ter datas opcionais de início e término.
- CA-25: Módulo tem status: Publicado, Rascunho ou Agendado.
- CA-26: Aula tem título, descrição, editor rico, anexos, link de vídeo e capa opcional.
- CA-27: O professor pode vincular atividade ou prova à aula.
- CA-28: Aula tem status: Rascunho, Publicada ou Agendada.
- CA-29: Arquivos têm limite de 50MB e no máximo 5 anexos por aula.
- CA-30: Editor permite negrito, itálico, listas, links e títulos.
- CA-31: Em MVP, não há duplicação de aulas entre turmas.
- CA-32: Edição de aula publicada pode notificar alunos.
- CA-33: Exclusão de aula inativa, mas preserva histórico.
- CA-34: Aluno navega por disciplina → módulo → aula.
- CA-35: Aluno pode marcar aula como estudada.
- CA-36: Professor vê estatísticas de acesso por aula.
- CA-37: Aluno pode baixar anexos.
- CA-38: Links de vídeo abrem em nova aba.

#### BDD — Publicação de módulo

**Cenário:** Módulo publicado visível ao aluno

Dado que o professor criou um módulo
E o módulo está publicado
Quando o aluno acessa a disciplina
Então o módulo aparece na navegação

---

### História 4 — Atividades e entregas

**Dono do serviço:** Backend e Frontend

**Como** professor,
**quero** criar atividades com prazo e tipo de entrega,
**para que** o aluno entregue trabalho dentro do tempo esperado.

#### Critérios de aceite

- CA-39: Atividade tem título, instruções, critérios, prazo e tipo de entrega.
- CA-40: Entrega pode ser arquivo ou texto.
- CA-41: O sistema aceita PDF, DOC/DOCX, JPG, PNG, com limite de 20MB.
- CA-42: Aluno pode reenviar até o prazo, mantendo histórico.
- CA-43: Entregas após o prazo são marcadas como atrasadas.
- CA-44: Professor pode aceitar ou recusar entrega atrasada.
- CA-45: Prazo é definido com data e hora.
- CA-46: Resposta em texto permite salvar rascunho.
- CA-47: Aluno recebe notificação 24h antes e no dia do prazo.

#### BDD — Reenvio antes do prazo

**Cenário:** Aluno reenvia atividade antes do prazo

Dado que o aluno já enviou uma entrega
E ainda está antes do prazo
Quando ele envia nova versão
Então o sistema substitui a entrega atual
E preserva o histórico

---

### História 5 — Provas e avaliações objetivas

**Dono do serviço:** Backend e Frontend

**Como** professor,
**quero** criar provas objetivas com tempo e questões,
**para que** o aluno faça avaliação segura e o sistema corrija automaticamente.

#### Critérios de aceite

- CA-48: Prova tem título, instruções, tempo, início e término.
- CA-49: Professor pode ver prévia antes de publicar.
- CA-50: No MVP, só há questões objetivas: múltipla escolha e verdadeiro/falso.
- CA-51: Múltipla escolha tem de 2 a 5 alternativas.
- CA-52: Aluno pode alterar respostas antes de finalizar.
- CA-53: Cronômetro regressivo fica visível durante a prova.
- CA-54: Ao terminar o tempo, a prova é entregue automaticamente.
- CA-55: Respostas são salvas automaticamente a cada interação.
- CA-56: Aluno pode retomar prova após queda de conexão.
- CA-57: Copiar/colar é desabilitado durante a prova.
- CA-58: O sistema registra as saídas de aba.
- CA-59: Questões objetivas são corrigidas automaticamente.
- CA-60: Professor vê estatísticas da prova.
- CA-61: Professor define quando o gabarito é liberado.

#### BDD — Prova com tempo

**Cenário:** Tempo expira e prova é entregue

Dado que a prova tem tempo limitado
E o aluno não finalizou antes do fim
Quando o cronômetro chega a zero
Então a prova é entregue automaticamente

---

### História 6 — Notas, rubricas e regras de avaliação

**Dono do serviço:** Backend e Frontend

**Como** professor ou coordenador,
**quero** usar tipos de avaliação, pesos, rubricas e recuperações,
**para que** a nota reflita a política pedagógica da instituição.

#### Critérios de aceite

- CA-62: O sistema tem tipos padrão de avaliação.
- CA-63: O professor pode criar tipos personalizados.
- CA-64: O professor pode definir pesos percentuais.
- CA-65: O sistema exibe média ponderada como referência.
- CA-66: O aluno vê a composição da nota com valores e pesos.
- CA-67: O sistema permite configurar arredondamento.
- CA-68: O professor pode criar rubricas.
- CA-69: A nota da rubrica é a média dos critérios.
- CA-70: A rubrica é visível antes da entrega.
- CA-71: O professor pode comentar por critério.
- CA-72: O sistema identifica alunos abaixo da média mínima para recuperação.
- CA-73: O professor pode criar avaliação de recuperação para alunos específicos.
- CA-74: A menor nota pode ser substituída pela recuperação quando aplicável.
- CA-75: O professor pode marcar segunda chamada autorizada.
- CA-76: O professor pode criar prova de segunda chamada.
- CA-77: A nota de segunda chamada substitui a nota da prova original.

#### BDD — Composição da nota

**Cenário:** Aluno vê composição da nota

Dado que o aluno tem várias avaliações
E os pesos estão configurados
Quando o aluno abre a disciplina
Então ele vê cada avaliação com valor e peso

---

### História 7 — Relatórios e dashboards

**Dono do serviço:** Backend e Frontend

**Como** coordenador, professor ou diretoria,
**quero** ter dashboards e relatórios com alertas,
**para que** a análise pedagógica seja mais rápida e acionável.

#### Critérios de aceite

- CA-78: Dashboard do coordenador mostra alertas de turmas críticas.
- CA-79: Dashboard mostra KPIs institucionais.
- CA-80: Coordenador pode filtrar por turma, disciplina, período e professor.
- CA-81: Sistema identifica alunos sem acesso nos últimos 7 dias.
- CA-82: Sistema identifica alunos em risco.
- CA-83: Coordenador pode ver perfil completo do aluno.
- CA-84: Dashboard do professor mostra entregas por turma e atividade.
- CA-85: Professor vê estatísticas de provas.
- CA-86: Professor vê taxa de acesso por aula.
- CA-87: Professor pode comparar turmas da mesma disciplina.
- CA-88: Aluno vê gráfico de evolução de notas.
- CA-89: Aluno vê indicadores de engajamento.
- CA-90: O sistema gera relatório institucional mensal.
- CA-91: O sistema gera relatório individual para reunião de pais.
- CA-92: Relatórios e dashboards exportam para PDF.
- CA-93: Dados tabulares importam para CSV/Excel.
- CA-94: O sistema permite agendar envio automático de relatórios.
- CA-95: O sistema envia alertas automáticos em indicadores críticos.

#### BDD — Aluno em risco

**Cenário:** Aluno aparecer no painel de risco

Dado que um aluno tem média menor que 5,0
Ou tem 3 ou mais atividades pendentes no bimestre
Quando o coordenador abre o dashboard
Então o aluno aparece como em risco

---

## Dependências

- Autenticação antes de acesso às funcionalidades.
- Cadastros básicos antes de criação de conteúdo e avaliações.
- Tipos de avaliação e pesos antes de regras mais avançadas de nota.

## Em aberto

- Priorização detalhada da sprint depende do refinamento técnico.

---

## Decisão sobre fórmula de média final

- Decisão adotada: até definição institucional final, o sistema calcula média aritmética simples das avaliações ponderadas por tipo.
- Se o professor configurar pesos, o sistema exibe a média ponderada como referência.
- A média final institucional definitiva é decidida posteriormente ou configurada institucionalmente.
- O sistema não bloqueia o fluxo pedagógico com base nessa regra.

---

## Handoff

- **Entrada lida:** `docs/product/meeting-summary.md`, `docs/product/requirements.md` e `docs/product/user-stories.md`
- **Decisões tomadas:** histórias agrupadas por módulo; fórmula de média final adotada como referência; refinamento técnico encaminhado ao Tech Leader
- **Dúvidas e riscos:** ver seção Em aberto
- **Saída gravada:** `docs/product/user-stories.md`
- **Status:** approved

## Aprovação

- **Agente:** ANR
- **Data:** 2026-09-16
- **Justificativa:** decisão sobre fórmula de média final registrada e histórias revisadas antes do refinamento técnico do Tech Leader.

## Aprovação do Tech Leader

- **Agente:** Tech Leader
- **Data:** 2026-09-16
- **Justificativa:** refinamento técnico coerente com a decisão de negócio adotada; o cálculo de média deve ser tratado como serviço isolado e exibido como referência no MVP, com decisão futura sobre regra institucional.

---

## Refinamento técnico — Tech Leader

- O cálculo de média deve ser um serviço backend isolado, não espalhado pela lógica de apresentação.
- Frontend deve deixar claro quando o valor exibido é referência e não valor oficial institucional.
- Pesos, tipos de avaliação e regras de arredondamento devem residir em entidades/configurações separadas.
- Alterações de peso ou regra devem ser rastreáveis para auditoria pedagógica.
- MVP não define política institucional definitiva; isso será uma decisão futura.

---

## Arquivo de refinamento técnico

- O refinamento técnico também foi gravado em `docs/product/technical-refinement.md`.
