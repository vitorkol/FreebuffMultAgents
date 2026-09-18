/**
 * Export design tokens for Biome DS:
 * 1) Por padrão: lê fontes canônicas (src/styles.css :root/.dark + typography.json), gera figma-tokens/figma-tokens.json
 * 2) Com `--from-json`: lê apenas figma-tokens/figma-tokens.json (JSON consolidado já gerado) e só atualiza tokens/
 * 3) Em ambos os casos: escreve tokens/*.json no formato W3C (value + type) com aliases para primitivos
 *
 * Glossário (comentários para Figma Variables + Tokens Studio):
 * - Primitive tokens: valores “fonte” (paleta, escalas numéricas, sombras base). Sem significado de UI.
 * - Semantic tokens: nomes orientados a intenção (ex.: color.action.primary) que referenciam primitivos.
 * - Aliases cross-set: `{primitives.caminho.do.token}` — o primeiro segmento DEVE ser o nome do token set
 *   que corresponde a `primitives.json` no Tokens Studio (ex.: set renomeado para “primitives”).
 * - Modes (light/dark): light.json / dark.json contêm os mesmos caminhos semânticos; só mudam os alvos dos aliases
 *   para primitivos de paleta ou sombras/opacidade por modo — compatível com Figma Variables (modos/coleções).
 * - Effect Styles (tokens/effects.json): apenas elevação semântica real (shadow-* → alias light.shadow.*).
 *   Ring, outline, border, overlay scrim e foco NÃO são Effect Styles — exportados como composição em figma-biome-linked
 *   (layers estruturais / interação). Import Effects só para drop shadows de elevação no Tokens Studio.
 * - Overlay scrim: tokens semânticos light.overlay.scrim.* (cores Canônicas do CSS).
 */
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")

/* ─── Helpers CSS / bootstrap (mesmo contrato determinístico do export anterior) ─── */

function extractBraceContent(css, startMarker) {
  const idx = css.indexOf(startMarker)
  if (idx === -1) return ""
  const open = css.indexOf("{", idx)
  if (open === -1) return ""
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++
    if (css[i] === "}") {
      depth--
      if (depth === 0) return css.slice(open + 1, i)
    }
  }
  return ""
}

function parseCssVars(block) {
  const vars = {}
  const re = /--([\w-]+):\s*([^;]+);/g
  let m
  while ((m = re.exec(block))) vars[m[1]] = m[2].trim()
  return vars
}

function remToPxPx(remStr) {
  const v = parseFloat(remStr)
  if (Number.isNaN(v)) return remStr
  const px = Math.round(v * 16 * 1000) / 1000
  return px % 1 === 0 ? `${Math.round(px)}px` : `${px}px`
}

function collectPrefixed(vars, prefix) {
  const out = {}
  for (const [k, v] of Object.entries(vars)) {
    if (k.startsWith(prefix)) out[k] = v
  }
  return out
}

function dashKeys(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [`--${k}`, v]))
}

function normalizeSpacing(val) {
  if (/^-?\d*\.?\d+rem$/.test(val)) return remToPxPx(val.replace("rem", ""))
  return val
}

function normalizeRadii(val) {
  if (/^-?\d*\.?\d+rem$/.test(val)) return remToPxPx(val.replace("rem", ""))
  return val
}

/** Remove apenas sufixo px de strings numéricas (tipografia); preserva em/rem quando não for px puro. */
function stripPxSuffix(s) {
  if (typeof s !== "string") return String(s)
  const t = s.trim()
  if (t.endsWith("px")) return t.slice(0, -2).trim()
  return t
}

/** Espaçamento / radius numéricos: remove px conforme especificação do projeto. */
function stripPxFromDimension(val) {
  if (typeof val !== "string") return String(val)
  const t = val.trim()
  if (/^-?[\d.]+px$/.test(t)) return t.replace(/px$/, "").trim()
  return t
}

/** Converte objeto plano aninhado recursivamente para leaf { value, type }. */
function wrapLeaf(value, type) {
  return { value, type }
}

function deepSet(target, pathParts, leaf) {
  let cur = target
  for (let i = 0; i < pathParts.length; i++) {
    const p = pathParts[i]
    if (i === pathParts.length - 1) {
      cur[p] = leaf
    } else {
      if (!cur[p] || typeof cur[p] !== "object" || "value" in cur[p]) cur[p] = {}
      cur = cur[p]
    }
  }
}

/** Nome do token set que carrega `primitives.json` no Tokens Studio (prefixo obrigatório dos aliases). */
const TOKEN_SET_PRIMITIVES = "primitives"

/** Referência de um set semântico (global / light / dark) para um token definido em `primitives.json`. */
function primitivesAlias(pathInsidePrimitivesTree) {
  return `{${TOKEN_SET_PRIMITIVES}.${pathInsidePrimitivesTree}}`
}

/**
 * Converte valores dimensionais puramente numéricos (após remover px) para number.
 * Preserva strings com unidades não ambíguas para px (ex.: rem, em em breakpoints/layout).
 */
function coerceNumericDimension(val) {
  if (typeof val === "number" && Number.isFinite(val)) return val
  if (typeof val !== "string") return val
  const t = val.trim()
  if (t === "") return val
  if (/^-?\d+(\.\d+)?$/.test(t)) {
    const n = Number(t)
    return Number.isFinite(n) ? n : val
  }
  if (/^-?\d+(\.\d+)?px$/i.test(t)) {
    const n = Number(t.replace(/px$/i, "").trim())
    return Number.isFinite(n) ? n : val
  }
  return val
}

/** letterSpacing primitivo: “0” / “0px” → número 0; número puro → number; senão mantém (“-0.01em”). */
function coerceLetterSpacingPrimitive(val) {
  const t = String(val).trim()
  if (t === "0" || t === "0px") return 0
  if (/^-?\d+(\.\d+)?px$/i.test(t))
    return coerceNumericDimension(t.replace(/px$/i, "").trim())
  if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t)
  return val
}

/** Opacity primitiva: string “0.5” → 0.5 */
function coerceOpacityPrimitive(val) {
  if (typeof val === "number" && Number.isFinite(val)) return val
  const n = Number(String(val).trim())
  return Number.isFinite(n) ? n : val
}

