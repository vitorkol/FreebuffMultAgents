#!/usr/bin/env node
/**
 * Subconjunto: pastas em `src/components/ui`, todos os `*.tsx`.
 * Classes manuais ilegais e elementos semânticos sem duplicar tipografia. (Não verifica `Typography` / `as`.)
 *
 * Uso: pnpm governance:typography-contract
 */
import type { GovernanceFinding } from "./typography-governance"
import {
  collectTsxFiles,
  governanceScanFile,
  summarizeScan,
} from "./typography-governance"

const all: GovernanceFinding[] = []

for (const [abs, rel] of collectTsxFiles("ui")) {
  const findings = governanceScanFile(abs, rel, { typographyAs: false })
  if (findings) all.push(...findings)
}

const failed = summarizeScan([all], "typography-contract")
process.exit(failed ? 1 : 0)
