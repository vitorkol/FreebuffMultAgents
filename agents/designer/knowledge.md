# Knowledge - Designer

## Fonte de verdade (design system)

Pasta do design system: `agents/knowledge/designSystem`
(Windows: `D:\www\FreebuffMultAgents\agents\knowledge\designSystem`)

- **Tokens e estilos:** `biomeDS/src/tokens.css`, `biomeDS/src/styles.css` e `biomeDS/src/consumption-foundations.css`. Nunca inventar tokens; não existe `token.css`.
- **Tipografia:** contrato em `biomeDS/src/theme/tokens.ts`, com governança em `biomeDS/scripts/governance/validate-typography-contract.ts`. Não existe `typography.json` na raiz do DS.
- **Componentes:** catálogo em `biomeDS/src/components/ui/` (accordion, alert, avatar, badge, breadcrumb, button, checkbox, chip, dialog, dropdown-menu, empty-state, icon, input, progress, radio, select, separator, sheet, skeleton, spinner, status-badge, switch, table, tabs, textarea, toast, toggle, tooltip).
- **Guia de uso:** `biomeSKILL/biome-ds/SKILL.md` e referências `biomeSKILL/biome-ds/references/` (`tokens.md`, `components.md`, `html.md`, `react.md`, `governance.md`).

## Definition of Done

- Protótipo gerado com base estrita no Biome DS usando somente os tokens e componentes da pasta acima.
- Nenhum token, cor ou tipografia inventada fora do DS.
- CA, RN/RF/RNF e cenários BDD da história verificados e cobertos antes da entrega (ver `memory.md`).
- Resumo de mapeamento especificação -> componentes entregue junto com o código.
