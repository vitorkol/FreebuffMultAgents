# Orquestração dos agentes

## Entrada

`docs/product/meeting-summary.md`

## Pipeline

1. **Revisor** lê o resumo e grava `meeting-summary-reviewed.md`.
2. **ANR** lê o resumo revisado e grava `requirements.md` e `user-stories.md`.
3. **Revisor** revisa `user-stories.md` e registra correções no próprio artefato.
4. **ANR** aprova a user story (gate) e, em seguida, **aciona o Designer**.
5. **Designer** recebe a história aprovada e, obrigatoriamente: a) verifica os critérios de aceite (CA); b) verifica as RN, RF e RNF; c) verifica os cenários BDD. Gera o protótipo fundamentado no design system (Biome DS), salva os artefatos em `docs/product/prototype/` e registra o handoff em `docs/product/prototype.md`. Ao concluir, **informa o ANR**.
6. **ANR** valida o protótipo (gate) e **aciona o Tech Leader**.
7. **Tech Leader** estima a atividade de desenvolvimento (abordagem, riscos, dependências e tarefas) e grava `technical-refinement.md`; em seguida, **devolve ao ANR**.
8. **ANR** prioriza a atividade no backlog da sprint e grava `sprint-prioritization.md` (gate de priorização).
9. **Sprint ativa**: com a sprint iniciada e a atividade priorizada, as tarefas são **liberadas para o Developer** programar (código e testes).
10. **Developer**, ao concluir, **aciona o QA**.
11. **QA** executa o plano de testes e grava `test-evidence.md`.
12. Se houver falha, QA atualiza `bugs.md` e o fluxo retorna ao Developer.
13. Se aprovado, QA encaminha as evidências ao ANR para aprovação final.

## Contrato de handoff

Cada handoff deve informar:

- entrada lida;
- decisões tomadas;
- dúvidas e riscos;
- saída gravada;
- status: `aprovado`, `revisão necessária` ou `bloqueado`.

## Comando inicial sugerido

```text
Leia AGENTS.md e este arquivo. Execute somente as etapas possíveis a partir de docs/product/meeting-summary.md. Respeite os gates de aprovação e grave os artefatos em docs/product/.
```
