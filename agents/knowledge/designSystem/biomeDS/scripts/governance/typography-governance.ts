/**
 * Lógica compartilhada: violações de tipografia manual (classes Tailwind de escala/fonte/leading/tracking).
 */
import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

const ROOT = process.cwd()
const TAILWIND_TEXT_SCALE =
  "text-(?:xs|sm|md|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)(?:/[0-9]+)?"

/** Peso/estilo — famílias do DS permitidas em className (mapeamento token). */
const ALLOWED_FONT_FAMILY = new Set(["font-sans", "font-display", "font-mono"])

/**
 * `leading-*` / `tracking-*` em componentes densos (Badge, Button, …) — as classes `.text-*`
 * do DS ficam fora de `@layer` e precisam de override explícito (`!leading-*`) para caber em `h-*` fixo.
 */
const ALLOWED_DENSITY_LEADING = new Set([
  "leading-none",
  "leading-tight",
  "leading-snug",
  "leading-normal",
])
const ALLOWED_DENSITY_TRACKING = new Set(["tracking-tight"])

export function isManualTypographyToken(token: string): string | null {
  if (!token || token.startsWith("//")) return null
  const t = token.trim()
  if (new RegExp(`^${TAILWIND_TEXT_SCALE}$`).test(t)) {
    return `Escala Tailwind proibida (${t}) — use HTML semântico, <Typography /> ou classes text-display-*/text-heading-*/text-body-*/text-label-*/text-meta-*`
  }
  if (t.startsWith("text-[") || t.startsWith("md:text-[")) {
    return `Tamanho arbitrário proibido (${t})`
  }
  if (t.startsWith("font-") && !ALLOWED_FONT_FAMILY.has(t)) {
    return `Peso/família manual proibido (${t})`
  }
  if (t.startsWith("leading-")) {
    if (ALLOWED_DENSITY_LEADING.has(t)) return null
    return `line-height manual proibido (${t})`
  }
  if (t.startsWith("tracking-")) {
    if (ALLOWED_DENSITY_TRACKING.has(t)) return null
    return `letter-spacing manual proibido (${t}) — use escala text-label-* / text-meta-*`
  }
  return null
}

export type ManualLineFinding = {
  line: number
  token: string
  detail: string
}

/** Linha a linha: padrões manuais (cobre className, cva, cn com strings na mesma linha). */
export function scanManualTypographyLines(text: string): ManualLineFinding[] {
  const out: ManualLineFinding[] = []
  const lines = text.split("\n")
  const reManual = new RegExp(
    `\\b(${TAILWIND_TEXT_SCALE}|leading-[a-z0-9-]+|tracking-[a-z0-9-]+|font-(?!sans\\b|display\\b|mono\\b)[a-z0-9-]+)\\b`,
    "g"
  )
  lines.forEach((line, i) => {
    const trimmed = line.trim()
    if (/^\s*import\s/.test(line)) return
    if (/^\s*export\s+type\s/.test(line) && trimmed.endsWith(";")) return
    const codeOnly = line.replace(/\/\/.*$/, "")
    let match: RegExpExecArray | null
    reManual.lastIndex = 0
    const seen = new Set<string>()
    while ((match = reManual.exec(codeOnly)) !== null) {
      const t = match[1]!
      const reason = isManualTypographyToken(t)
      if (reason && !seen.has(t)) {
        seen.add(t)
        out.push({ line: i + 1, token: t, detail: reason })
      }
    }
  })
  return out
}

const OPEN_TYPO = /<Typography\s+([\s\S]*?)>/gi

function isDisplayOrHeadingVariantAttrs(attrs: string): boolean {
  return /\bvariant\s*=\s*["'](?:display-|heading-)[^"']*["']/.test(attrs)
}

export function findTypographyHeadingWithoutAs(text: string): string[] {
  const bad: string[] = []
  let m: RegExpExecArray | null
  OPEN_TYPO.lastIndex = 0
  while ((m = OPEN_TYPO.exec(text)) !== null) {
    const attrs = m[1]!
    if (!isDisplayOrHeadingVariantAttrs(attrs)) continue
    if (/\bas\s*=/.test(attrs)) continue
    bad.push(m[0].trim().replace(/\s+/g, " ").slice(0, 160))
  }
  return bad
}

