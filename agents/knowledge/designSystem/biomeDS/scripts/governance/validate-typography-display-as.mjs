#!/usr/bin/env node
/**
 * Delegado a enforce-typography-usage (src completo). Mantido para compatibilidade com scripts antigos.
 *
 * Uso: node scripts/governance/validate-typography-display-as.mjs
 */
import { spawnSync } from "node:child_process"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(fileURLToPath(new URL(".", import.meta.url)), "enforce-typography-usage.mjs")
const r = spawnSync(process.execPath, [root], { stdio: "inherit", cwd: process.cwd() })
process.exit(r.status ?? 1)
