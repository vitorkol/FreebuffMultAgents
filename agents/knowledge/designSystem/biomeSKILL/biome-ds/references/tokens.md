# Tokens do Biome DS (fonte de verdade)

Todos os valores abaixo vêm do código do DS (`src/tokens.css`, `src/consumption-foundations.css`).
No markup, **use sempre o nome do token** (`bg-primary`, `text-foreground`…), nunca o hex.

## Índice
1. Cores — semânticas e de marca (light/dark)
2. Tipografia — primitivos e escala semântica
3. Spacing
4. Radius, sombra, z-index, opacidade
5. Motion / transição
6. Sizing, layout e breakpoints

---

## 1. Cores

Cada token tem par light/dark. No markup use o nome (`bg-card`, `text-muted-foreground`,
`border-input`…). Troca de tema = classe `.dark` num ancestral.

### Superfícies base
| Token | Light | Dark |
|---|---|---|
| `background` | `#ffffff` | `#0c1410` |
| `foreground` | `#4c4d4d` | `#f0f8f4` |
| `card` / `card-foreground` | `#ffffff` / `#4c4d4d` | `#162019` / `#f5f9f7` |
| `popover` / `popover-foreground` | `#ffffff` / `#1a1a1a` | `#162019` / `#f5f9f7` |

### Papéis semânticos
| Token | Light | Dark |
|---|---|---|
| `primary` / `primary-foreground` | `#264c37` / `#ffffff` | `#2d8a5e` / `#ffffff` |
| `secondary` / `secondary-foreground` | `#e9f4ee` / `#264c37` | `#1e352b` / `#e0f0e8` |
| `muted` / `muted-foreground` | `#f5f5f5` / `#737373` | `#1c2a24` / `#a8c4b8` |
| `accent` / `accent-foreground` | `#f5f5f5` / `#1a1a1a` | `#243530` / `#f0f8f4` |

> **Atenção:** o primary é `#264c37` (light) / `#2d8a5e` (dark). Valores antigos como `#064c37`
> estão desatualizados — não use.

### Feedback — sólido (fundo forte + foreground)
| Intent | Light (`x` / `x-foreground`) | Dark |
|---|---|---|
| `destructive` | `#dc2626` / `#ffffff` | `#f87171` / `#1a1a1a` |
| `success` | `#198754` / `#ffffff` | `#4ade80` / `#052e16` |
| `warning` | `#d97706` / `#ffffff` | `#fbbf24` / `#1a1a1a` |
| `info` | `#2563eb` / `#ffffff` | `#60a5fa` / `#172554` |

### Feedback — surface (fundo suave + borda + texto "on-surface")
Use este trio para Alerts, Badges de status e realces suaves: `bg-<x>-surface`,
`border-<x>-surface-border`, `text-<x>-on-surface`.

| Intent | surface (L/D) | surface-border (L/D) | on-surface (L/D) |
|---|---|---|---|
| success | `#f0fdf4` / `#052e16` | `#bbf7d0` / `#14532d` | `#15803d` / `#4ade80` |
| warning | `#fefce8` / `#422006` | `#fde68a` / `#713f12` | `#a16207` / `#fbbf24` |
| info | `#eff6ff` / `#172554` | `#bfdbfe` / `#1e3a8a` | `#1d4ed8` / `#60a5fa` |
| destructive | `#fef2f2` / `#450a0a` | `#fecaca` / `#7f1d1d` | `#b91c1c` / `#f87171` |
| neutral | `#f3f4f6` / `#1f2937` | `#e5e7eb` / `#374151` | `#4b5563` / `#9ca3af` |

### Formulário / input
| Token | Light | Dark |
|---|---|---|
| `border` / `input` | `#e5e5e5` | `#2f4238` |
| `input-focus` | `#264c37` | `#4ade80` |
| `input-error` | `#dc2626` | `#f87171` |
| `input-success` | `#198754` | `#4ade80` |
| `ring` | `#264c37` | `#4ade80` |
| `label` / `label-required` | `#1a1a1a` / `#dc2626` | `#f0f8f4` / `#f87171` |

### Texto e link
| Token | Light | Dark |
|---|---|---|
| `text-primary` | `#4c4d4d` | `#f0f8f4` |
| `text-muted` | `#9f9f9f` | `#a8c4b8` |
| `text-placeholder` | `#b3b3b3` | `#6b9e8a` |
| `text-disabled` | `#d4d4d4` | `#3a5447` |
| `text-inverse` | `#ffffff` | `#0c1410` |
| `link` | `#396dc0` | `#93c5fd` |

### Marca (brand)
| Token | Light | Dark |
|---|---|---|
| `brand-green` | `#198754` | `#4ade80` |
| `brand-green-dark` | `#024d2a` | `#22c55e` |
| `brand-green-light` | `#157347` | `#86efac` |
| `brand-lime` | `#92b123` | `#d9f99d` |
| `mint` | `#a7f3d0` | `#bbf7d0` |

### Superfícies de layout / comércio
| Token | Light | Dark |
|---|---|---|
| `footer-bg` | `#053b2d` | `#081410` |
| `section-gray` | `#fafafa` | `#111c17` |
| `sale` / `sale-foreground` | `#dc2626` / `#ffffff` | `#f87171` / `#1a1a1a` |
| `promo` / `promo-foreground` | `#f97316` / `#ffffff` | `#fb923c` / `#1a1a1a` |