/** layout / breakpoints: “4rem”, “80rem” → número (parte numérica); px idem. */
function coerceLayoutDimension(val) {
  const s = String(val).trim()
  if (/^calc\(/i.test(s)) return s
  if (/^\d/.test(s) && /\b(dvh|dvw|svh|svw|lvh|lvw|vmin|vmax)\b/i.test(s)) return s
  if (/^[\d.]+rem$/i.test(s)) return s
  const px = /^([\d.]+)px$/i.exec(s)
  if (px) return Number(px[1])
  return coerceNumericDimension(s)
}

/** Campos compostos de typography para Tokens Studio: números quando aplicável. */
function buildTypographyCompositeValue(comp) {
  const lsRaw = comp.letterSpacing
  const lsStripped = stripPxSuffix(lsRaw)
  let letterSpacing
  if (lsStripped === "0" || lsRaw === "0px") letterSpacing = 0
  else if (/^-?\d+(\.\d+)?$/.test(lsStripped)) letterSpacing = Number(lsStripped)
  else letterSpacing = lsStripped

  const fsStripped = stripPxSuffix(comp.fontSize)
  const lhStripped = stripPxSuffix(comp.lineHeight)

  return {
    fontFamily: comp.fontFamily,
    fontWeight: (() => {
      const w = typeof comp.fontWeight === "number" ? comp.fontWeight : Number(comp.fontWeight)
      return Number.isFinite(w) ? w : comp.fontWeight
    })(),
    fontSize: /^-?\d+(\.\d+)?$/.test(fsStripped) ? Number(fsStripped) : fsStripped,
    lineHeight: /^-?\d+(\.\d+)?$/.test(lhStripped) ? Number(lhStripped) : lhStripped,
    letterSpacing,
  }
}

/** Mapeamento determinístico: chave flat em colors.light/dark → caminhos aninhados semânticos (slash-friendly no Figma). */
const COLOR_SEMANTIC_PATH = {
  background: ["background", "default"],
  foreground: ["foreground", "default"],
  card: ["surface", "card"],
  "card-foreground": ["surface", "cardForeground"],
  popover: ["surface", "popover"],
  "popover-foreground": ["surface", "popoverForeground"],
  primary: ["action", "primary"],
  "primary-foreground": ["action", "primaryForeground"],
  secondary: ["action", "secondary"],
  "secondary-foreground": ["action", "secondaryForeground"],
  muted: ["surface", "muted"],
  "muted-foreground": ["surface", "mutedForeground"],
  accent: ["surface", "accent"],
  "accent-foreground": ["surface", "accentForeground"],
  destructive: ["feedback", "destructive"],
  "destructive-foreground": ["feedback", "destructiveForeground"],
  success: ["feedback", "success"],
  "success-foreground": ["feedback", "successForeground"],
  warning: ["feedback", "warning"],
  "warning-foreground": ["feedback", "warningForeground"],
  info: ["feedback", "info"],
  "info-foreground": ["feedback", "infoForeground"],
  "success-surface": ["feedback", "successSurface"],
  "success-surface-border": ["feedback", "successSurfaceBorder"],
  "success-on-surface": ["feedback", "successOnSurface"],
  "warning-surface": ["feedback", "warningSurface"],
  "warning-surface-border": ["feedback", "warningSurfaceBorder"],
  "warning-on-surface": ["feedback", "warningOnSurface"],
  "info-surface": ["feedback", "infoSurface"],
  "info-surface-border": ["feedback", "infoSurfaceBorder"],
  "info-on-surface": ["feedback", "infoOnSurface"],
  "destructive-surface": ["feedback", "destructiveSurface"],
  "destructive-surface-border": ["feedback", "destructiveSurfaceBorder"],
  "destructive-on-surface": ["feedback", "destructiveOnSurface"],
  "neutral-surface": ["feedback", "neutralSurface"],
  "neutral-surface-border": ["feedback", "neutralSurfaceBorder"],
  "neutral-on-surface": ["feedback", "neutralOnSurface"],
  border: ["border", "default"],
  input: ["input", "default"],
  "input-focus": ["input", "focus"],
  "input-error": ["input", "error"],
  "input-success": ["input", "success"],
  ring: ["focus", "ring"],
  label: ["text", "label"],
  "label-required": ["text", "labelRequired"],
  "text-primary": ["text", "primary"],
  "text-muted": ["text", "muted"],
  "text-placeholder": ["text", "placeholder"],
  "text-disabled": ["text", "disabled"],
  "text-inverse": ["text", "inverse"],
  link: ["text", "link"],
  "brand-green": ["brand", "green"],
  "brand-green-dark": ["brand", "greenDark"],
  "brand-green-light": ["brand", "greenLight"],
  "brand-lime": ["brand", "lime"],
  mint: ["brand", "mint"],
  "footer-bg": ["layout", "footerBg"],
  "section-gray": ["layout", "sectionGray"],
  sale: ["marketing", "saleBackground"],
  "sale-foreground": ["marketing", "saleForeground"],
  promo: ["marketing", "promoBackground"],
  "promo-foreground": ["marketing", "promoForeground"],
}

/** Overlays de scrim (--overlay-scrim-*) → caminho semântico em light.json / primitives (não são Effect Styles). */
const OVERLAY_SEMANTIC_PATH = {
  "overlay-scrim-modal": ["scrim", "modal"],
  "overlay-scrim-sheet": ["scrim", "sheet"],
}

/**
 * Effect Styles (Figma): apenas sombras de elevação semânticas — alias para light.shadow.* / dark.shadow.*
 * Nunca ring, outline, border, overlay ou foco (isso é composição em layers no manifest figma-biome-linked).
 */
const EFFECT_SEMANTIC_PATHS = {
  card: {
    shadow: {
      kind: "aliasSemanticShadow",
      key: "sm",
    },
  },
  modal: {
    shadow: {
      kind: "aliasSemanticShadow",
      key: "xl",
    },
  },
  dropdown: {
    shadow: {
      kind: "aliasSemanticShadow",
      key: "md",
    },
  },
  tooltip: {
    shadow: {
      kind: "aliasSemanticShadow",
      key: "sm",
    },
  },
  popover: {
    shadow: {
      kind: "aliasSemanticShadow",
      key: "md",
    },
  },
}

/** Alias para token semântico do modo (set light ou dark no Tokens Studio): `{light.color.border.default}`. */
function semanticModeAlias(mode, dotPath) {
  const safe = String(dotPath).replace(/^\./, "")
  return `{${mode}.${safe}}`
}

function buildEffectLeafValue(spec, mode) {
  if (spec.kind === "aliasSemanticShadow") {
    return semanticModeAlias(mode, `shadow.${spec.key}`)
  }
  throw new Error(`buildEffectLeafValue: kind desconhecido ${JSON.stringify(spec)}`)
}

/** Árvore por modo (light | dark) para effects.* (só elevação). */
function buildEffectsBranch(mode) {
  const out = {}
  for (const [component, defs] of Object.entries(EFFECT_SEMANTIC_PATHS)) {
    out[component] = {}
    for (const [tokenName, spec] of Object.entries(defs)) {
      out[component][tokenName] = wrapLeaf(buildEffectLeafValue(spec, mode), "boxShadow")
    }
  }
  return out
}

/** Documento completo para tokens/effects.json e chave `effects` em figma-tokens.json. */
function buildEffectsPayload() {
  return {
    light: buildEffectsBranch("light"),
    dark: buildEffectsBranch("dark"),
  }
}

/** typography text-* → [categoria, escala] */
function parseTypographyKey(key) {
  const rest = key.replace(/^text-/, "")
  const prefixes = ["display", "heading", "body", "label", "meta"]
  for (const p of prefixes) {
    const pre = `${p}-`
    if (rest.startsWith(pre)) return [p, rest.slice(pre.length)]
  }
  return [rest, "default"]
}

function shadowKeyFromCss(key) {
  return key.replace(/^--shadow-/, "")
}

/**
 * Separa múltiplas sombras CSS respeitando vírgulas fora de rgba(...)/rgb(...).
 */
function splitCssShadowList(css) {
  const s = String(css).trim()
  if (!s || s === "none") return []
  const parts = []
  let depth = 0
  let start = 0
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === "(") depth++
    else if (c === ")") depth--
    else if (c === "," && depth === 0) {
      parts.push(s.slice(start, i).trim())
      start = i + 1
    }
  }
  parts.push(s.slice(start).trim())
  return parts.filter(Boolean)
}

