import { icons, type LucideIcon } from "lucide-react"
import type dynamicIconImports from "lucide-react/dynamicIconImports"

/**
 * Official Lucide kebab-case icon name type.
 *
 * Derived from `lucide-react/dynamicIconImports` — Lucide's own
 * source of truth for kebab-case icon names. Provides full
 * TypeScript autocomplete for all 1500+ Lucide icons.
 */
export type IconName = keyof typeof dynamicIconImports

/**
 * Kebab-case lookup built from Lucide's own `icons` record.
 *
 * Lucide exports PascalCase keys in its `icons` object.
 * We convert them to kebab-case to match the canonical names
 * used by `dynamicIconImports` and lucide.dev.
 */
function buildLookup(): Map<string, LucideIcon> {
  const map = new Map<string, LucideIcon>()

  for (const [pascal, component] of Object.entries(icons)) {
    const kebab = pascal
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
      .toLowerCase()
    map.set(kebab, component)
  }

  return map
}

const lookup = buildLookup()

export function getIcon(name: string): LucideIcon | undefined {
  return lookup.get(name)
}

export function getIconNames(): IconName[] {
  return [...lookup.keys()] as IconName[]
}

export function isValidIconName(name: string): name is IconName {
  return lookup.has(name)
}
