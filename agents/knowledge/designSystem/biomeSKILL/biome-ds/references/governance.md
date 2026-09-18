# Governança do Biome DS

Regras arquiteturais e restrições que o DS impõe. Servem para gerar no padrão e para revisar
aderência. Fonte: `docs/Governance.mdx`, `eslint-rules/no-manual-typography.ts`, `README.md`.

## Mandato plug-and-play

Todo componente de consumo é **plug-and-play por padrão**:
- O app importa **um componente canônico** e resolve o caso comum por props declarativas.
- Não se monta estrutura do zero com primitivos para reproduzir o fluxo comum.
- Caminho manual (primitivos Radix) existe apenas como **escape hatch avançado**, nunca recomendado.
- Entregue API declarativa pronta (`options`, `items`, `columns`, `trigger`, `content`, `footer`)
  sem exigir montagem manual.

**Alto nível vs. primitivo:** exponha componente de alto nível quando o padrão é único e recorrente
(campo com label/erro/tamanhos). Mantenha primitivos só para casos avançados que exigem flexibilidade
(`SelectTrigger`, peças de `Dialog`) ou para testar comportamento de baixo nível. Não exponha vários
nomes públicos para o mesmo problema sem razão documentada.

**Fora de escopo público atual:** `Card` e `Typography` não fazem parte da superfície pública.
(No modo HTML há uma superfície `.ds-card` só para protótipo — não confundir com componente do DS.)

## Regra dura de tipografia (ESLint reprova o contrário)

A regra `no-manual-typography` **proíbe** no código:
- Escala Tailwind de tamanho: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` … `text-9xl`.
- Tamanho arbitrário: `text-[...]`.
- `font-*` — **exceto** `font-sans`, `font-display`, `font-mono`.
- `leading-*` e `tracking-*`.

**Permitido:** as classes semânticas do DS (`text-display-*`, `text-heading-*`, `text-body-*`,
`text-label-*`, `text-meta-*`), cores (`text-primary`, `text-muted-foreground`…) e as três famílias.
A escala semântica completa está em `references/tokens.md` §2.

## Cor e espaçamento

- Cor sempre por token semântico (`bg-primary`, `text-destructive-on-surface`, `border-input`).
  Nada de hex no markup.
- Feedback usa o par **surface / surface-border / on-surface** (Alerts, Badges de status), não o
  token sólido.
- Spacing na escala de 4px; alturas de controle sm 32 / md 36 / lg 40 / xl 48.

## Ícones

Lucide, kebab-case, via o registry do DS (`<Icon name="…" />` em React; CDN em HTML). 1500+ ícones.
Não usar Tabler, Font Awesome ou SVG avulso — mantém consistência e o contrato de tamanho por preset.

## Versionamento e publicação

- Semver com **bump manual** (o mantenedor decide patch/minor/major conscientemente).
- Publicação **exclusivamente via pipeline GitLab CI** disparada por tag `v*.*.*`. Nunca
  `pnpm publish` local — a pipeline garante rastreabilidade (quem, quando, qual commit) para
  auditoria e rollback.
- `patch`: bugfix, ajuste visual, fix de tipografia. `minor`: novo componente/prop/variante.
  `major`: remoção de componente, mudança de API, breaking change.
- Push em `main` roda só validação (typecheck, governança, testes, build); publish só na tag.

## Regra de fonte de verdade (desta skill)

Havendo divergência entre memória, protótipo antigo, print ou instrução avulsa e o código do DS,
**o código do DS prevalece**. Ao atualizar esta skill após evolução do DS, revise `tokens.md` e
`components.md` a partir do fonte atual.