function parseCssLengthToNumber(token) {
  const t = String(token).trim()
  if (t === "0" || t === "-0") return 0
  const px = /^(-?[\d.]+)px$/i.exec(t)
  if (px) return Number(px[1])
  const num = /^(-?[\d.]+)$/.exec(t)
  if (num) return Number(num[1])
  throw new Error(`Unrecognized CSS length in box-shadow: "${token}"`)
}

/**
 * Extrai cor final (rgba / rgb / hex) e o trecho de comprimentos.
 */
function extractShadowColorAndLengths(layer) {
  let s = layer.trim()
  let inset = false
  if (/^inset\s+/i.test(s)) {
    inset = true
    s = s.replace(/^inset\s+/i, "").trim()
  }
  const rgbaM = /\s+(rgba\([^)]+\))\s*$/i.exec(s)
  const rgbM = !rgbaM && /\s+(rgb\([^)]+\))\s*$/i.exec(s)
  const hexM = !rgbaM && !rgbM && /\s+(#[0-9a-fA-F]{3,8})\s*$/i.exec(s)
  let color
  let rest
  if (rgbaM) {
    color = rgbaM[1].replace(/\s+/g, " ").trim()
    rest = s.slice(0, rgbaM.index).trim()
  } else if (rgbM) {
    color = rgbM[1].replace(/\s+/g, " ").trim()
    rest = s.slice(0, rgbM.index).trim()
  } else if (hexM) {
    color = hexM[1]
    rest = s.slice(0, hexM.index).trim()
  } else {
    throw new Error(`Cannot extract color from box-shadow layer: "${layer}"`)
  }
  return { inset, color, lengthsPart: rest }
}

function parseSingleBoxShadowLayer(layer) {
  const { inset, color, lengthsPart } = extractShadowColorAndLengths(layer)
  const tokens = lengthsPart.split(/\s+/).filter(Boolean)
  const nums = tokens.map(parseCssLengthToNumber)
  let x
  let y
  let blur
  let spread
  if (nums.length === 2) {
    x = nums[0]
    y = nums[1]
    blur = 0
    spread = 0
  } else if (nums.length === 3) {
    x = nums[0]
    y = nums[1]
    blur = nums[2]
    spread = 0
  } else if (nums.length === 4) {
    x = nums[0]
    y = nums[1]
    blur = nums[2]
    spread = nums[3]
  } else {
    throw new Error(`Expected 2–4 offset/blur/spread values, got ${nums.length} in: "${layer}"`)
  }
  return {
    x,
    y,
    blur,
    spread,
    color,
    type: inset ? "innerShadow" : "dropShadow",
  }
}

/**
 * Converte string CSS box-shadow para objeto(s) W3C Design Tokens (Tokens Studio / Figma Variables).
 * Uma camada → objeto; várias → array de objetos com type dropShadow|innerShadow.
 */
function parseBoxShadow(cssValue) {
  if (cssValue !== null && typeof cssValue === "object") return cssValue
  const trimmed = String(cssValue).trim()
  if (!trimmed || trimmed === "none") {
    throw new Error("Invalid empty box-shadow value")
  }
  const layers = splitCssShadowList(trimmed).map(parseSingleBoxShadowLayer)
  if (layers.length === 1) return layers[0]
  return layers
}

function mapShadowCssRecord(record) {
  const out = {}
  for (const [k, v] of Object.entries(record)) {
    out[k] = parseBoxShadow(v)
  }
  return out
}

function opacityKeyFromCss(key) {
  return key.replace(/^--opacity-/, "")
}

function fontSizeKeyFromCss(key) {
  return key.replace(/^--font-size-/, "")
}

