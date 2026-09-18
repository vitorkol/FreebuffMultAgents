import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { beforeAll, describe, expect, it } from "vitest"

import { injectBiomeTypographyContract } from "./inject-biome-typography-styles"

const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..")

type TypographyContractEntry = {
  fontSize: number
  fontWeight: number
  lineHeight: number
  fontFamily: string
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function isTypographyContractEntry(
  value: unknown,
): value is TypographyContractEntry {
  if (!isPlainObject(value)) return false
  return (
    typeof value.fontSize === "number" &&
    typeof value.fontWeight === "number" &&
    typeof value.lineHeight === "number" &&
    typeof value.fontFamily === "string"
  )
}

function loadTypographyContractJson(): Partial<
  Record<string, TypographyContractEntry>
> {
  const raw: unknown = JSON.parse(
    readFileSync(join(PKG_ROOT, "typography.json"), "utf8")
  )
  if (!isPlainObject(raw))
    throw new Error("typography.json: objeto raiz esperado")

  const out: Partial<Record<string, TypographyContractEntry>> = {}

  for (const [key, entry] of Object.entries(raw)) {
    if (
      typeof key !== "string" ||
      !key.startsWith("text-") ||
      !isTypographyContractEntry(entry)
    ) {
      continue
    }
    out[key] = entry
  }

  return out
}

const typographyContract = loadTypographyContractJson()

function requireContractEntry(key: string): TypographyContractEntry {
  const entry = typographyContract[key]
  if (!isTypographyContractEntry(entry)) {
    throw new Error(
      `typography.json: entrada "${key}" inválida ou ausente para o contrato de teste`,
    )
  }
  return entry
}

/** Valores numéricos em px (assumindo root 16px para rem). */
function parseFontSizePx(value: string): number {
  const v = value.trim()
  const px = /^([\d.]+)px$/.exec(v)
  const pxGrp = px?.[1]
  if (pxGrp !== undefined) return parseFloat(pxGrp)
  const rem = /^([\d.]+)rem$/.exec(v)
  const remGrp = rem?.[1]
  if (remGrp !== undefined) return parseFloat(remGrp) * 16
  return parseFloat(v) || 0
}

function parseFontWeight(v: string): number {
  const n = parseInt(v, 10)
  return Number.isFinite(n) ? n : 400
}

describe("contrato tipográfico utilitário (CSS ↔ typography.json)", () => {
  beforeAll(() => {
    injectBiomeTypographyContract()
  })

  it("classes text-display-xl / text-body-m / text-label-m espelham typography.json", () => {
    document.body.innerHTML = `
      <div data-testid="h1" class="text-display-xl">Title</div>
      <div data-testid="p" class="text-body-m">Text</div>
      <div data-testid="label" class="text-label-m">Label</div>
    `
    const h1 = document.querySelector("[data-testid=h1]") as HTMLElement
    const p = document.querySelector("[data-testid=p]") as HTMLElement
    const label = document.querySelector("[data-testid=label]") as HTMLElement

    const h1Style = getComputedStyle(h1)
    const pStyle = getComputedStyle(p)
    const labelStyle = getComputedStyle(label)

    expect(h1Style.fontFamily).toMatch(/Poppins/i)
    expect(pStyle.fontFamily).toMatch(/Roboto/i)
    expect(labelStyle.fontFamily).toMatch(/Roboto/i)

    const h1Size = parseFontSizePx(h1Style.fontSize)
    const pSize = parseFontSizePx(pStyle.fontSize)
    const labelSize = parseFontSizePx(labelStyle.fontSize)

    expect(h1Size).toBeGreaterThan(pSize)
    expect(pSize).toBeGreaterThanOrEqual(labelSize)

    const jH1 = requireContractEntry("text-display-xl")
    const jP = requireContractEntry("text-body-m")
    const jL = requireContractEntry("text-label-m")

    expect(Math.round(h1Size)).toBe(jH1.fontSize)
    expect(parseFontWeight(h1Style.fontWeight)).toBe(jH1.fontWeight)
    expect(Math.round(pSize)).toBe(jP.fontSize)
    expect(parseFontWeight(pStyle.fontWeight)).toBe(jP.fontWeight)
    expect(Math.round(labelSize)).toBe(jL.fontSize)
    expect(parseFontWeight(labelStyle.fontWeight)).toBe(jL.fontWeight)

    expect(h1Style.lineHeight).not.toBe(pStyle.lineHeight)
  })
})
