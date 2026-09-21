#!/usr/bin/env node
/**
 * Heuristic anti-regression: flags decorative comment separators and long
 * runs of repeated punctuation in line comments / CSS block comments under `src/`.
 *
 * Uso: pnpm governance:comments
 */
import { readdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"

const SRC = join(process.cwd(), "src")

type Issue = { file: string; line: number; reason: string }

const RE_EXT = /\.(ts|tsx|css|mdx)$/

/** Line that is only slashes + long runs of ─ - = _ · */
const LINE_ONLY_DECOR = /^\s*\/\/\s*[\u2500\-_=·\s]{12,}\s*$/

/** 7+ identical separator chars in a row (ASCII or box-drawing dash) */
const REPEAT_RUN = /([\u2500\-_=])\1{6,}/

/** Matches CSS-style block comments that begin with three hyphen-minuses after the opener. */
const CSS_LEADING_TRIPLE = /\/\*\s*---\s/

/** Long run of U+2500 in a one-line block-style comment. */
const BOX_RUN = /\u2500{14,}/

function walk(dir: string, acc: string[]): void {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name)
    if (ent.isDirectory()) {
      walk(p, acc)
    } else if (RE_EXT.test(ent.name)) {
      acc.push(p)
    }
  }
}

function scanFile(abs: string): Issue[] {
  const rel = relative(process.cwd(), abs)
  const text = readFileSync(abs, "utf8")
  const lines = text.split(/\r?\n/)
  const out: Issue[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!
    const n = i + 1
    if (LINE_ONLY_DECOR.test(line)) {
      out.push({ file: rel, line: n, reason: "line is only decorative separators" })
      continue
    }
    const trimmed = line.trimStart()
    if (trimmed.startsWith("//") || trimmed.startsWith("/*")) {
      if (REPEAT_RUN.test(line)) {
        out.push({ file: rel, line: n, reason: "7+ repeated separator characters" })
        continue
      }
    }
    if (trimmed.startsWith("/*")) {
      if (CSS_LEADING_TRIPLE.test(line) || (line.includes("*/") && BOX_RUN.test(line))) {
        out.push({ file: rel, line: n, reason: "decorative block comment header" })
      }
    }
  }
  return out
}

function main(): void {
  const files: string[] = []
  walk(SRC, files)
  const issues: Issue[] = []
  for (const f of files) {
    issues.push(...scanFile(f))
  }
  if (issues.length) {
    console.error("[comment-quality-check] Found issues:\n")
    for (const { file, line, reason } of issues) {
      console.error(`  ${file}:${line} — ${reason}`)
    }
    console.error(`\nTotal: ${issues.length}`)
    process.exit(1)
  }
  console.log("[comment-quality-check] OK (src/)")
}

main()
