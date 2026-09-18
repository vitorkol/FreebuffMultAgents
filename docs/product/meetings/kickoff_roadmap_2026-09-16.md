# Kickoff - Reunião 1: Apresentação do Roadmap do MVP
**Data:** 2026-09-16  
**Duração:** 2 horas  
**Local:** Auditório da Instituição / Stream ao vivo  
**Apresentador:** Product Owner  

---

## Participantes
| Nome | Cargo | Público |
|------|-------|---------|
| Dra. Mariana Souza | Diretora Pedagógica | Diretoria |
| Prof. Ricardo Lima | Coordenador de Ensino | Coordenação |
| Ana Paula Mendes | Gestora de Tecnologia Educacional | TI |
| Carlos Eduardo | Desenvolvedor Sênior | TI |
| Roberto Dias | Representante dos Professores | Docentes |
| Juliana Torres | Representante dos Alunos | Estudantes |
| Dr. Fernando Almeida | Diretor Geral | Alta direção |
| Sra. Beatriz Nunes | Secretária Acadêmica | Administração |
| Equipe de Desenvolvimento (3 devs) | Desenvolvedores | TI |

---

## Agenda (120 minutos)
| Horário | Atividade |
|---------|-----------|
| 0:00 - 0:15 | Abertura pelo Diretor Geral |
| 0:15 - 0:35 | Contexto: Por que o Kimi Academy? |
| 0:35 - 1:05 | Apresentação do Roadmap |
| 1:05 - 1:30 | Discussão e perguntas |
| 1:30 - 1:50 | Alinhamento de expectativas e recursos |
| 1:50 - 2:00 | Encerramento e comunicação oficial |

---

## Transcrição da Reunião

### [0:00 - 0:15] Abertura pelo Diretor Geral

**Dr. Fernando:** Bom dia a todos. Hoje é um dia importante para a nossa instituição. Estamos há anos usando ferramentas genéricas, adaptadas, mal adaptadas, para tentar ensinar no ambiente digital. O resultado todos conhecemos: professores frustrados, alunos desengajados, coordenação sem visibilidade. O Kimi Academy nasce para mudar isso. Não é mais uma ferramenta. É a nossa plataforma. E quero deixar claro: a diretoria apoia totalmente. Vou passar a palavra para o nosso Product Owner.

**Sra. Beatriz:** Só quero acrescentar que a secretaria está preparada para fazer a migração de dados. Temos listas de alunos, professores, turmas e disciplinas em planilhas. Estamos prontos para ajudar.

---

### [0:15 - 0:35] Contexto: Por que o Kimi Academy?

**Product Owner:** Obrigado, Dr. Fernando. Vamos ao contexto. Nas últimas duas semanas, fizemos duas reuniões de Lean Inception com representantes de todos os setores. O que descobrimos?

*[Apresenta slide com dados]*

**Product Owner:** Hoje, 70% dos nossos professores não usam consistentemente a plataforma atual. O tempo médio para publicar uma aula é de 47 minutos. Apenas 15% dos alunos acessam a plataforma mais de uma vez por semana. A coordenação demora 3 dias para montar um relatório de desempenho.

**Prof. Ricardo:** E isso é quando conseguimos. Muitas vezes desistimos.

**Product Owner:** Exatamente. O Kimi Academy foi desenhado a partir das dores reais de quem usa. Não é uma solução pronta que vamos adaptar. É uma solução feita sob medida.

**Roberto:** E o que isso muda na prática?

**Product Owner:** Muda três coisas fundamentais: 
1. **Simplicidade:** O professor publica uma aula em até 10 minutos.
2. **Visibilidade:** O aluno sabe exatamente o que precisa fazer e quando.
3. **Inteligência:** A coordenação identifica problemas antes que sejam irreversíveis.

**Juliana:** E para nós, alunos, vai funcionar no celular?

**Product Owner:** Sim. A interface é responsiva. Não é um aplicativo nativo ainda — isso vem depois —, mas funciona perfeitamente no navegador do celular.

---

### [0:35 - 1:05] Apresentação do Roadmap

**Product Owner:** Vamos ao roadmap. Dividi em três fases.

*[Apresenta slide do roadmap]*

**Product Owner:** 

**FASE 1 — DESCOBERTA E PLANEJAMENTO (Semanas 1-4)**
- Lean Inception (concluído)
- Levantamento de requisitos técnicos detalhados
- Arquitetura do sistema (Laravel + React)
- Design da interface (wireframes e protótipos)
- Setup de ambiente de desenvolvimento

**Dr. Fernando:** Quatro semanas só para planejar? Não é muito?

**Carlos:** Não, Dr. Fernando. Na verdade, é o contrário. Na TI, quanto mais tempo você investe em planejamento, menos tempo perde refazendo. Quatro semanas é o mínimo para fazer direito.

**Product Owner:** Concordo. E durante essas quatro semanas, vamos fazer workshops semanais com professores e alunos para validar cada tela antes de codificar.