function buildConsolidatedSource() {
  const stylesPath = path.join(root, "src", "styles.css")
  const typoJsonPath = path.join(root, "typography.json")

  return Promise.all([
    fs.readFile(stylesPath, "utf8"),
    fs.readFile(typoJsonPath, "utf8"),
  ]).then(([styles, typoRaw]) => {
    const typographySrc = JSON.parse(typoRaw)
    const darkMarker =
      styles.indexOf("\n.dark {") !== -1
        ? "\n.dark {"
        : styles.indexOf(".dark {") !== -1
          ? ".dark {"
          : ""
    const rootBlock = extractBraceContent(styles, ":root")
    const darkBlock = darkMarker ? extractBraceContent(styles, darkMarker) : ""
    const rootVars = parseCssVars(rootBlock)
    const darkVars = parseCssVars(darkBlock)

    const semanticKeys = Object.keys(typographySrc).filter(
      (k) =>
        k.startsWith("text-") &&
        typeof typographySrc[k] === "object" &&
        typographySrc[k] !== null &&
        "fontFamily" in typographySrc[k],
    )
    const typography = {}
    for (const k of semanticKeys) {
      const o = typographySrc[k]
      typography[k] = {
        fontFamily: o.fontFamily,
        fontWeight: o.fontWeight,
        fontSize: `${o.fontSize}px`,
        lineHeight: `${o.lineHeight}px`,
        letterSpacing:
          typeof o.letterSpacing === "number"
            ? o.letterSpacing === 0
              ? "0px"
              : `${o.letterSpacing}px`
            : String(o.letterSpacing ?? ""),
      }
    }

    const fontFamilies = {
      "--font-roboto": rootVars["font-roboto"] ?? "",
      "--font-poppins": rootVars["font-poppins"] ?? "",
      "--font-sans": rootVars["font-sans"] ?? "",
      "--font-display": rootVars["font-display"] ?? "",
      "font-sans": rootVars["font-sans"] ?? "",
      "font-display": rootVars["font-display"] ?? "",
    }

    const fontWeights = {
      "font-weight-regular": Number(rootVars["font-weight-regular"]),
      "font-weight-medium": Number(rootVars["font-weight-medium"]),
      "font-weight-semibold": Number(rootVars["font-weight-semibold"]),
      "font-weight-bold": Number(rootVars["font-weight-bold"]),
      "font-weight-normal": Number(rootVars["font-weight-normal"]),
    }

    const fontSizes = {}
    for (const [k, v] of Object.entries(rootVars)) {
      if (!k.startsWith("font-size-")) continue
      fontSizes[`--${k}`] = /^[\d.]+rem$/.test(v) ? remToPxPx(v.replace("rem", "")) : v
    }

    const lineHeights = {
      "--line-height-tight": rootVars["line-height-tight"],
      "--line-height-snug": rootVars["line-height-snug"],
      "--line-height-normal": rootVars["line-height-normal"],
      "--line-height-relaxed": rootVars["line-height-relaxed"],
      "--line-height-loose": rootVars["line-height-loose"],
    }

    const letterSpacing = {
      "--letter-spacing-tight": rootVars["letter-spacing-tight"],
      "--letter-spacing-normal": rootVars["letter-spacing-normal"],
      "--letter-spacing-wide": rootVars["letter-spacing-wide"],
      "--letter-spacing-wider": rootVars["letter-spacing-wider"],
    }

    const colorKeys = Object.keys(COLOR_SEMANTIC_PATH)

    const colors = { light: {}, dark: {} }
    for (const key of colorKeys) {
      if (rootVars[key] !== undefined) colors.light[key] = rootVars[key]
      if (darkVars[key] !== undefined) colors.dark[key] = darkVars[key]
    }

    const overlay = { light: {}, dark: {} }
    for (const key of Object.keys(OVERLAY_SEMANTIC_PATH)) {
      if (rootVars[key] !== undefined) overlay.light[key] = rootVars[key]
      if (darkVars[key] !== undefined) overlay.dark[key] = darkVars[key]
    }

    const spacing = {}
    for (const [k, v] of Object.entries(rootVars)) {
      if (!k.startsWith("space-")) continue
      spacing[`--${k}`] = normalizeSpacing(v)
    }

    const radii = {}
    for (const [k, v] of Object.entries(rootVars)) {
      if (k !== "radius" && !k.startsWith("radius-")) continue
      radii[`--${k}`] = /^[\d.]+px$/.test(v) ? v : normalizeRadii(v)
    }

    const shadowsRaw = { light: {}, dark: {} }
    for (const [k, v] of Object.entries(rootVars)) {
      if (!k.startsWith("shadow-")) continue
      shadowsRaw.light[`--${k}`] = v
    }
    for (const [k, v] of Object.entries(darkVars)) {
      if (!k.startsWith("shadow-")) continue
      shadowsRaw.dark[`--${k}`] = v
    }
    const shadows = {
      light: mapShadowCssRecord(shadowsRaw.light),
      dark: mapShadowCssRecord(shadowsRaw.dark),
    }

    const opacityLight = dashKeys(collectPrefixed(rootVars, "opacity-"))
    const opacityDark = { ...opacityLight }
    for (const [k, v] of Object.entries(darkVars)) {
      if (k.startsWith("opacity-")) opacityDark[`--${k}`] = v
    }

    const extra = {
      sizing: Object.fromEntries(
        Object.entries(collectPrefixed(rootVars, "size-")).map(([k, v]) => [`--${k}`, v]),
      ),
      border: {
        "--border-width": rootVars["border-width"],
        "--border-width-2": rootVars["border-width-2"],
        "--border-style": rootVars["border-style"],
      },
      zIndex: Object.fromEntries(
        Object.entries(collectPrefixed(rootVars, "z-")).map(([k, v]) => [`--${k}`, v]),
      ),
      opacity: {
        light: opacityLight,
        dark: opacityDark,
      },
      layout: {
        "--header-height": rootVars["header-height"],
        "--header-height-desktop": rootVars["header-height-desktop"],
        "--container-max-width": rootVars["container-max-width"],
        "--container-px": rootVars["container-px"],
        "--layout-modal-max-height": rootVars["layout-modal-max-height"],
        "--layout-modal-sheet-height": rootVars["layout-modal-sheet-height"],
        "--layout-modal-full-max-width": rootVars["layout-modal-full-max-width"],
        "--layout-dropdown-min-width": rootVars["layout-dropdown-min-width"],
        "--layout-select-content-max-height": rootVars["layout-select-content-max-height"],
      },
      breakpoints: Object.fromEntries(
        Object.entries(collectPrefixed(rootVars, "breakpoint-")).map(([k, v]) => [`--${k}`, v]),
      ),
      animation: {
        transitions: {
          "--transition-fast": rootVars["transition-fast"],
          "--transition-base": rootVars["transition-base"],
          "--transition-slow": rootVars["transition-slow"],
        },
        easing: {
          "--easing-default": rootVars["easing-default"],
          "--easing-in": rootVars["easing-in"],
          "--easing-out": rootVars["easing-out"],
          "--easing-in-out": rootVars["easing-in-out"],
        },
      },
    }

    const effectsPayload = buildEffectsPayload()

    const output = {
      $comment:
        "Gerado por scripts/export-figma-tokens.mjs — fontes: src/styles.css (:root/.dark), typography.json. Não editar valores manualmente; rode o script após mudanças nos tokens.",
      meta: {
        sources: ["src/styles.css", "src/tokens.css", "typography.json", "src/theme/tokens.ts"],
        _contratoHtmlEFigma: typographySrc._contratoHtmlEFigma ?? undefined,
      },
      typography,
      fontFamilies,
      fontWeights,
      fontSizes,
      lineHeights,
      letterSpacing,
      colors,
      overlay,
      spacing,
      radii,
      shadows,
      effects: effectsPayload,
      ...extra,
    }

    if (!output.meta._contratoHtmlEFigma) delete output.meta._contratoHtmlEFigma

    return output
  })
}

