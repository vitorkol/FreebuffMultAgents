# Resumo de reunião

**Fonte consolidada:** reuniões de levantamento de requisitos e kickoff
**Reuniões incorporadas:**
- Lean Inception 1 (2026-09-16)
- Lean Inception 2 (2026-09-16)
- Kickoff Roadmap MVP (2026-09-16)
- Kickoff Jornada do Usuário (2026-09-16)

## Data
2026-09-16

## Participantes
- Dra. Mariana Souza — Diretora Pedagógica (decisora estratégica)
- Prof. Ricardo Lima — Coordenador de Ensino (validação pedagógica)
- Ana Paula Mendes — Gestora de Tecnologia Educacional (viabilidade técnica)
- Carlos Eduardo — Desenvolvedor Sênior (viabilidade técnica)
- Juliana Torres — Representante dos Alunos (voz do estudante)
- Roberto Dias — Representante dos Professores (voz do docente)
- Dr. Fernando Almeida — Diretor Geral (alta direção)
- Sra. Beatriz Nunes — Secretária Acadêmica (administração)
- Professora Helena — Professora de Literatura (docente)
- Prof. João — Professor de Física (docente)
- Pedro Santos — Aluno do 2º ano (estudante)
- Mariana Costa — Aluna do 1º ano (estudante)

## Resumo
O Kimi Academy é uma plataforma institucional de gestão do conhecimento escolar, com foco em conteúdo organizado, avaliação e acompanhamento pedagógico. O trabalho começou com Lean Inception e, em seguida, com os dois kickoffs do MVP. Nas reuniões, participaram representantes de diretoria, coordenação pedagógica, TI, professores e alunos.

As principais convergências foram:
- Simplificar a vida do professor: publicar uma aula em até 10 minutos, a partir do login.
- Entregar visibilidade ao aluno: saber o que precisa fazer e quando, principalmente pela celular.
- Dar visibilidade pedagógica à coordenação: identificar alunos em risco antes da prova final.
- Começar com um MVP funcional de 3 meses, equipe de 3 desenvolvedores, stack Laravel + React.

O backlog inicial saiu da jornada de professor, aluno e coordenador, com separação de ondas:
- Onda 1 (MVP): autenticação, cadastros, aulas com anexos/links, atividades, provas objetivas com timer e salvamento automático, notas, dashboards, notificações.
- Onda 2 (pós-MVP): fórum de dúvidas, questões dissertativas, biblioteca do professor, calendário acadêmico.
- Onda 3 (futuro): app mobile, chat, gamificação, certificados, integração com Google Classroom.

O MVP é web e responsivo, sem login de pais e sem upload nativo de vídeo. Videoaulas são por links externos. Correção automática vale para objetivas; dissertativas devem ser corrigidas pelo professor.

## Decisões
1. Stack definida: Laravel + React.
2. MVP focado no professor; sem gamificação, chat em tempo real nem app nativo no início.
3. Videoaulas por link externo no MVP; upload nativo de vídeo fica para depois.
4. Correção automática apenas para questões objetivas.
5. Provas com temporizador, salvamento automático e retomada em caso de queda de conexão.
6. Login de pais não entra no MVP.
7. Exportação PDF é desejável no MVP, mas não bloqueante.
8. Roadmap dividido em Descoberta (semanas 1-4), Desenvolvimento (semanas 5-16) e Lançamento/Evolução (semanas 17-24).
9. Sprint 1-2 focadas em autenticação, cadastros e dashboards.
10. Diretoria e secretaria comprometeram-se com investimento, migração de dados e participação em testes.

## Dúvidas
1. Qual será o critério exato de UX aceitável para “publicar uma aula em até 10 minutos”? Isso é tempo real medido em qual condição?
2. Quais modelos de e-mail/notificação serão usados no MVP: transacionais, resumo diário ou ambos por padrão?
3. Qual será o formato definitivo do cadastro do professor: exclusivamente por admin ou com opção de auto-cadastro aprovado por admin?
4. Quais planilhas e colunas serão aceitas na migração da secretaria?
5. Qual será a estratégia de fallback para links externos de vídeo em caso de indisponibilidade?
6. Qual permissão de acesso e regra de edição de aula já publicada será adotada quando o primeiro aluno acessar?

## Limite de escopo observado
- KPIs institucionais (adoção, tempo de publicação, acesso semanal dos alunos) foram definidos, mas não foram detalhados critérios de aceite fins de sprint.
- A priorização entre os 14 itens do MVP ainda precisa ser formalizada para a Sprint 1 e não apenas para o MVP como um todo.

---
*Gerado a partir dos registros disponíveis em docs/product/meetings/.
