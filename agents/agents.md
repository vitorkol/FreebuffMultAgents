# Orquestração dos agentes

## Entrada

`docs/product/meeting-summary.md`

## Pipeline

1. **Revisor** lê o resumo e grava `meeting-summary-reviewed.md`.
2. **ANR** lê o resumo revisado e grava `requirements.md` e `user-stories.md`.
3. **Revisor** revisa `user-stories.md` e registra correções no próprio artefato.
4. **Tech Leader** lê a história aprovada e grava `technical-refinement.md`.
5. **ANR** revisa o refinamento e registra a priorização da sprint.
6. **Developer** implementa a história e seus testes.
7. **QA** executa o plano de testes e grava `test-evidence.md`.
8. Se houver falha, QA atualiza `bugs.md` e o fluxo retorna ao Developer.
9. Se aprovado, QA encaminha as evidências ao ANR para aprovação final.

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
