#!/usr/bin/env node
/**
 * Governança única: tipografia manual proibida
 * e Typography display/heading sempre com `as`.
 *
 * Uso: pnpm governance:typography
 */
import type { GovernanceFinding } from "./typography-governance"
import {
  collectTsxFiles,
  governanceScanFile,
  summarizeScan,
} from "./typography-governance"

const all: GovernanceFinding[] = []

for (const [abs, rel] of collectTsxFiles("src")) {
  const findings = governanceScanFile(abs, rel, { typographyAs: true })
  if (findings) all.push(...findings)
}

const failed = summarizeScan([all], "governance:typography")
process.exit(failed ? 1 : 0)
