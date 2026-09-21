/**
 * Injeta `:root` (tokens primitivos) + bloco de utilitários tipográficos `.text-*`
 * para permitir asserts com getComputedStyle em happy-dom/jsdom (sem servidor Tailwind).
 */
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const _dir = dirname(fileURLToPath(import.meta.url))
const SRC = join(_dir, "..")

function balancedBlock(css: string, selectorPos: number): { start: number; end: number } {
  let open = css.indexOf("{", selectorPos)
  if (open === -1) throw new Error("[inject] chave `{` esperada")
  let depth = 0
  for (let j = open; j < css.length; j++) {
    const c = css[j]
    if (c === "{") depth++
    if (c === "}") {
      depth--
      if (depth === 0) return { start: selectorPos, end: j + 1 }
    }
  }
  throw new Error("[inject] block não fecha")
}

function extractRoot(css: string): string {
  const i = css.indexOf(":root")
  if (i === -1) throw new Error("tokens.css deve conter `:root`")
  const { start, end } = balancedBlock(css, i)
  return css.slice(start, end)
}

/** Bloco agrupado .text-display-xl … até última regra utilitária de tipografia. */
function extractTypographyUtilitiesBlock(styles: string): string {
  const start = styles.indexOf(".text-display-xl")
  if (start === -1) {
    throw new Error(
      "O bloco de utilitários tipográficos deve existir em src/styles.css ou src/consumption-foundations.css",
    )
  }
  const afterMeta = styles.indexOf(".text-meta-2xs", start)
  if (afterMeta === -1) throw new Error(".text-meta-2xs não encontrado")
  const { end: typoEnd } = balancedBlock(styles, afterMeta)
  return styles.slice(start, typoEnd)
}

let injected = false

export function injectBiomeTypographyContract(documentRef: Document = document): void {
  if (injected) return
  const tokens = readFileSync(join(SRC, "tokens.css"), "utf8")
  const styles = readFileSync(join(SRC, "styles.css"), "utf8")
  const foundations = readFileSync(join(SRC, "consumption-foundations.css"), "utf8")
  const root = extractRoot(tokens)
  const typoSource = styles.includes(".text-display-xl") ? styles : foundations
  const typo = extractTypographyUtilitiesBlock(typoSource)
  const style = documentRef.createElement("style")
  style.setAttribute("data-test", "biome-typography-contract")
  style.textContent = `${root}\n${typo}\n`
  documentRef.head.appendChild(style)
  injected = true
}