/**
 * Monta primitives.json (valores crus + paletas por modo).
 * semantic tokens em light/dark apontam para estes caminhos via aliases.
 */
function buildPrimitives(src) {
  const out = {}

  const colorPalette = { light: {}, dark: {} }
  for (const flatKey of Object.keys(COLOR_SEMANTIC_PATH)) {
    if (src.colors.light[flatKey] !== undefined) {
      deepSet(
        colorPalette.light,
        COLOR_SEMANTIC_PATH[flatKey],
        wrapLeaf(src.colors.light[flatKey], "color"),
      )
    }
    if (src.colors.dark[flatKey] !== undefined) {
      deepSet(
        colorPalette.dark,
        COLOR_SEMANTIC_PATH[flatKey],
        wrapLeaf(src.colors.dark[flatKey], "color"),
      )
    }
  }
  out.color = { palette: colorPalette }

  out.spacing = {}
  for (const [cssKey, raw] of Object.entries(src.spacing)) {
    const parts = spacingPathPartsFromCssKey(cssKey)
    deepSet(
      out.spacing,
      parts,
      wrapLeaf(coerceNumericDimension(stripPxFromDimension(raw)), "spacing"),
    )
  }

  out.radius = {}
  for (const [cssKey, raw] of Object.entries(src.radii)) {
    const k = cssKey === "--radius" ? "default" : cssKey.replace(/^--radius-/, "")
    deepSet(out.radius, [k], wrapLeaf(coerceNumericDimension(stripPxFromDimension(raw)), "borderRadius"))
  }

  out.fontSize = {}
  for (const [cssKey, raw] of Object.entries(src.fontSizes)) {
    const k = fontSizeKeyFromCss(cssKey)
    deepSet(out.fontSize, [k], wrapLeaf(coerceNumericDimension(stripPxFromDimension(raw)), "fontSizes"))
  }

  out.lineHeight = {}
  for (const [cssKey, raw] of Object.entries(src.lineHeights)) {
    const k = cssKey.replace(/^--line-height-/, "")
    deepSet(out.lineHeight, [k], wrapLeaf(coerceNumericDimension(String(raw)), "lineHeights"))
  }

  out.letterSpacing = {}
  for (const [cssKey, raw] of Object.entries(src.letterSpacing)) {
    const k = cssKey.replace(/^--letter-spacing-/, "")
    deepSet(out.letterSpacing, [k], wrapLeaf(coerceLetterSpacingPrimitive(raw), "letterSpacing"))
  }

  out.shadow = {
    light: {},
    dark: {},
  }
  for (const [cssKey, raw] of Object.entries(src.shadows.light)) {
    const k = shadowKeyFromCss(cssKey)
    const parsed =
      typeof raw === "string" ? parseBoxShadow(raw) : raw
    deepSet(out.shadow.light, [k], wrapLeaf(parsed, "boxShadow"))
  }
  for (const [cssKey, raw] of Object.entries(src.shadows.dark)) {
    const k = shadowKeyFromCss(cssKey)
    const parsed =
      typeof raw === "string" ? parseBoxShadow(raw) : raw
    deepSet(out.shadow.dark, [k], wrapLeaf(parsed, "boxShadow"))
  }

  out.opacity = {
    light: {},
    dark: {},
  }
  for (const [cssKey, raw] of Object.entries(src.opacity.light)) {
    const k = opacityKeyFromCss(cssKey)
    deepSet(out.opacity.light, [k], wrapLeaf(coerceOpacityPrimitive(raw), "opacity"))
  }
  for (const [cssKey, raw] of Object.entries(src.opacity.dark)) {
    const k = opacityKeyFromCss(cssKey)
    deepSet(out.opacity.dark, [k], wrapLeaf(coerceOpacityPrimitive(raw), "opacity"))
  }

  out.fontFamilies = {}
  for (const [name, val] of Object.entries(src.fontFamilies)) {
    deepSet(out.fontFamilies, [name.replace(/^--/, "").replace(/-/g, "_")], wrapLeaf(val, "fontFamilies"))
  }

  out.sizing = {}
  for (const [cssKey, raw] of Object.entries(src.sizing)) {
    const k = cssKey.replace(/^--size-/, "")
    deepSet(out.sizing, [k], wrapLeaf(coerceNumericDimension(stripPxFromDimension(raw)), "sizing"))
  }

  out.border = {}
  deepSet(
    out.border,
    ["width"],
    wrapLeaf(coerceNumericDimension(stripPxFromDimension(src.border["--border-width"])), "borderWidth"),
  )
  deepSet(
    out.border,
    ["width2"],
    wrapLeaf(coerceNumericDimension(stripPxFromDimension(src.border["--border-width-2"])), "borderWidth"),
  )
  deepSet(out.border, ["style"], wrapLeaf(src.border["--border-style"], "borderStyle"))

  out.overlay = { palette: { light: {}, dark: {} } }
  if (src.overlay?.light) {
    for (const flatKey of Object.keys(OVERLAY_SEMANTIC_PATH)) {
      if (src.overlay.light[flatKey] === undefined) continue
      deepSet(
        out.overlay.palette.light,
        OVERLAY_SEMANTIC_PATH[flatKey],
        wrapLeaf(src.overlay.light[flatKey], "color"),
      )
    }
  }
  if (src.overlay?.dark) {
    for (const flatKey of Object.keys(OVERLAY_SEMANTIC_PATH)) {
      if (src.overlay.dark[flatKey] === undefined) continue
      deepSet(
        out.overlay.palette.dark,
        OVERLAY_SEMANTIC_PATH[flatKey],
        wrapLeaf(src.overlay.dark[flatKey], "color"),
      )
    }
  }

  return out
}