---

## 2. Tipografia

**Fontes:** `--font-sans: Roboto` (corpo), `--font-display: Poppins` (títulos display).
No Tailwind: `font-sans`, `font-display` (únicas famílias permitidas além de `font-mono`).

### Primitivos de tamanho (px SSOT)
`2xs 10` · `xs 12` · `sm 14` · `base 16` · `lg 18` · `xl 20` · `2xl 24` · `3xl 30` · `4xl 36` ·
`5xl 48` · `6xl 60` · `7xl 72`

Pesos: `regular 400` · `medium 500` · `semibold 600` · `bold 700`.
Line-height: `tight 1.2` · `snug 1.3` · `normal 1.5` · `relaxed 1.625` · `loose 2`.
Letter-spacing: `tight -0.01em` · `normal 0` · `wide 0.025em` · `wider 0.05em`.

### Escala semântica (as ÚNICAS classes de tipografia permitidas)
Cada classe fixa família + tamanho + peso + line-height + tracking. **Não** combine com `text-sm`,
`font-*`, `leading-*` ou `tracking-*`.

| Classe | Família | Tamanho | Peso | Line-height | Tracking |
|---|---|---|---|---|---|
| `text-display-2xl` | display | 72 | bold | tight | tight |
| `text-display-xl` | display | 60 | bold | tight | tight |
| `text-display-l` | display | 48 | bold | tight | tight |
| `text-heading-xl` | display | 30 | bold | tight | tight |
| `text-heading-l` | display | 24 | semibold | snug | normal |
| `text-heading-m` | sans | 20 | semibold | snug | normal |
| `text-heading-s` | sans | 18 | medium | normal | normal |
| `text-heading-xs` | sans | 16 | medium | normal | normal |
| `text-body-l` | sans | 18 | regular | normal | normal |
| `text-body-m` | sans | 16 | regular | normal | normal |
| `text-body-s` | sans | 14 | regular | normal | normal |
| `text-body-xs` | sans | 12 | regular | normal | normal |
| `text-label-m` | sans | 14 | medium | normal | wide |
| `text-label-s` | sans | 12 | medium | normal | wide |
| `text-meta-xs` | sans | 12 | regular | normal | normal |
| `text-meta-2xs` | sans | 10 | regular | normal | normal |

Uso típico: título de página `text-heading-xl`/`text-display-l`; título de card/modal
`text-heading-s`/`text-heading-m`; corpo `text-body-m`/`text-body-s`; rótulo de campo `text-label-m`;
legenda/meta `text-meta-xs`.

---

## 3. Spacing (base 4px)

`--spacing: 4px`. Escala: `1=4` `2=8` `3=12` `4=16` `5=20` `6=24` `8=32` `10=40` `12=48` `14=56`
`16=64` (px). Semânticos: `section-y 60px`, `section-y-desktop 120px`.

---

## 4. Radius, sombra, z-index, opacidade

**Radius:** `xs 4` · `sm 6` · `md 8` (default `--radius`) · `lg 12` · `xl 16` · `2xl 24` · `full 9999`.

**Sombra (light):**
- `xs` `0 1px 2px rgba(0,0,0,.05)`
- `sm` `0 1px 3px rgba(0,0,0,.10), 0 1px 2px -1px rgba(0,0,0,.10)`
- `md` `0 4px 6px -1px rgba(0,0,0,.10), 0 2px 4px -2px rgba(0,0,0,.10)`
- `lg` `0 10px 15px -3px rgba(0,0,0,.10), 0 4px 6px -4px rgba(0,0,0,.10)`
- `xl` `0 20px 25px -5px rgba(0,0,0,.10), 0 8px 10px -6px rgba(0,0,0,.10)`
- `header` `0 1px 4px rgba(0,0,0,.10)`
- No dark, as mesmas com opacidade `.30`–`.40`.

**Z-index:** `dropdown 100` · `sticky 200` · `overlay 300` · `modal 400` · `popover 500` ·
`toast 600` · `tooltip 700`.

**Opacidade:** `disabled .5` · `hover .8` · `muted .7` · `overlay .6 (dark .7)` · `pressed .9`.

---

## 5. Motion / transição

`transition-fast 150ms ease` · `transition-base 200ms ease` · `transition-slow 300ms ease`.
Easings: `in`, `out`, `in-out`. Duração de borda de campo: `150ms`.

Overlays (scrim de modal/sheet): `rgb(0 0 0 / 0.6)` (modal) e `rgb(0 0 0 / 0.8)` (sheet).

---

## 6. Sizing, layout e breakpoints

**Alturas de controle:** `size-sm 32` · `size-md 36` · `size-lg 40` · `size-xl 48` (px).
Isso casa com as alturas dos componentes: campos e botões `h-8/h-9/h-10/h-12`.

**Ícone (presets em px, Lucide):** `xs 14` · `sm 16` · `md 20` · `lg 24` · `xl 32` · `2xl 40` …

**Layout:** header `4rem` (desktop `5rem`); container max `80rem`; padding do container `1rem`.

**Breakpoints:** `xs 23.4375rem (375px)` · `sm 40rem` · `md 48rem` · `lg 64rem` · `xl 80rem` ·
`2xl 96rem`.
