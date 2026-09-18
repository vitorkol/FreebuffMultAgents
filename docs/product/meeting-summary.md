# Resumo de reunião

## Contexto

Este resumo foi consolidado a partir dos arquivos em `docs/product/meetings/`, conforme regra do pipeline.

Os arquivos de reunião são conhecidos por todos os agentes, mas não passam pela etapa do Revisor antes de alimentar o pipeline.

## Base usada

- `docs/product/meetings/requisitos_aulas_2026-09-16.md`
- `docs/product/meetings/requisitos_avaliacoes_2026-09-16.md`
- `docs/product/meetings/requisitos_cadastros_2026-09-16.md`
- `docs/product/meetings/requisitos_cursos_2026-09-16.md`
- `docs/product/meetings/requisitos_login_2026-09-16.md`
- `docs/product/meetings/requisitos_relatorios_2026-09-16.md`

## Data

2026-09-16

## Participantes

- Dra. Mariana Souza — Diretora Pedagógica
- Prof. Ricardo Lima — Coordenador de Ensino
- Ana Paula Mendes — Gestora de Tecnologia Educacional
- Carlos Eduardo — Desenvolvedor Sênior
- Roberto Dias — Representante dos Professores
- Juliana Torres — Representante dos Alunos
- Professora Helena — Professora de Literatura
- Prof. João — Professor de Física
- Sra. Beatriz Nunes — Secretária Acadêmica
- Dr. Fernando Almeida — Diretor Geral

## Resumo

1. Lean Inception definiu visão, objetivos e limites do Kimi Academy: plataforma institucional de gestão de aulas, avaliações e acompanhamento pedagógico, com adoção docente como foco prioritário.
2. O sistema terá 3 perfis no MVP: Admin, Professor, Aluno. Coordenador usa perfil de Professor com acesso ampliado a relatórios.
3. Autenticação e cadastro são feitos pelo administrador/administração; sem auto-cadastro público, CPF único, ativação por e-mail.
4. Base acadêmica é turmas, disciplinas e associações professor-disciplina-turma, com importação de matrículas e associações via CSV.
5. Conteúdo é organizado em disciplina → módulo → aula, com editor rico, anexos, links externos e status de publicação.
6. Avaliação inclui atividades com prazo/reenvio, provas objetivas com timer, salvamento automático, correção automática e notas com feedback.
7. Relatórios e dashboards dão visibilidade ao coordenador, professor e aluno, com alertas de risco e exportação PDF/CSV.

## Decisões

- MVP não tem upload nativo de vídeo; uso de links externos no MVP.
- MVP não tem login de pais ou app nativo.
- Correção automática no MVP é apenas para questões objetivas.
- Exportação de relatórios é desejável no MVP, mas não bloqueante para o fluxo deles.

## Dúvidas

- Quais requisitos são bloqueantes para o MVP versus desejáveis?
- Qual a ordem prioritária das próximas implementações da equipe?

> Atenção: este resumo foi criado diretamente a partir dos arquivos de requisitos em `docs/product/meetings/`. Estes arquivos não precisam passar pelo fluxo do Revisor antes de alimentar o pipeline.