/** Converte `--space-*` em segmentos aninhados sem colisão folha/ramo (ex.: section-y + section-y-desktop). */
function spacingPathPartsFromCssKey(cssKey) {
  const raw = cssKey.replace(/^--space-/, "")
  if (!raw) return []
  const camel = raw.replace(/-([a-z])/gi, (_, c) => c.toUpperCase())
  return [camel]
}

function buildLightDarkSemantic(src) {
  const lightColors = { color: {} }
  const darkColors = { color: {} }
  for (const flatKey of Object.keys(COLOR_SEMANTIC_PATH)) {
    const pathParts = COLOR_SEMANTIC_PATH[flatKey]
    const refL = primitivesAlias(["color", "palette", "light", ...pathParts].join("."))
    const refD = primitivesAlias(["color", "palette", "dark", ...pathParts].join("."))
    deepSet(lightColors.color, pathParts, wrapLeaf(refL, "color"))
    deepSet(darkColors.color, pathParts, wrapLeaf(refD, "color"))
  }

  const lightShadow = { shadow: {} }
  const darkShadow = { shadow: {} }
  for (const cssKey of Object.keys(src.shadows.light)) {
    const k = shadowKeyFromCss(cssKey)
    deepSet(
      lightShadow.shadow,
      [k],
      wrapLeaf(primitivesAlias(["shadow", "light", k].join(".")), "boxShadow"),
    )
  }
  for (const cssKey of Object.keys(src.shadows.dark)) {
    const k = shadowKeyFromCss(cssKey)
    deepSet(
      darkShadow.shadow,
      [k],
      wrapLeaf(primitivesAlias(["shadow", "dark", k].join(".")), "boxShadow"),
    )
  }

  const lightOpacity = { opacity: {} }
  const darkOpacity = { opacity: {} }
  for (const cssKey of Object.keys(src.opacity.light)) {
    const k = opacityKeyFromCss(cssKey)
    deepSet(
      lightOpacity.opacity,
      [k],
      wrapLeaf(primitivesAlias(["opacity", "light", k].join(".")), "opacity"),
    )
  }
  for (const cssKey of Object.keys(src.opacity.dark)) {
    const k = opacityKeyFromCss(cssKey)
    deepSet(
      darkOpacity.opacity,
      [k],
      wrapLeaf(primitivesAlias(["opacity", "dark", k].join(".")), "opacity"),
    )
  }

  const lightOverlayTok = { overlay: {} }
  const darkOverlayTok = { overlay: {} }
  for (const flatKey of Object.keys(OVERLAY_SEMANTIC_PATH)) {
    const pathParts = OVERLAY_SEMANTIC_PATH[flatKey]
    const refL = primitivesAlias(["overlay", "palette", "light", ...pathParts].join("."))
    const refD = primitivesAlias(["overlay", "palette", "dark", ...pathParts].join("."))
    deepSet(lightOverlayTok.overlay, pathParts, wrapLeaf(refL, "color"))
    deepSet(darkOverlayTok.overlay, pathParts, wrapLeaf(refD, "color"))
  }

  return {
    light: { ...lightColors, ...lightShadow, ...lightOpacity, ...lightOverlayTok },
    dark: { ...darkColors, ...darkShadow, ...darkOpacity, ...darkOverlayTok },
  }
}

