# eslint-plugin-biome-ds

Regras ESLint para alinhar apps ao **Biome Design System** (SEMAD): tipografia não pode ser montada com utilitários genéricos do Tailwind.

## Instalação

No app consumidor, aponte para o pacote do design system (ex.: dependência `file:` ou versão publicada no registry interno):

```bash
pnpm add -D eslint-plugin-biome-ds@file:../caminho/biome-design-system/eslint-plugin-biome-ds
```

Ou, se o monorepo expuser o plugin via workspace / alias, use o caminho do seu `package.json`.

## Configuração (ESLint “clássico” `.eslintrc.cjs`)

```js
module.exports = {
  plugins: ["biome-ds"],
  rules: {
    "biome-ds/no-manual-typography": "error",
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
}
```

## O que a regra faz

Bloqueia em `className` (JSX):

- escala Tailwind `text-xs`, `text-sm`, … `text-9xl`
- `font-*` exceto `font-sans`, `font-display`, `font-mono`
- `leading-*`, `tracking-*`
- `text-[…]` (tamanhos arbitrários)

Permite cores semânticas (`text-muted-foreground`, …) e escalas nomeadas do DS (`text-body-m`, `text-heading-l`, `text-display-xl`, …).

Use **tags HTML semânticas** ou o componente **`<Typography />`** exportado por `@biome/design-system`.

### Limite atual

Strings apenas quando **visíveis** ao parser (`className="..."`, `className={ '...' }`, `` className={`...`} ``). Chamadas tipo `cn("a", cls)` **não são** analisadas da mesma forma — use o script `governance:typography` nos repositórios ou prefira literals em `className` para o ESLint enxergar.

## Flat config (`eslint.config.js`, ESLint 9+)

```js
import biomeDs from "eslint-plugin-biome-ds"

export default [
  {
    plugins: { "biome-ds": biomeDs },
    rules: {
      "biome-ds/no-manual-typography": "error",
    },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
]
```

(ajuste imports conforme `"type": "module"` ou `require`.)
