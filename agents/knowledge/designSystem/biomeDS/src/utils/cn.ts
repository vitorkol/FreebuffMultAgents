import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

import { BIOME_SEMANTIC_TYPE_CLASSES } from "../constants/biome-semantic-type-classes"

/**
 * O config padrão do tailwind-merge trata quase todo `text-*` como **cor** (`text-color` com `{"text":[null]}`).
 * As classes semânticas do Biome (`text-body-m`, `text-label-s`, …) precisam cair no grupo **`font-size`**
 * para não colidirem com `text-foreground`, `text-text-inverse`, etc. — caso contrário o merge remove
 * tipografia ou cor e os tamanhos “não mudam” entre variantes.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [...BIOME_SEMANTIC_TYPE_CLASSES],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