function buildGlobal(src, usePrimitiveAliases) {
  const global = {}

  global.typography = {}
  for (const [key, comp] of Object.entries(src.typography)) {
    const [cat, scale] = parseTypographyKey(key)
    const composite = buildTypographyCompositeValue(comp)
    deepSet(global.typography, [cat, scale], wrapLeaf(composite, "typography"))
  }

  global.fontFamilies = {}
  for (const [name, val] of Object.entries(src.fontFamilies)) {
    deepSet(
      global.fontFamilies,
      [name.replace(/^--/, "").replace(/-/g, "_")],
      wrapLeaf(
        usePrimitiveAliases
          ? primitivesAlias(`fontFamilies.${name.replace(/^--/, "").replace(/-/g, "_")}`)
          : val,
        "fontFamilies",
      ),
    )
  }

  global.fontWeights = {}
  for (const [k, v] of Object.entries(src.fontWeights)) {
    deepSet(global.fontWeights, [k.replace(/^font-weight-/, "")], wrapLeaf(Number(v), "fontWeights"))
  }

  const spacingAliasRoot = {}
  for (const cssKey of Object.keys(src.spacing)) {
    const path = spacingPathPartsFromCssKey(cssKey)
    deepSet(
      spacingAliasRoot,
      path,
      wrapLeaf(primitivesAlias(["spacing", ...path].join(".")), "spacing"),
    )
  }
  global.spacing = spacingAliasRoot

  const radiusAliasRoot = {}
  for (const cssKey of Object.keys(src.radii)) {
    const k = cssKey === "--radius" ? "default" : cssKey.replace(/^--radius-/, "")
    deepSet(radiusAliasRoot, [k], wrapLeaf(primitivesAlias(["radius", k].join(".")), "borderRadius"))
  }
  global.radius = radiusAliasRoot

  global.fontSize = {}
  for (const cssKey of Object.keys(src.fontSizes)) {
    const k = fontSizeKeyFromCss(cssKey)
    deepSet(global.fontSize, [k], wrapLeaf(primitivesAlias(["fontSize", k].join(".")), "fontSizes"))
  }

  global.lineHeight = {}
  for (const cssKey of Object.keys(src.lineHeights)) {
    const k = cssKey.replace(/^--line-height-/, "")
    deepSet(global.lineHeight, [k], wrapLeaf(primitivesAlias(["lineHeight", k].join(".")), "lineHeights"))
  }

  global.letterSpacing = {}
  for (const cssKey of Object.keys(src.letterSpacing)) {
    const k = cssKey.replace(/^--letter-spacing-/, "")
    deepSet(
      global.letterSpacing,
      [k],
      wrapLeaf(primitivesAlias(["letterSpacing", k].join(".")), "letterSpacing"),
    )
  }

  global.sizing = {}
  for (const cssKey of Object.keys(src.sizing)) {
    const k = cssKey.replace(/^--size-/, "")
    deepSet(global.sizing, [k], wrapLeaf(primitivesAlias(["sizing", k].join(".")), "sizing"))
  }

  global.zIndex = {}
  for (const [cssKey, val] of Object.entries(src.zIndex)) {
    const k = cssKey.replace(/^--z-/, "")
    deepSet(global.zIndex, [k], wrapLeaf(Number(val), "dimension"))
  }

  global.layout = {}
  for (const [cssKey, val] of Object.entries(src.layout)) {
    const k = cssKey.replace(/^--/, "").replace(/-/g, "")
    deepSet(global.layout, [k], wrapLeaf(coerceLayoutDimension(val), "dimension"))
  }

  global.breakpoints = {}
  for (const [cssKey, val] of Object.entries(src.breakpoints)) {
    const k = cssKey.replace(/^--breakpoint-/, "")
    deepSet(global.breakpoints, [k], wrapLeaf(coerceLayoutDimension(val), "dimension"))
  }

  global.border = {}
  deepSet(
    global.border,
    ["width"],
    wrapLeaf(primitivesAlias("border.width"), "borderWidth"),
  )
  deepSet(
    global.border,
    ["width2"],
    wrapLeaf(primitivesAlias("border.width2"), "borderWidth"),
  )
  deepSet(
    global.border,
    ["style"],
    wrapLeaf(primitivesAlias("border.style"), "borderStyle"),
  )

  global.animation = {
    transitions: {},
    easing: {},
  }
  for (const [cssKey, val] of Object.entries(src.animation.transitions)) {
    const k = cssKey.replace(/^--transition-/, "")
    deepSet(global.animation.transitions, [k], wrapLeaf(String(val), "other"))
  }
  for (const [cssKey, val] of Object.entries(src.animation.easing)) {
    const k = cssKey.replace(/^--easing-/, "")
    deepSet(global.animation.easing, [k], wrapLeaf(String(val), "other"))
  }

  return global
}

/** Percorre folhas `{ value, type }`; ignora ramos que não são tokens folha. */
function walkTokenLeaves(obj, onLeafValue) {
  if (!obj || typeof obj !== "object") return
  const hasLeafShape =
    Object.prototype.hasOwnProperty.call(obj, "value") &&
    Object.prototype.hasOwnProperty.call(obj, "type")
  if (hasLeafShape) {
    onLeafValue(obj.value)
    return
  }
  for (const child of Object.values(obj)) walkTokenLeaves(child, onLeafValue)
}

/** Percorre folhas `{ value, type }` repassando o objeto folha completo. */
function walkTokenLeafNodes(obj, onLeaf) {
  if (!obj || typeof obj !== "object") return
  const hasLeafShape =
    Object.prototype.hasOwnProperty.call(obj, "value") &&
    Object.prototype.hasOwnProperty.call(obj, "type")
  if (hasLeafShape) {
    onLeaf(obj)
    return
  }
  for (const child of Object.values(obj)) walkTokenLeafNodes(child, onLeaf)
}

/**
 * Garante que shadows em primitives estejam no formato W3C (objeto ou array), nunca string CSS.
 */
/** Alias permitido em cores de effects: sets semânticos light/dark ou primitivos. */
function isAllowedEffectsDsAlias(s) {
  const t = String(s).trim()
  const m = /^\{([^}]+)\}$/.exec(t)
  if (!m) return false
  const inner = m[1]
  return (
    inner.startsWith("light.") ||
    inner.startsWith("dark.") ||
    inner.startsWith("primitives.")
  )
}

function validateEffectBoxShadowValue(value, ctxLabel) {
  if (value === null || value === undefined) {
    throw new Error(`${ctxLabel}: valor boxShadow ausente`)
  }
  if (typeof value === "string") {
    if (!isAllowedEffectsDsAlias(value)) {
      throw new Error(
        `${ctxLabel}: boxShadow não pode ser string CSS; use objeto W3C ou alias {light.|dark.|primitives.}. Recebido: ${value.slice(0, 120)}`,
      )
    }
    return
  }
  const layers = Array.isArray(value) ? value : [value]
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i]
    if (!layer || typeof layer !== "object") {
      throw new Error(`${ctxLabel}: camada ${i} inválida`)
    }
    for (const key of ["x", "y", "blur", "spread", "color", "type"]) {
      if (!Object.prototype.hasOwnProperty.call(layer, key)) {
        throw new Error(`${ctxLabel}: falta "${key}" na camada ${i}`)
      }
    }
    if (typeof layer.color !== "string" || !isAllowedEffectsDsAlias(layer.color)) {
      throw new Error(
        `${ctxLabel}: color da camada ${i} deve ser alias DS {light.|dark.|primitives.}, sem hardcode`,
      )
    }
    for (const dim of ["x", "y", "blur", "spread"]) {
      if (typeof layer[dim] !== "number" || !Number.isFinite(layer[dim])) {
        throw new Error(`${ctxLabel}: ${dim} numérico finito esperado na camada ${i}`)
      }
    }
    if (layer.type !== "dropShadow" && layer.type !== "innerShadow") {
      throw new Error(`${ctxLabel}: type dropShadow ou innerShadow na camada ${i}`)
    }
  }
}

