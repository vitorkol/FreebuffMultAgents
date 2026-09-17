# FreebuffMultAgents

Projeto-base para organizar um fluxo local de múltiplos agentes em um projeto Laravel + React.

> Observação: os arquivos de configuração deste repositório são uma convenção de projeto. Confirme os nomes e APIs suportados pela versão do Freebuff instalada localmente antes de executar automações.

## Objetivo

Orquestrar o seguinte fluxo:

```text
Resumo de reunião
  -> Revisor
  -> ANR
  -> Revisor
  -> Tech Leader
  -> ANR aprova/prioriza
  -> Developer
  -> QA
      -> falha: bug -> Developer
      -> aprovado: evidências -> ANR
```

## Instalação

```bash
npm install -g freebuff
cd FreebuffMultAgents
freebuff
```

Se o Freebuff exigir um arquivo de configuração ou uma convenção diferente, mantenha `AGENTS.md` como fonte de regras do projeto e adapte o manifesto conforme a documentação da versão instalada.

## Estrutura

```text
.
├── AGENTS.md
├── .agents/
│   ├── agents.manifest.json
│   └── orchestrators/delivery-pipeline.ts
├── agents/
│   ├── agents.md
│   ├── revisor/
│   ├── analista_requisitos/
│   ├── tech_leader/
│   ├── developer/
│   └── qa/
├── docs/product/
├── backend/
└── frontend/
```

## Como iniciar o pipeline

Por padrão, coloque o resumo em `docs/product/meeting-summary.md`, execute `freebuff` na raiz e solicite:

```text
Leia AGENTS.md e agents/agents.md. Execute o pipeline definido em .agents/orchestrators/delivery-pipeline.ts, usando o resumo em docs/product/meeting-summary.md. Preserve os gates de aprovação, salve cada artefato em docs/product/ e não implemente código antes da aprovação do ANR e do Tech Leader.
```

Se sua versão do Freebuff suportar escolha dinâmica, você também pode usar uma pasta de reuniões em `docs/product/meetings/`. Nesse caso, ao iniciar o pipeline o Revisor pode listar ou solicitar qual arquivo de reunião processar, por exemplo:

- `reuniao-16-09-26-tela-cadastro.doc`


## Artefatos

- `meeting-summary-reviewed.md`: resumo revisado
- `requirements.md`: RN, RF e RNF
- `user-stories.md`: histórias, critérios de aceite e BDD
- `technical-refinement.md`: estimativas, riscos e tarefas
- `test-plan.md`: plano de testes
- `test-evidence.md`: evidências
- `bugs.md`: bugs encontrados pelo QA

## Princípios

- O agente não deve inventar informações ausentes; deve registrar dúvidas.
- Cada handoff deve produzir um artefato versionável.
- Aprovações e rejeições devem ser registradas.
- Memórias não devem conter segredos, tokens ou dados pessoais desnecessários.
