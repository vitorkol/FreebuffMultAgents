# Lean Inception - Reunião 2: Jornadas, Funcionalidades e Canvas MVP
**Data:** 2026-09-16  
**Duração:** 2 horas  
**Local:** Sala de Reuniões Pedagógicas / Google Meet  
**Facilitador:** Product Owner  

---

## Participantes
| Nome | Cargo | Papel na Reunião |
|------|-------|------------------|
| Dra. Mariana Souza | Diretora Pedagógica | Decisora estratégica |
| Prof. Ricardo Lima | Coordenador de Ensino | Validação pedagógica |
| Ana Paula Mendes | Gestora de Tecnologia Educacional | Viabilidade técnica |
| Carlos Eduardo | Desenvolvedor Sênior | Viabilidade técnica |
| Juliana Torres | Representante dos Alunos | Voz do estudante |
| Roberto Dias | Representante dos Professores | Voz do docente |

---

## Agenda (120 minutos)
| Horário | Atividade |
|---------|-----------|
| 0:00 - 0:10 | Revisão da Reunião 1 |
| 0:10 - 0:40 | Mapeamento de Jornadas de Usuário |
| 0:40 - 1:10 | Brainwriting de Funcionalidades |
| 1:10 - 1:35 | Sequenciador de Funcionalidades |
| 1:35 - 1:50 | Canvas MVP |
| 1:50 - 2:00 | Encerramento e próximos passos |

---

## Transcrição da Reunião

### [0:00 - 0:10] Revisão da Reunião 1

**Facilitador:** Bom dia novamente. Na última reunião definimos a visão, os objetivos e as personas. Hoje vamos desenhar como cada persona usa o sistema no dia a dia, gerar ideias de funcionalidades e, no final, definir o que entra no MVP. Quem trouxe o café?

**Juliana:** Eu trouxe! E trouxe também as dúvidas que surgiram com meus colegas.

**Dra. Mariana:** Antes de começar, só quero reforçar: o foco é o professor. Se o professor não adotar, não adianta ter a funcionalidade mais linda do mundo.

**Prof. Ricardo:** E eu trouxe um caderno com as dores reais dos professores. Vamos usar isso.

---

### [0:10 - 0:40] Mapeamento de Jornadas de Usuário

**Facilitador:** Vamos começar pela jornada do Professor Carlos. Roberto, me ajuda aqui. O que o professor faz desde o momento que decide usar o Kimi Academy até publicar a primeira aula?

**Roberto:** Primeiro, ele precisa entrar no sistema. Então: faz login. Mas antes disso, alguém precisa ter cadastrado ele.

**Ana Paula:** Sim, o administrador cadastra os professores. Ou o professor se cadastra e um administrador aprova?

**Dra. Mariana:** No nosso caso, o ideal é o administrador cadastrar. Assim a gente controla quem entra. Mas o professor precisa definir sua senha no primeiro acesso.

**Facilitador:** Registrado. Passo 1: Administrador cadastra professor → Professor recebe e-mail → Professor define senha → Faz login.

**Prof. Ricardo:** Depois do login, o professor precisa ver o que ele tem para trabalhar. Quais turmas, quais disciplinas.

**Roberto:** Sim. Ele entra no painel e vê: "Minhas Turmas". Clica na turma e vê os módulos ou unidades.

**Juliana:** E como ele cria uma aula? Passo a passo.

**Roberto:** Ele clica em "Nova Aula". Escolhe o título, escreve uma descrição, anexa um PDF ou coloca um link de vídeo. Define se é conteúdo ou atividade.

**Carlos:** Peraí. Ele anexa o PDF no momento ou já tinha um repositório de materiais?

**Prof. Ricardo:** No dia a dia, o professor já tem o PDF no computador. Ele quer subir na hora. Não quer ter que cadastrar material antes.

**Ana Paula:** Mas e se ele quiser reutilizar um PDF de outra turma?

**Roberto:** Aí ele precisa de uma biblioteca pessoal. Mas isso é complexo. No MVP, ele sobe o arquivo direto na aula.

**Dra. Mariana:** Concordo. Biblioteca pessoal é fase 2. No MVP, upload direto.

**Facilitador:** Então a jornada do professor é:
1. Recebe cadastro do admin
2. Define senha e faz login
3. Vê painel com turmas/disciplinas
4. Entra em uma turma
5. Cria nova aula (título, descrição, anexos/links)
6. Publica a aula
7. Alunos recebem notificação (e-mail ou no sistema)

**Juliana:** Agora a minha jornada. Eu sou a Aluna Júlia.

**Facilitador:** Conta pra gente, Juliana.

