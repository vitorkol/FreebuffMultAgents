# @biome/design-system

Design System do ecossistema **SEMAD/PSEG**: componentes React, tokens de design e sistema de ícones prontos para uso nas aplicações do portfólio.

## Instalação (projetos consumidores)

**1. Crie um `.npmrc` na raiz do projeto:**

```ini
@biome:registry=https://nexus.meioambiente.mg.gov.br/repository/npm-group/
//nexus.meioambiente.mg.gov.br/repository/npm-group/:_auth=bnBtLXJlYWRlci11c2VyOm5wbS1yZWFkZXItdXNlci0xMjM=
```

**2. Instale:**

```bash
pnpm add @biome/design-system
```

**3. Importe os estilos na raiz da aplicação:**

```ts
// Opção A — bundle CSS do pacote (Storybook / SPA simples)
import "@biome/design-system/styles.css"

// Opção B — app com `@import "tailwindcss"` próprio (recomendado em Next.js)
import "@biome/design-system/tokens.css"
import "@biome/design-system/consumption-foundations.css"
```

O arquivo `consumption-foundations.css` disponibiliza o contrato tipográfico por classes semânticas (`.text-*`) e complementos de `@layer base` para controles (`button`, `input`, etc.) alinhados ao `styles.css` do pacote.

## Uso

```tsx
import { Button, Input, Select } from "@biome/design-system"

export function Example() {
  return (
    <form>
      <Input label="Full name" placeholder="Jane Doe" />
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

Requer **React 18 ou 19** como peer dependency.

## Regra de consumo (Plug-and-Play)

- O app consumidor deve usar os componentes canônicos do Biome por props declarativas.
- Componentes do Biome devem resolver o caso comum sem exigir composição manual de primitives.
- Montagem manual fica restrita a cenários avançados (escape hatch), nunca como caminho padrão.

## Desenvolvimento

```bash
pnpm install
pnpm storybook        # dev server na porta 6006
pnpm build            # gera o pacote em dist/
pnpm build-storybook  # gera o Storybook estático
pnpm typecheck        # tsc --noEmit
pnpm test             # vitest + eslint rule
```

## Versionamento e Publicação

A lib segue **Semantic Versioning** (semver) com bump manual e publish automático via pipeline.

### Por que bump manual?

- O mantenedor decide conscientemente o tipo de mudança (patch, minor, major)
- Evita versões acidentais por merge de qualquer commit
- Garante que o CHANGELOG e a comunicação com consumidores sejam intencionais
- A pipeline só publica se todos os checks passarem (typecheck, governance, testes, build)

### Fluxo de release

> **IMPORTANTE:** A publicação de novas versões deve acontecer **exclusivamente via pipeline do GitLab CI**. Nunca publique manualmente com `pnpm publish` na sua máquina. A pipeline garante rastreabilidade completa: quem criou a tag, quando, qual commit exato gerou o artefato publicado. Isso é essencial para auditoria, rollback e confiança dos consumidores.

```bash
# 1. Faça suas alterações e commite normalmente na branch main
git add . && git commit -m "feat: novo componente Card"

# 2. Quando estiver pronto pra release, faça o bump
pnpm version patch   # 0.1.0 → 0.1.1 (bugfix)
pnpm version minor   # 0.1.0 → 0.2.0 (nova feature, retrocompatível)
pnpm version major   # 0.1.0 → 1.0.0 (breaking change)

# 3. Push com a tag — isso dispara o publish no Nexus
git push origin main --tags
```

### O que cada tipo de bump significa

| Tipo | Quando usar | Exemplo |
|------|-------------|---------|
| `patch` | Correção de bug, ajuste visual, fix de tipografia | `v0.1.1` |
| `minor` | Novo componente, nova prop, nova variante | `v0.2.0` |
| `major` | Remoção de componente, mudança de API, breaking change | `v1.0.0` |

### Pipeline (automático)

A tag `v*.*.*` dispara a pipeline completa:

1. Publica a lib no Nexus (`@biome/design-system@<versão>`)
2. Builda o Storybook estático
3. Builda a imagem Docker do Storybook
4. Deploya o Storybook no K8s

Assim, o Storybook publicado sempre corresponde à versão mais recente da lib.

Push na branch `main` roda apenas validação (typecheck, governance, testes, build) sem publicar nada.

## Infraestrutura

| Recurso | Localização |
|---------|-------------|
| Manifestos K8s | `gov-k8s/apps/biome/storybook/` |
| Pipeline CI/CD | `gov-pipelines/apps/biome/k8s-biome-storybook-gitlab-ci.yml` |
| Storybook (dev) | `https://dev.ecosistemas.meioambiente.mg.gov.br/biome/` |
| Nexus (npm) | `https://nexus.meioambiente.mg.gov.br/repository/npm-hosted/` |

### Variáveis CI/CD necessárias (GitLab)

| Variável | Descrição | Flags |
|----------|-----------|-------|
| `NEXUS_AUTH` | Base64 de `gitlabci_user:senha` | Protected, Masked |

## Documentação

Toda a documentação do design system vive no Storybook:

- **Começar / Introdução** — visão geral
- **Começar / Instalação** — guia de setup para consumidores
- **Começar / Guia de Contribuição** — como adicionar ou alterar componentes
- **Começar / Governança** — decisões arquiteturais

## Licença

Uso interno. Ver `LICENSE`.
