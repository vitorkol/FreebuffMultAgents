/**
 * Gera artefactos da camada semântica Biome DS:
 * - figma-biome-linked/generated/structural-utilities.css (cópia SSOT)
 * - figma-biome-linked/generated/behavioral-utilities.css
 * - utility-semantic-map.json
 * - migration-report.md
 * - validation-report.json
 */
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const uiRoot = path.join(root, "src/components/ui")

/** Marcadores de Tailwind arbitrário típicos — não devem aparecer em class strings dos componentes UI. */
const FORBIDDEN_CLASS_MARKERS = [
  "data-[",
  "group-[",
  "[&",
  "peer-disabled:",
  "peer-checked:",
  "peer-focus-visible:",
  "translate-[",
  "bg-black/",
]

const UTILITY_SEMANTIC_MAP = {
  structural: {
    "icon-slot-base": ["--icon-slot-* (pointer-events / shrink)", "svg descendente"],
    "icon-slot-2xs": ["--icon-slot-2xs-size"],
    "icon-slot-xs": ["--icon-slot-xs-size"],
    "icon-slot-sm": ["--icon-slot-sm-size"],
    "icon-slot-md": ["--icon-slot-md-size"],
    "breadcrumb-separator-icon-slot": ["--icon-slot-xs-size"],
    "translate-micro-y": ["--motion-micro-offset-y"],
    "carousel-nav-prev-horizontal": ["--motion-carousel-inset", "--motion-anchor-shift-half"],
    "carousel-nav-next-horizontal": ["--motion-carousel-inset", "--motion-anchor-shift-half"],
    "carousel-nav-prev-vertical": ["--motion-carousel-inset", "--motion-anchor-shift-half", "--motion-rotate-quarter-turn"],
    "carousel-nav-next-vertical": ["--motion-carousel-inset", "--motion-anchor-shift-half", "--motion-rotate-quarter-turn"],
    "select-trigger-value-slot": ["tipografia / line-clamp via tokens"],
    "select-trigger-placeholder-tone": ["--text-placeholder"],
    "select-popper-axis-nudge": ["--motion-popover-nudge"],
    "select-item-secondary-slot": ["layout textual"],
    "transition-field-border": ["--motion-duration-field-border", "--easing-default"],
    "input-hide-webkit-search-cancel": ["reset estrutural"],
    "peer-disabled-form-lock": ["--opacity-disabled"],
    "radio-ring-peer": ["--primary", "--ring", "--background"],
    "radio-indicator-dot": ["--primary-foreground", "--motion-radio-dot-scale-*"],
    "switch-track-surface": ["--brand-green", "--input"],
    "switch-thumb-motion": ["--motion-switch-thumb-travel-x"],
    "tabs-trigger-active-tone": ["--background", "--foreground", "--shadow-sm"],
    "toggle-on-surface": ["--accent", "--accent-foreground"],
    "accordion-trigger-chevron": ["--motion-accordion-chevron-open-rotate"],
    "radix-menu-item-disabled": ["--opacity-disabled"],
    "radix-submenu-trigger-open": ["--accent", "--accent-foreground"],
    "sheet-close-open-surface": ["--secondary"],
    "bg-overlay-scrim-modal": ["--overlay-scrim-modal"],
    "bg-overlay-scrim-sheet": ["--overlay-scrim-sheet"],
    "table-head-rows-border": ["--border-width", "--border-style", "--border"],
    "table-body-rows-last-border-none": ["--border"],
    "table-footer-shell": ["bg-muted/50 via @apply SSOT"],
    "table-footer-rows-last-border-none": ["--border"],
    "table-row-interactive": ["--muted", "bg-muted/50 hover via @apply SSOT"],
    "table-cell-checkbox-layout": ["--motion-micro-offset-y", "--space-0"],
    "toast-host-surface": ["--background", "--foreground", "--border", "--shadow-lg"],
    "toast-slot-description": ["--muted-foreground"],
    "toast-slot-action-primary": ["--primary", "--primary-foreground"],
    "toast-slot-cancel-muted": ["--muted", "--muted-foreground"],
    "interactive-hit-hover-tonal-subtle": ["hover:bg-black/5 via @apply SSOT"],
    "interactive-hit-hover-tonal-muted": ["hover:bg-black/10 via @apply SSOT"],
  },
  behavioral: {
    "radix-overlay-fade-motion": ["tw-animate / Radix data-state"],
    "radix-popover-content-motion": ["tw-animate / Radix data-state / data-side"],
    "tooltip-content-motion": ["tw-animate"],
    "dialog-overlay-motion": ["tw-animate"],
    "dialog-content-fade-motion": ["tw-animate"],
    "accordion-content-motion": ["tw-animate accordion-*"],
    "sheet-overlay-motion": ["tw-animate"],
    "sheet-panel-motion-base": ["tw-animate", "--transition-slow"],
    "sheet-panel-top": ["slide sheet"],
    "sheet-panel-bottom": ["slide sheet"],
    "sheet-panel-left": ["slide sheet"],
    "sheet-panel-right": ["slide sheet"],
  },
}