**Juliana:** Eu recebo um e-mail dizendo que fui matriculada no Kimi Academy. Clico no link, crio minha senha. Faço login.

**Prof. Ricardo:** Você vê o quê primeiro?

**Juliana:** Eu quero ver o que tenho para fazer HOJE. Não quero navegar por menus. Quero um painel que diga: "Você tem 2 tarefas pendentes e 1 prova na próxima semana."

**Ana Paula:** Isso é um dashboard personalizado.

**Juliana:** Exato. Daí eu clico na tarefa, leio o que preciso fazer, entrego o arquivo ou respondo no sistema.

**Roberto:** E se for uma prova?

**Juliana:** Aí eu clico em "Iniciar Prova". O sistema mostra o tempo. Eu respondo. Se minha internet cair, quando eu voltar, continua de onde parei.

**Carlos:** Técnicamente isso é possível com salvamento automático a cada resposta.

**Dra. Mariana:** E depois da prova?

**Juliana:** Eu quero ver minha nota. E quero ver o gabarito comentado pelo professor. Não adianta só saber que errei a 3. Quero saber por quê.

**Facilitador:** Ótimo. Jornada da aluna:
1. Recebe cadastro
2. Define senha e faz login
3. Vê dashboard com tarefas e provas pendentes
4. Acessa aula/conteúdo
5. Entrega atividade ou faz prova
6. Recebe nota e feedback

**Prof. Ricardo:** E a jornada do coordenador?

**Dra. Mariana:** O coordenador faz login, vê um dashboard com indicadores. Taxa de entrega de atividades, média de notas por turma, alunos com frequência baixa.

**Ana Paula:** Ele precisa conseguir clicar em um aluno e ver o histórico completo: notas, entregas, frequência.

**Carlos:** Isso é um relatório individual. Técnicamente é uma query com filtros.

**Dra. Mariana:** E ele precisa exportar isso para PDF para levar em reunião com pais.

**Facilitador:** Registrado. Jornada do coordenador:
1. Login
2. Dashboard com KPIs pedagógicos
3. Filtros por turma, disciplina, período
4. Relatório individual do aluno
5. Exportação para PDF

---

### [0:40 - 1:10] Brainwriting de Funcionalidades

**Facilitador:** Agora vamos gerar funcionalidades. Cada um escreve em post-its virtuais. 5 minutos. Depois a gente agrupa.

*[5 minutos de escrita individual]*

**Facilitador:** Vamos ler. Roberto, começa.

**Roberto:** 
- Cadastro de usuários com perfis (admin, professor, aluno)
- Login com e-mail e senha
- Recuperação de senha
- Cadastro de turmas e disciplinas
- Associação professor-turma-disciplina
- Criação de aulas com título, descrição, anexos
- Upload de PDF, DOC, imagens
- Link para videoaulas externas
- Criação de atividades com prazo
- Criação de provas com temporizador
- Questões objetivas (múltipla escolha, V/F)
- Questões dissertativas
- Correção automática de objetivas
- Lançamento de notas pelo professor
- Dashboard do aluno com tarefas pendentes
- Dashboard do professor com turmas
- Dashboard do coordenador com indicadores
- Relatório de desempenho por turma
- Relatório individual do aluno
- Exportação de relatórios para PDF
- Notificações por e-mail
- Fórum de dúvidas por turma
- Calendário acadêmico
- Biblioteca de materiais do professor
- Chat professor-aluno
- Aplicativo mobile
- Integração com Google Classroom
- Certificados automáticos
- Gamificação com pontos e badges

**Juliana:** Uau, Roberto. Você pensou em tudo.

**Dra. Mariana:** Agora precisamos ser realistas. Vamos agrupar isso.

**Facilitador:** Vou agrupar em temas:
- **Autenticação e Acesso:** Login, cadastro, recuperação de senha, perfis
- **Gestão Acadêmica:** Turmas, disciplinas, associações, calendário
- **Conteúdo:** Aulas, anexos, links de vídeo
- **Avaliação:** Atividades, provas, questões, correção, notas
- **Comunicação:** Notificações, fórum, chat
- **Relatórios:** Dashboards, relatórios, exportação
- **Extras:** App mobile, integrações, gamificação, certificados, biblioteca

**Ana Paula:** Os extras são claramente pós-MVP.

**Prof. Ricardo:** Concordo. Mas o fórum de dúvidas é importante. O aluno precisa perguntar.

**Dra. Mariana:** Fórum sim, mas simples. Tipo um mural de dúvidas por turma. Não precisa ser sofisticado.

---

### [1:10 - 1:35] Sequenciador de Funcionalidades

**Facilitador:** Vamos ao sequenciador. Dividimos em ondas. Onda 1 é o MVP — o mínimo para entregar valor.

