# Tipografia: contrato HTML ↔ tokens ↔ Figma

O Biome aplica tipografia em **duas camadas alinhadas**:

1. **Elementos HTML** (`h1`–`h6`, `p`, `small`, `label`) — estilos definidos fora de `@layer` em `src/styles.css`, **iguais** aos utilitários `.text-*` correspondentes (semântica e classe não devem divergir).
2. **Overrides** — apenas quando não há elemento adequado (`span`, `div`, triggers Radix): use **`text-body-m`**, **`text-label-s`**, **`text-display-xl`**, etc.

Não aplique classes `text-*` / `font-*` / `leading-*` só para “reforçar” o mesmo nível já dado pelo elemento semântico (cores como `text-muted-foreground` são permitidas).

## Mapeamento oficial (1:1)

| HTML    | Utility (espelho) | Estilo no Figma |
| ------- | ----------------- | --------------- |
| `h1`    | `text-display-xl` | Display / XL    |
| `h2`    | `text-heading-l`  | Heading / L     |
| `h3`    | `text-heading-m`  | Heading / M     |
| `h4`    | `text-heading-s`  | Heading / S     |
| `h5`    | `text-heading-xs` | Heading / XS    |
| `h6`    | `text-body-xs`    | Body / XS       |
| `p`     | `text-body-m`     | Body / M        |
| `small` | `text-meta-xs`    | Meta / XS       |
| `label` | `text-label-m`    | Label / M       |

Valores numéricos: ver **`typography.json`** (export alinhado ao CSS).

## Quando usar `text-*`

- Quando **não** existir elemento semântico (trecho em `span`, `div`, conteúdo de Radix).
- Quando precisar de um **nível fora da hierarquia do documento** de forma intencional (ex.: destaque com `text-display-l` num bloco que não é `h1`).

## Exemplo sem classes de tipografia

```html
<link rel="stylesheet" href="@biome/design-system/styles.css" />
<h1>Título de página</h1>
<h2>Seção</h2>
<h3>Subseção</h3>
<p>Corpo de texto.</p>
<small>Metadado ou nota de rodapé.</small>
```

Validação local:

- `pnpm governance:typography-contract` — evita tipografia redundante em elementos semânticos em `src/components/ui`.

## Uso em árvores sem semântica nativa

Quando a estrutura for apenas `div`/`span` (slots, células compostas, wrappers de Radix), use as classes semânticas do DS:

```tsx
<span className="text-heading-m">Ferramentas</span>
<span className="text-body-m">Mesmo estilo visual, sem novo nível semântico</span>
```