async function walkTsx(dir) {
  const out = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walkTsx(p)))
    else if (e.isFile() && e.name.endsWith(".tsx")) out.push(p)
  }
  return out
}

async function validateUiTsx(files) {
  const violations = []
  for (const file of files) {
    if (file.endsWith(".stories.tsx")) continue
    const src = await fs.readFile(file, "utf8")
    const rel = path.relative(root, file)
    for (const marker of FORBIDDEN_CLASS_MARKERS) {
      if (!src.includes(marker)) continue
      const idx = src.indexOf(marker)
      violations.push({
        file: rel,
        ruleId: "forbidden-tailwind-marker",
        marker,
        sample: src.slice(Math.max(0, idx - 30), idx + 80),
      })
    }
  }
  return violations
}

async function main() {
  const genDir = path.join(root, "figma-biome-linked/generated")
  await fs.mkdir(genDir, { recursive: true })
  await fs.copyFile(
    path.join(root, "src/utilities/structural-utilities.css"),
    path.join(genDir, "structural-utilities.css"),
  )
  await fs.copyFile(
    path.join(root, "src/utilities/behavioral-utilities.css"),
    path.join(genDir, "behavioral-utilities.css"),
  )

  const uiFiles = await walkTsx(uiRoot)
  const violations = await validateUiTsx(uiFiles)

  const validationReport = {
    generatedAt: new Date().toISOString(),
    uiTsxFilesScanned: uiFiles.filter((f) => !f.endsWith(".stories.tsx")).length,
    violations,
    ok: violations.length === 0,
  }
  await fs.writeFile(path.join(root, "validation-report.json"), JSON.stringify(validationReport, null, 2), "utf8")

  await fs.writeFile(
    path.join(root, "utility-semantic-map.json"),
    JSON.stringify(
      {
        $comment:
          "Mapa das utilities semânticas Biome DS — espelhar mudanças em figma-biome-linked/tools/generate-linked-manifests.mjs (BIOME_SEMANTIC_UTILITY_CLASSES).",
        generatedAt: validationReport.generatedAt,
        utilities: UTILITY_SEMANTIC_MAP,
      },
      null,
      2,
    ),
    "utf8",
  )

  const migrationMd = `# Migration report — camada semântica Biome DS

Gerado em ${validationReport.generatedAt}.

## Resumo

- Utilidades estruturais/comportamentais SSOT: \`src/utilities/structural-utilities.css\`, \`src/utilities/behavioral-utilities.css\` (importados por \`src/styles.css\`; apenas estruturais em \`src/tokens.css\`).
- Variantes Radix/animações via \`@apply\` na folha behavioural.
- Novos tokens em \`:root\`: \`--space-micro-shift-y\`, \`--motion-*\`, \`--overlay-scrim-*\`, \`--icon-slot-*\`.

## Artefactos

| Ficheiro | Descrição |
|----------|-----------|
| \`utility-semantic-map.json\` | Mapa classe → referências de tokens |
| \`figma-biome-linked/generated/*.css\` | Cópias geradas |
| \`validation-report.json\` | Marcadores proibidos em TSX UI |

## Validação TSX

Estado: **${validationReport.ok ? "OK" : "COM AVISOS"}** (${violations.length} violações).

`
  await fs.writeFile(path.join(root, "migration-report.md"), migrationMd, "utf8")

  console.log(`Semantic layer reports written. validation ok=${validationReport.ok} violations=${violations.length}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
