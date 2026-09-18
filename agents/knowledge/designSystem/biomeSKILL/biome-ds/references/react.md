# Modo React / TSX

Para código que consome a lib de verdade (`@biome/design-system`) em apps React 18/19 do ecossistema.

## Instalação (projeto consumidor)

1. `.npmrc` na raiz (Nexus interno):
```ini
@biome:registry=https://nexus.meioambiente.mg.gov.br/repository/npm-group/
```
2. `pnpm add @biome/design-system`
3. Importar estilos na raiz da aplicação:
```ts
// A — bundle pronto (Storybook / SPA simples)
import "@biome/design-system/styles.css"

// B — app com Tailwind próprio (recomendado em Next.js): após @import "tailwindcss"
import "@biome/design-system/tokens.css"
import "@biome/design-system/consumption-foundations.css"
```
`consumption-foundations.css` traz o contrato tipográfico (`.text-*`) e ajustes de `@layer base`
para controles nativos.

## Consumo (mandato plug-and-play)

- Importe **o componente canônico** e resolva por props. Não monte Radix/HTML para reproduzir o caso comum.
```tsx
import { Button, Input, Select } from "@biome/design-system"

export function FiltroOrgaos() {
  return (
    <div className="flex items-end gap-3">
      <Input label="Buscar" startIcon="search" placeholder="Sigla ou nome" />
      <Select label="Status" options={statusOptions} placeholder="Todos" />
      <Button iconLeft="filter">Filtrar</Button>
    </div>
  )
}
```
- Props declarativas do DS: `options`, `items`, `columns`, `rows`, `intent`, `variant`, `size`,
  `trigger`, `content`, `footer`. Se você está escrevendo `<SelectRoot><SelectTrigger>…` para um caso
  comum, pare: use `<Select options={…} />`.
- **Escape hatch:** primitivos existem (`DialogContent`, `SelectTrigger`, `TableRow`…) só para layouts
  avançados que o componente de alto nível não cobre. Documente o porquê.

## Regras de estilo dentro do TSX

Valem as regras duras do SKILL.md — e o ESLint do DS reprova o contrário:
- Tipografia: só classes semânticas (`text-heading-s`, `text-body-m`, `text-label-m`…). Proibido
  `text-sm`, `font-medium`, `leading-*`, `tracking-*`, `text-[...]`.
- Cor: tokens (`bg-primary`, `text-destructive-on-surface`, `border-input`). Sem hex.
- `cn(...)` (util do DS, `tailwind-merge` + `clsx`) para compor classes.
- Ícones: `<Icon name="…" />` com nome Lucide kebab-case.
- Novos componentes internos que precisem de variantes: use `cva(...)` (class-variance-authority),
  como os componentes do DS.

## Padrão dos componentes do DS (referência para criar semelhantes)

Os componentes usam `cva` para variantes + `React.forwardRef` + props tipadas. Ex. (Button):
```tsx
const buttonVariants = cva("inline-flex items-center justify-center gap-2 …", {
  variants: {
    variant: { primary: "bg-brand-green text-text-inverse …", danger: "…", /* … */ },
    size: { md: "h-9 rounded-lg px-4 text-label-m …", /* … */ },
  },
  defaultVariants: { variant: "primary", size: "md" },
})
```
Note: alturas/paddings/tipografia sempre por token/classe semântica; nada de valor cru.

## Versionamento / publicação

Semver com bump manual; publish **só via pipeline GitLab CI** (nunca `pnpm publish` local).
`patch` = bugfix/ajuste visual; `minor` = novo componente/prop/variante; `major` = breaking change.
Não publique manualmente — a pipeline garante rastreabilidade.