/**
 * Valida tokens/effects (Effect Styles): sem CSS cru; camadas com aliases DS e type correto.
 */
function validateEffectsExport(effectsPayload) {
  if (!effectsPayload || typeof effectsPayload !== "object") {
    throw new Error("validateEffectsExport: payload ausente")
  }
  for (const mode of ["light", "dark"]) {
    const tree = effectsPayload[mode]
    if (!tree || typeof tree !== "object") {
      throw new Error(`validateEffectsExport: falta ramo "${mode}"`)
    }
    walkTokenLeafNodes(tree, (leaf) => {
      if (leaf.type !== "boxShadow") return
      validateEffectBoxShadowValue(leaf.value, `effects.${mode}`)
    })
  }
}

function validateShadowTokens(primitives) {
  const shadowRoot = primitives.shadow
  if (!shadowRoot) return
  for (const mode of ["light", "dark"]) {
    const tree = shadowRoot[mode]
    if (!tree) continue
    walkTokenLeafNodes(tree, (leaf) => {
      if (leaf.type !== "boxShadow") return
      const v = leaf.value
      if (typeof v === "string") {
        throw new Error(
          `validateShadowTokens: shadow ainda é string em shadow.${mode} (Tokens Studio precisa objeto/array). Valor: ${v.slice(0, 80)}…`,
        )
      }
      const layers = Array.isArray(v) ? v : [v]
      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i]
        if (!layer || typeof layer !== "object") {
          throw new Error(`validateShadowTokens: camada ${i} inválida em shadow.${mode}`)
        }
        for (const key of ["x", "y", "blur", "spread", "color", "type"]) {
          if (!Object.prototype.hasOwnProperty.call(layer, key)) {
            throw new Error(`validateShadowTokens: falta "${key}" na camada ${i} de shadow.${mode}`)
          }
        }
        if (layer.type !== "dropShadow" && layer.type !== "innerShadow") {
          throw new Error(
            `validateShadowTokens: type deve ser dropShadow ou innerShadow, recebido "${layer.type}"`,
          )
        }
      }
    })
  }
}

function validatePrimitivesHasNoAliases(label, data) {
  const violations = []
  walkTokenLeaves(data, (val) => {
    if (typeof val !== "string") return
    const v = val.trim()
    if (/^\{[^}]+\}$/.test(v)) violations.push(v)
  })
  if (violations.length) {
    throw new Error(`${label}: primitivos não podem conter aliases (${violations.length} ocorrências). Ex.: ${violations[0]}`)
  }
}

function validateSemanticAliasesUsePrimitivesSet(label, data) {
  const violations = []
  walkTokenLeaves(data, (val) => {
    if (typeof val !== "string") return
    const v = val.trim()
    if (!/^\{[^}]+\}$/.test(v)) return
    const inner = v.slice(1, -1)
    if (!inner.startsWith(`${TOKEN_SET_PRIMITIVES}.`)) violations.push(v)
  })
  if (violations.length) {
    throw new Error(
      `${label}: aliases devem começar com "${TOKEN_SET_PRIMITIVES}." (${violations.length} inválidos). Ex.: ${violations[0]}`,
    )
  }
}

async function main() {
  const fromJson = process.argv.includes("--from-json")
  let src
  if (fromJson) {
    const figmaPathRead = path.join(root, "figma-tokens", "figma-tokens.json")
    src = JSON.parse(await fs.readFile(figmaPathRead, "utf8"))
    console.warn(`Loaded consolidated tokens from ${path.relative(root, figmaPathRead)}`)
  } else {
    src = await buildConsolidatedSource()
    const figmaDir = path.join(root, "figma-tokens")
    await fs.mkdir(figmaDir, { recursive: true })
    const figmaPath = path.join(figmaDir, "figma-tokens.json")
    await fs.writeFile(figmaPath, `${JSON.stringify(src, null, 2)}\n`, "utf8")
    console.warn(`Wrote ${path.relative(root, figmaPath)}`)
  }

  const primitives = buildPrimitives(src)
  validateShadowTokens(primitives)
  const globalTokens = buildGlobal(src, true)

  const semantic = buildLightDarkSemantic(src)

  const effectsPayload = buildEffectsPayload()
  validateEffectsExport(effectsPayload)

  const tokensDir = path.join(root, "tokens")
  await fs.mkdir(tokensDir, { recursive: true })

  await fs.writeFile(
    path.join(tokensDir, "primitives.json"),
    `${JSON.stringify(primitives, null, 2)}\n`,
    "utf8",
  )
  await fs.writeFile(
    path.join(tokensDir, "global.json"),
    `${JSON.stringify(globalTokens, null, 2)}\n`,
    "utf8",
  )
  await fs.writeFile(
    path.join(tokensDir, "light.json"),
    `${JSON.stringify(semantic.light, null, 2)}\n`,
    "utf8",
  )
  await fs.writeFile(
    path.join(tokensDir, "dark.json"),
    `${JSON.stringify(semantic.dark, null, 2)}\n`,
    "utf8",
  )
  await fs.writeFile(
    path.join(tokensDir, "effects.json"),
    `${JSON.stringify({ effects: effectsPayload }, null, 2)}\n`,
    "utf8",
  )

  validatePrimitivesHasNoAliases("tokens/primitives.json", primitives)
  validateSemanticAliasesUsePrimitivesSet("tokens/global.json", globalTokens)
  validateSemanticAliasesUsePrimitivesSet("tokens/light.json", semantic.light)
  validateSemanticAliasesUsePrimitivesSet("tokens/dark.json", semantic.dark)

  console.warn(
    `Wrote tokens/primitives.json, global.json, light.json, dark.json, effects.json (aliases → ${TOKEN_SET_PRIMITIVES}.*; effects → light.|dark.|primitives.)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