**FASE 2 — DESENVOLVIMENTO DO MVP (Semanas 5-16)**
- Sprint 1-2: Autenticação, cadastros e dashboards
- Sprint 3-4: Gestão de aulas e conteúdos
- Sprint 5-6: Módulo de avaliações e provas
- Sprint 7-8: Relatórios, notificações e ajustes
- Sprint 9-10: Testes com usuários reais e correções
- Sprint 11-12: Homologação e preparação para lançamento

**Sra. Beatriz:** E os dados? Quando migramos?

**Ana Paula:** A migração acontece nas semanas 14-15. A secretaria nos envia as planilhas e fazemos a carga automática.

**FASE 3 — LANÇAMENTO E EVOLUÇÃO (Semanas 17-24)**
- Lançamento oficial do MVP
- Treinamento de professores (presencial e online)
- Acompanhamento de adoção e métricas
- Correções de bugs emergenciais
- Planejamento da Onda 2 (fórum, questões dissertativas, calendário)

**Dr. Fernando:** E o investimento? Quanto isso custa?

**Product Owner:** O custo do MVP é de 3 meses de equipe de 3 desenvolvedores full-time, mais infraestrutura em nuvem. Estimamos um investimento de [valor a ser definido pela instituição]. O retorno vem na redução de tempo operacional e no aumento da retenção de alunos.

**Dra. Mariana:** Só para contextualizar: hoje perdemos cerca de 8% dos alunos por insatisfação com o suporte digital. Se reduzirmos isso pela metade, o investimento se paga.

---

### [1:05 - 1:30] Discussão e Perguntas

**Professora Helena (público):** Eu sou professora de Literatura. Minha dúvida é: eu vou precisar aprender a programar para usar isso?

**Product Owner:** De forma alguma, professora. O sistema foi pensado para quem não é da área de tecnologia. Se você consegue usar o Word e o WhatsApp, vai conseguir usar o Kimi Academy. Vamos fazer treinamentos e ter um canal de suporte.

**Aluno Pedro (público):** E se eu não tiver internet em casa?

**Juliana:** Boa pergunta, Pedro.

**Carlos:** O sistema é web, então precisa de internet. Mas o conteúdo em PDF pode ser baixado. Videoaulas por link externo também podem ser baixadas se o professor permitir. Não é offline, mas minimizamos a dependência.

**Prof. Ricardo:** E o suporte? Se travar no meio da prova?

**Ana Paula:** Teremos um canal de suporte em horário comercial. E o sistema tem salvamento automático. Se travar, o aluno retoma de onde parou.

**Secretária Beatriz:** E os pais? Eles vão ter acesso?

**Product Owner:** No MVP, não. O acompanhamento dos pais será feito via relatório enviado pelo professor ou coordenador. Login para pais é funcionalidade futura.

**Dr. Fernando:** Uma pergunta difícil: e se der errado? Se os professores não adotarem?

**Dra. Mariana:** Por isso estamos fazendo testes com usuários reais durante o desenvolvimento. Não vamos esperar o lançamento para descobrir que algo não funciona. E temos métricas claras: se em 3 meses após o lançamento menos de 60% dos professores estiverem usando, fazemos uma revisão profunda.

---

### [1:30 - 1:50] Alinhamento de Expectativas

**Product Owner:** Vamos ao acordo formal. Preciso que todos entendam:

1. **O MVP não terá tudo.** Ele terá o essencial. Funcionalidades como app mobile, chat, gamificação vêm depois.
2. **Haverá bugs.** Qualquer sistema novo tem. Mas teremos um período de estabilização.
3. **A participação de vocês é essencial.** Durante o desenvolvimento, precisamos de professores e alunos para testar.
4. **A diretoria compromete recursos.** A equipe de TI compromete entrega. E a comunidade escolar compromete adoção.

**Dr. Fernando:** Comprometido. A diretoria libera o orçamento e o tempo necessário.

**Roberto:** Os professores se comprometem a participar dos testes.

**Juliana:** E os alunos também.

**Product Owner:** Então temos um acordo. Vou documentar isso e enviar para todos.

---

### [1:50 - 2:00] Encerramento

**Dr. Fernando:** Para encerrar, quero dizer que estou animado. Não é todo dia que uma instituição decide construir algo próprio, do zero, ouvindo quem realmente usa. O Kimi Academy é nosso. Vamos fazer dar certo. Obrigado a todos.

**Product Owner:** A próxima reunião de kickoff será focada na jornada do usuário. Convido todos os professores e alunos interessados a participarem. Obrigado.

---

## Decisões Tomadas
1. Roadmap aprovado em três fases: Descoberta (4 semanas), Desenvolvimento (12 semanas), Lançamento (8 semanas).
2. Investimento aprovado pela diretoria.
3. Secretaria acadêmica comprometida com migração de dados nas semanas 14-15.
4. Comunidade escolar comprometida com participação em testes.
5. Pais não terão login no MVP.
6. Meta de adoção: 60% dos professores em 3 meses pós-lançamento.

## Próximos Passos
- Enviar ata e roadmap formalizado para todos.
- Agendar Kickoff 2: Jornada do Usuário.
- Iniciar fase de levantamento de requisitos técnicos.

---
*Documento gerado em 2026-09-16*
