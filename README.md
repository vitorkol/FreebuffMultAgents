# FreebuffMultAgents

Projeto-base para organizar um fluxo local de múltiplos agentes em um projeto Laravel + React.

> Observação: os arquivos de configuração deste repositório são uma convenção de projeto. Confirme os nomes e APIs suportados pela versão do Freebuff instalada localmente antes de executar automações.

## Objetivo

Orquestrar o fluxo de entrega de produto com agentes especializados:

```text
Resumo de reunião
  -> Revisor
  -> ANR (gera requirements + user stories)
  -> Revisor
  -> ANR aprova a user story
  -> Designer (verifica CA, RN/RF/RNF e BDD; gera protótipo no Biome DS)
  -> ANR valida o protótipo
  -> Tech Leader (estima a atividade de desenvolvimento)
  -> ANR prioriza no backlog da sprint
  -> Sprint ativa: libera para o Developer
  -> Developer (código + testes)
  -> QA (acionado pelo Developer)
      -> falha: bug -> Developer
      -> aprovado: evidências -> ANR
```

## Stacks utilizadas

| Camada | Tecnologia | Versão | Observações |
|---|---|---|---|
| Backend | Laravel | 10.50.3 | PHP ^8.1; banco sqlite |
| Runtime backend | PHP | 8.3.33 | `/usr/bin/php8.3` + extensões empacotadas em `backend/php-extensions/` |
| Wrapper de execução | Bash (`backend/php83.sh`) | — | carrega extensões sem sudo; uso: `./php83.sh artisan ...` |
| Design system | Biome DS (`@biome/design-system`) | — | fonte em `agents/knowledge/designSystem/biomeDS`; React 18, Tailwind v4, Radix |
| Banco de dados | SQLite | 3.x | `backend/database/database.sqlite` |
| Testes backend | PHPUnit | 10.5.64 | `./php83.sh vendor/bin/phpunit` |
| Autenticação | Laravel Sanctum | 3.3.3 | tokens de API |
| Debug | Laravel Tinker / Ignition / Collision | 2.11.1 / 2.9.1 / 7.12.0 | ambiente local |
| Frontend | React.js | 18 | planejado na Sprint 1 (estrutura a implementar) |

## Fluxo de agentes

Definição completa em `agents/agents.md`; orquestração em `.agents/orchestrators/delivery-pipeline.ts`.

1. **Revisor** — lê o resumo da reunião e grava `meeting-summary-reviewed.md`.
2. **ANR** (Analista de Requisitos) — grava `requirements.md` e `user-stories.md`; o Revisor revisa e o **ANR aprova a user story**.
3. **Designer** — acionado pelo ANR após a aprovação da U.S. Verifica obrigatoriamente: a) critérios de aceite (CA); b) RN, RF e RNF; c) cenários BDD. Gera o protótipo com o Biome DS, salva em `docs/product/prototype/` + `prototype.md` e informa o ANR.
4. **ANR** — valida o protótipo e aciona o Tech Leader.
5. **Tech Leader** — estima a atividade (abordagem, riscos, dependências, tarefas) em `technical-refinement.md` e devolve ao ANR.
6. **ANR** — prioriza a atividade no backlog da sprint (`sprint-prioritization.md`).
7. **Sprint ativa** — as atividades priorizadas são liberadas para o **Developer**.
8. **Developer** — implementa código e testes e, ao concluir, aciona o QA.
9. **QA** — executa o plano de testes, grava evidências; falha retorna ao Developer; aprovação vai ao ANR.

## Sugestão de evolução: Agente Arquiteto de Soluções

Recomenda-se criar o agente **Arquiteto de Soluções** para atuar entre o Tech Leader e o Developer:

- **Responsabilidades:** definir arquitetura de referência (padrões, limites de contexto, contratos de API, modelo de dados), validar as decisões técnicas do Tech Leader, garantir aderência ao design system e à estratégia de integração backend/frontend, e documentar as decisões de arquitetura (ADRs).
- **Momento no fluxo:** após a estimativa do Tech Leader e antes da liberação para o Developer; também revisaria mudanças estruturais durante a sprint.
- **Benefícios:** reduz retrabalho estrutural, padroniza decisões cross-stack (Laravel + React + Biome DS) e preserva a rastreabilidade requisito -> arquitetura -> tarefa -> teste.

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
│   ├── designer/
│   ├── tech_leader/
│   ├── developer/
│   └── qa/
├── agents/knowledge/designSystem/   (Biome DS - fonte de verdade de UI)
├── docs/product/
├── backend/
└── frontend/
```

## Como iniciar o pipeline

Por padrão, coloque o resumo em `docs/product/meeting-summary.md`, execute `freebuff` na raiz e solicite:

```text
Leia AGENTS.md e agents/agents.md. Execute o pipeline definido em .agents/orchestrators/delivery-pipeline.ts, usando o resumo em docs/product/meeting-summary.md. Preserve os gates de aprovação, salve cada artefato em docs/product/ e não implemente código antes da aprovação do ANR, do protótipo do Designer e do refinamento do Tech Leader.
```

Se sua versão do Freebuff suportar escolha dinâmica, você também pode usar uma pasta de reuniões em `docs/product/meetings/`. Nesse caso, ao iniciar o pipeline o Revisor pode listar ou solicitar qual arquivo de reunião processar, por exemplo:

- `reuniao-16-09-26-tela-cadastro.doc`

## Backend: como executar

O backend usa o PHP 8.3 do sistema com extensões empacotadas no repositório (não requer sudo):

```bash
cd backend
./php83.sh artisan about          # ambiente
./php83.sh artisan serve          # servidor local
./php83.sh vendor/bin/phpunit     # testes
```

## Artefatos

- `meeting-summary-reviewed.md`: resumo revisado
- `requirements.md`: RN, RF e RNF
- `user-stories.md`: histórias, critérios de aceite e BDD
- `prototype/` + `prototype.md`: protótipos do Designer e registro de handoff
- `technical-refinement.md`: estimativas, riscos e tarefas
- `sprint-prioritization.md`: priorização do backlog da sprint
- `test-plan.md`: plano de testes
- `test-evidence.md`: evidências
- `bugs.md`: bugs encontrados pelo QA

## Princípios

- O agente não deve inventar informações ausentes; deve registrar dúvidas.
- Cada handoff deve produzir um artefato versionável.
- Aprovações e rejeições devem ser registradas.
- Memórias não devem conter segredos, tokens ou dados pessoais desnecessários.
