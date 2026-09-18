# Plano de testes

**Elaborado por:** QA
**Data:** 2026-09-16
**Entrada lida:** docs/product/user_stories.md e docs/product/sprint-prioritization.md

## Objetivo
Validar os critérios de aceite das histórias selecionadas para a Sprint 1, antes de qualquer implementação final.

## Escopo de teste
- US-08 — Recuperação de senha
- US-07 — Admin cadastra usuários e turmas
- US-01 — Professor publica uma aula simples
- US-02 — Aluno entrega atividade
- US-05 — Aluno veja notas e feedback
- US-04 — Professor veja participação da turma
- US-10 — Configuração de notificações
- US-09 — Manual do primeiro acesso
- US-06 — Coordenador consulte indicadores pedagógicos
- US-03 — Aluno realiza prova objetiva com timer, se estiver dentro da sprint entregue

## Estratégia de teste
- Testes por critério de aceite: cada história será testada para os cenários descritos em user_stories.md.
- Testes de aceite de negócio: validar que o fluxo de publicação de aula está alinhado ao objetivo de publicação rápida, nas condições confirmadas pelo Product Owner.
- Testes de regra de negócio: prazo de entrega, reenvio, edição pós-acesso, timer de prova, salvamento automático e retomada.
- Testes de permissão e perfil: validar separação de comportamento entre admin, professor e aluno.

## Preparação
- Definir dados de teste: perfis, turmas, disciplinas, aulas, atividades, provas e usuários.
- Preparar condições para simular prazos, queda de conexão e reenvio.
- Verificar se a prova objetiva está na entrega da sprint antes de incluir seus testes.

## Critérios de aprovação
- Todos os critérios de aceite das histórias implementadas e entregues são validados sem falha crítica.
- Falhas são registradas em docs/product/bugs.md e, se necessário, o fluxo retorna ao Developer.

## Handoff de QA
- Entrada lida: docs/product/user_stories.md e docs/product/sprint-prioritization.md
- Decisões tomadas: plano focado nos critérios de aceite das histórias da Sprint 1.
- Dúvidas e riscos: o teste do timer e salvamento automático depende da implementação da prova objetiva; critério de “10 minutos” depende da condição confirmada pelo Product Owner.
- Saída gravada: docs/product/test-plan.md
- Status: aguardando implementação
