#!/usr/bin/env node
/**
 * Garante paridade de nomes entre typography.json e classes .text-* de src/styles.css.
 */
import { readFileSync } from "node:fs"
import { join } from "node:path"

const ROOT = process.cwd()

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function keysFromTypographyJson(): Set<string> {
  const raw: unknown = JSON.parse(
    readFileSync(join(ROOT, "typography.json"), "utf8")
  )
  if (!isPlainObject(raw)) return new Set()
  const ids = new Set<string>()
  for (const [k, v] of Object.entries(raw)) {
    if (!k.startsWith("text-")) continue
    if (!isPlainObject(v) || typeof v.fontSize !== "number") continue
    ids.add(k.slice(5))
  }
  return ids
}

function keysFromTypographyCss(): Set<string> {
  const styles = readFileSync(join(ROOT, "src/styles.css"), "utf8")
  const foundations = readFileSync(
    join(ROOT, "src/consumption-foundations.css"),
    "utf8"
  )
  const source = `${styles}\n${foundations}`
  const re = /\.text-((?:display|heading|body|label|meta)(?:-[a-z0-9]+)+)\b/g
  const ids = new Set<string>()
  let mm: RegExpExecArray | null
  while ((mm = re.exec(source)) !== null) {
    ids.add(mm[1]!)
  }
  return ids
}

function minus<T>(setA: Set<T>, setB: Set<T>): T[] {
  const out: T[] = []
  for (const x of setA) {
    if (!setB.has(x)) out.push(x)
  }
  return out
}

function main(): void {
  const jsonIds = keysFromTypographyJson()
  const cssIds = keysFromTypographyCss()

  const errs: string[] = []

  for (const id of minus(jsonIds, cssIds)) {
    errs.push(`Falta utilitário .text-${id} em src/styles.css/src/consumption-foundations.css.`)
  }
  for (const id of minus(cssIds, jsonIds)) {
    errs.push(`.text-${id} em styles/foundations sem entrada espelhada em typography.json.`)
  }

  if (errs.length) {
    console.error(
      "\n[governance:typography-regression] Divergência typography.json ↔ styles/foundations:\n"
    )
    errs.forEach((e) => console.error(`  - ${e}`))
    console.error(
      "\nAtualize typography.json e os arquivos de estilo tipográfico em conjunto.\n"
    )
    process.exit(1)
  }

  console.log(
    "[governance:typography-regression] OK — paridade de variantes entre json, TSX e CSS.\n"
  )
}

main()
