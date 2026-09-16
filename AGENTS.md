# AGENTS.md

## Contexto

Este é um projeto Laravel + React com um fluxo local de agentes organizado em arquivos versionados.

## Agentes

- **Revisor**: corrige clareza, gramática, ortografia e terminologia.
- **ANR**: analisa requisitos e produz RN, RF, RNF, critérios de aceite, BDD e histórias de usuário.
- **Tech Leader**: avalia riscos, arquitetura, estimativas e tarefas técnicas.
- **Developer**: implementa somente histórias aprovadas e executa testes automatizados.
- **QA**: valida critérios de aceite, registra evidências e abre bugs quando necessário.

## Regras de segurança e qualidade

1. Não exponha segredos, tokens ou conteúdo de `.env`.
2. Não altere o escopo sem registrar uma dúvida ou decisão.
3. Não implemente antes de haver história, critérios de aceite e refinamento técnico aprovados.
4. Execute os testes relevantes antes de declarar uma tarefa concluída.
5. Toda falha deve ser registrada em `docs/product/bugs.md`.
6. Toda aprovação deve conter data, agente e justificativa.
7. Prefira mudanças pequenas, revisáveis e reversíveis.

## Artefatos obrigatórios

O fluxo usa os arquivos em `docs/product/`. O agente deve criar ou atualizar os artefatos sem apagar histórico relevante.

## Critério de parada

Se faltar contexto, permissão, dependência ou decisão de negócio, pare a etapa e registre a pendência em `docs/product/open-questions.md`.
