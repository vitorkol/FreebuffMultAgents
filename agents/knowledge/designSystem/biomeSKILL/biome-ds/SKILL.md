---
name: biome-ds
description: >-
  Gera UI no padrão do Biome Design System (@biome/design-system, ecossistema SEMAD/PSEG/SISEMA/MGFLORESTAS):
  protótipos HTML, componentes React/TSX e specs/docs de interface. Use SEMPRE que o pedido envolver
  criar, prototipar, revisar ou especificar qualquer tela, componente, formulário, tabela, modal,
  dashboard ou fluxo de interface para os sistemas do ecossistema (GAIA, MGDE, SNOT, PSEG, PECMA, MGFLORESTAS,
  CADU, SISDEN, FISC, Portal Ecossistemas) — mesmo que o usuário não cite "Biome" explicitamente.
  Também acione quando ele mencionar tokens, cores, tipografia, componentes do DS, Storybook do
  Biome, ou pedir para deixar algo "no padrão". Esta skill é a fonte de verdade de tokens,
  componentes e regras de consumo do DS.
---

# Biome Design System (biome-ds)

Skill para produzir interfaces **fiéis ao `@biome/design-system`** — o DS oficial do ecossistema
SEMAD/PSEG/SISEMA (React 18/19, Tailwind v4, Radix, ícones Lucide, fontes Roboto/Poppins).

## Regra de ouro: o código do DS é a fonte de verdade

Sempre que houver divergência entre memória, protótipo antigo, print ou instrução avulsa e o que
está no DS, **o DS ganha**. Os valores canônicos vivem em `references/tokens.md`. Nunca invente
hex, tamanho ou nome de token: use os tokens semânticos.

## Escolha do modo

Identifique o que o usuário quer produzir e siga a referência correspondente:

| Se o pedido é… | Modo | Leia |
|---|---|---|
| Protótipo navegável, tela para validar, mock rápido, HTML de uma página | **HTML** | `references/html.md` |
| Componente/tela em React para consumir a lib de verdade (`.tsx`) | **React** | `references/react.md` |
| Documentar, especificar comportamento/props, revisar aderência ao DS | **Docs/Spec** | `references/components.md` + `references/governance.md` |

Em qualquer modo, `references/tokens.md` (tokens) e `references/components.md` (catálogo de
componentes, props e variantes) são a base. Leia o que a tarefa exigir — não precisa carregar tudo.

## Regras duras (valem em TODOS os modos)

Estas regras são o que o DS **impõe** (inclusive via ESLint). Gerar fora delas = fora do padrão.

1. **Tipografia só por classe semântica.** Use `text-display-*`, `text-heading-*`, `text-body-*`,
   `text-label-*`, `text-meta-*`. É **proibido**: escala Tailwind (`text-sm`, `text-lg`, `text-2xl`…),
   `font-*` (exceto `font-sans`, `font-display`, `font-mono`), `leading-*`, `tracking-*` e tamanho
   arbitrário `text-[...]`. A escala e o mapa das classes estão em `references/tokens.md`.
2. **Cor só por token semântico.** `bg-primary`, `text-foreground`, `border-input`,
   `text-destructive-on-surface`, etc. Nunca hex solto no markup. Feedback usa o par
   surface/on-surface (ver tokens).
3. **Componente canônico por props (plug-and-play).** Importe **um** componente e resolva por props
   declarativas (`options`, `items`, `columns`, `intent`, `variant`, `size`…). Não remonte Radix ou
   HTML na mão para reproduzir o caso comum. Composição manual é escape hatch avançado, nunca o
   caminho padrão.
4. **Ícones = Lucide, kebab-case.** Nomes como `circle-check`, `triangle-alert`, `chevron-down`.
   Em React via `<Icon name="…" />`; em HTML via CDN do Lucide (ver `references/html.md`). Nunca
   Tabler, Font Awesome ou SVG avulso.
5. **Tema claro/escuro** é controlado pela classe `.dark` num ancestral (normalmente `<html>` ou
   `<body>`). Todos os tokens já têm par light/dark — não crie cor específica de tema.

## Convenções de entrega (fluxo do Eduardo)

- **Protótipos são versionados manualmente pelo usuário.** Ao gerar um protótipo HTML, informe a
  versão atual e sugira salvar com número incrementado (ex.: `tela-x-prototipo_v2.html`).
- **Mobile-first** quando fizer sentido para o contexto (muitos apps do ecossistema são usados no
  celular). Respeite os breakpoints dos tokens.
- Antes de gerar a versão final de uma tela/história, se o contexto pedir, confirme o escopo — o
  usuário prefere desenho/discussão antes de código.

## O que esta skill NÃO faz

Não substitui a lib em produção: no app real, consome-se `@biome/design-system` via Nexus
(ver `references/react.md`). O modo HTML é para **protótipo/validação**, reproduzindo o visual do DS
sem depender do build.