**Carlos:** Tecnicamente, tudo começa com autenticação. Sem login, nada funciona.

**Ana Paula:** E sem cadastro de turmas e disciplinas, o professor não tem onde criar aula.

**Facilitador:** Então Onda 1 (MVP) é:
1. Login e cadastro de usuários com perfis
2. Recuperação de senha
3. Cadastro de turmas, disciplinas e associações
4. Dashboard básico do professor (ver turmas)
5. Criação de aulas com anexos e links
6. Criação de atividades com prazo
7. Criação de provas com temporizador e questões objetivas
8. Dashboard do aluno com tarefas pendentes
9. Entrega de atividades e realização de provas
10. Lançamento de notas pelo professor
11. Dashboard do coordenador com indicadores básicos
12. Relatório individual do aluno
13. Exportação de relatórios para PDF
14. Notificações por e-mail

**Prof. Ricardo:** Isso é muito para um MVP?

**Carlos:** São 14 itens, mas muitos são CRUDs simples. O mais complexo é a prova com temporizador e salvamento automático.

**Ana Paula:** Eu diria que é um MVP robusto, mas factível em 3 meses com uma equipe pequena.

**Dra. Mariana:** E se precisarmos cortar algo?

**Facilitador:** O que seria menos crítico?

**Prof. Ricardo:** O relatório individual com exportação PDF. O coordenador pode ver na tela por enquanto.

**Juliana:** E as notificações por e-mail? O aluno pode entrar no sistema e ver.

**Dra. Mariana:** Não. Notificação é importante para lembrar o aluno. Sem isso, ele esquece.

**Facilitador:** Então vamos manter notificações. E deixar exportação PDF como "se der tempo".

**Onda 2 (Pós-MVP - Mês 4-5):**
- Fórum de dúvidas por turma
- Questões dissertativas com correção manual
- Biblioteca pessoal do professor
- Calendário acadêmico

**Onda 3 (Futuro):**
- Aplicativo mobile
- Chat em tempo real
- Gamificação
- Certificados automáticos
- Integração com Google Classroom

---

### [1:35 - 1:50] Canvas MVP

**Facilitador:** Vamos preencher o Canvas MVP.

| Seção | Conteúdo |
|-------|----------|
| **Proposta Única de Valor** | Plataforma intuitiva para gestão de aulas, avaliações e acompanhamento pedagógico, reduzindo o tempo operacional do professor em 50%. |
| **Personas** | Professor Carlos, Aluna Júlia, Coordenadora Pedagógica, Administrador |
| **Jornadas** | Professor publica aula em menos de 10 minutos; Aluna vê tarefas pendentes e entrega; Coordenador identifica alunos em risco |
| **Funcionalidades MVP** | Login/cadastro, turmas/disciplinas, aulas com anexos, atividades, provas objetivas com timer, notas, dashboards, notificações |
| **Métricas** | 100% professores ativos, 80% alunos acessando 3x/semana, redução de 50% no tempo de publicação |
| **Custo e Cronograma** | 3 meses, equipe de 3 desenvolvedores (full-stack, front-end, back-end) |
| **Riscos** | Resistência dos professores à tecnologia; problemas de conectividade dos alunos; complexidade do módulo de provas |

**Dra. Mariana:** Está claro. Está objetivo. Gostei.

**Prof. Ricardo:** Eu também. Agora precisamos transformar isso em requisitos técnicos.

---

### [1:50 - 2:00] Encerramento

**Facilitador:** Na próxima semana começamos os kickoffs. Um para apresentar o roadmap para a diretoria e outro para apresentar a jornada do usuário para professores e alunos. Alguma dúvida final?

**Juliana:** Só uma: o nome Kimi Academy é definitivo?

**Dra. Mariana:** Por enquanto, sim. Temos outros 3 meses para mudar de ideia.

**Facilitador:** Ótimo. Encerramos por hoje. Obrigado a todos.

---

## Decisões Tomadas
1. MVP terá 14 funcionalidades principais, focadas em autenticação, conteúdo, avaliação e relatórios.
2. Upload de vídeo nativo fica para pós-MVP; links externos no MVP.
3. Exportação PDF é desejável no MVP, mas não bloqueante.
4. Fórum de dúvidas fica para Onda 2.
5. App mobile, gamificação e integrações são Onda 3.
6. Cronograma estimado: 3 meses para o MVP.

## Próximos Passos
- Preparar apresentação do Roadmap para Kickoff 1.
- Preparar material de Jornada do Usuário para Kickoff 2.
- Iniciar levantamento de requisitos técnicos detalhados.

---
*Documento gerado em 2026-09-16*