const IGNORE_DIR = new Set(["node_modules", "dist", ".next", "storybook-static"])

function shouldScanTsx(rel: string): boolean {
  if (rel.includes("node_modules") || rel.endsWith(".d.ts")) return false
  if (!/\.tsx$/i.test(rel)) return false
  return true
}

function walkTsx(dir: string, baseRel = ""): Array<[abs: string, rel: string]> {
  const out: Array<[string, string]> = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIR.has(e.name)) continue
    const abs = join(dir, e.name)
    const rel = join(baseRel, e.name)
    if (e.isDirectory()) {
      try {
        out.push(...walkTsx(abs, rel))
      } catch {
        // ignore unreadable dirs (permissions, symlink loops)
      }
    } else if (shouldScanTsx(e.name)) {
      try {
        if (statSync(abs).isFile()) out.push([abs, rel])
      } catch {
        // ignore
      }
    }
  }
  return out
}

export type ScanScope = "src" | "ui"

export function collectTsxFiles(scope: ScanScope): Array<[abs: string, rel: string]> {
  let baseDir: string
  let prefix: string
  if (scope === "ui") {
    baseDir = join(ROOT, "src", "components", "ui")
    prefix = join("src", "components", "ui")
  } else if (scope === "src") {
    baseDir = join(ROOT, "src")
    prefix = "src"
  } else {
    throw new Error('collectTsxFiles(scope): use "src" | "ui"')
  }
  const raw = walkTsx(baseDir)
  return raw.map(([abs, rel]) => [abs, join(prefix, rel).replace(/\\/g, "/")])
}

export type GovernanceScanOptions = {
  typographyAs?: boolean
}

export type GovernanceFinding =
  | (ManualLineFinding & { type: "manual"; rel: string })
  | {
      type: "no-as"
      rel: string
      snippets: string[]
    }

/** MDX pode conter JSX — mesmas verificações, exceto arquivos .docs.mdx (exemplos “errados”). */
export function governanceScanFile(
  absPath: string,
  rel: string,
  options: GovernanceScanOptions = {}
): GovernanceFinding[] | null {
  const { typographyAs = true } = options
  const text = readFileSync(absPath, "utf8")
  const findings: GovernanceFinding[] = []

  const manual = scanManualTypographyLines(text)
  for (const hit of manual) findings.push({ type: "manual", ...hit, rel })

  if (typographyAs === true) {
    const noAs = findTypographyHeadingWithoutAs(text)
    if (noAs.length) findings.push({ type: "no-as", rel, snippets: noAs })
  }

  return findings.length ? findings : null
}

export function summarizeScan(allFindings: GovernanceFinding[][], title: string): boolean {
  const manual: Array<GovernanceFinding & { type: "manual" }> = []
  const noAs: Extract<GovernanceFinding, { type: "no-as" }>[] = []
  for (const f of allFindings.flat()) {
    if (f.type === "manual") manual.push(f)
    else if (f.type === "no-as") noAs.push(f)
  }

  let failed = false
  if (manual.length) {
    failed = true
    console.error(`\n[${title}] Classes de tipografia manual ilegais:\n`)
    const byFile = new Map<string, Array<GovernanceFinding & { type: "manual" }>>()
    for (const m of manual) {
      if (!byFile.has(m.rel)) byFile.set(m.rel, [])
      byFile.get(m.rel)!.push(m)
    }
    for (const [rel, items] of byFile) {
      console.error(`  ${rel}`)
      items.forEach((x) =>
        console.error(`    linha ${x.line}: "${x.token}" — ${x.detail ?? ""}`)
      )
    }
  }

  if (noAs.length) {
    failed = true
    console.error(`\n[${title}] <Typography variant="display-*|heading-*"> sem prop as:\n`)
    noAs.forEach(({ rel, snippets }) => {
      console.error(`  ${rel}`)
      snippets.slice(0, 5).forEach((s) => console.error(`    → ${s.slice(0, 120)}`))
    })
  }

  if (!failed) console.log(`\n[${title}] OK — nenhuma violação.\n`)
  return failed
}
