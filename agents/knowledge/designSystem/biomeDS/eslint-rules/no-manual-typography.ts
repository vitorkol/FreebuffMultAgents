/**
 * Proíbe utilitários Tailwind de tipografia manual (escala text-xs…9xl, font-*, leading-*, tracking-*, text-[…]).
 * Permite classes semânticas do DS (text-display-*, text-body-*, …), cores e font-sans|display|mono.
 *
 * Artefatos consumidos pelo ESLint são emitidos como CommonJS via `pnpm build:eslint-rule`.
 *
 * Nota: `@types/eslint` modela ESTree clássico; nós JSX são tratados como `unknown` e inspecionados por `type`.
 */
/* eslint-env node */

import type { Rule } from "eslint"

const MESSAGE_ID = "noManualTypography" as const

const TAILWIND_TEXT_SCALE =
  /^(text-(?:xs|sm|md|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl))(?:\/[0-9]+)?$/

const ALLOWED_FONT_FAMILY = new Set(["font-sans", "font-display", "font-mono"])

function checkClassToken(rawToken: string): string | null {
  if (!rawToken) return null
  const token = rawToken.trim()
  if (!token || token.startsWith("//")) return null

  const core = token.split(":").pop() ?? token
  const t = core.trim()

  if (TAILWIND_TEXT_SCALE.test(t)) {
    return "escala Tailwind (text-xs, text-sm, …)"
  }
  if (t.startsWith("text-[")) {
    return "tamanho arbitrário text-[…]"
  }
  if (t.startsWith("font-") && !ALLOWED_FONT_FAMILY.has(t)) {
    return "font-* (font-sans, font-display e font-mono são permitidos)"
  }
  if (t.startsWith("leading-")) return "leading-*"
  if (t.startsWith("tracking-")) return "tracking-*"
  return null
}

type Violation = { index: number; len: number; detail: string }

function findViolationsInString(value: string): Violation[] {
  if (!value) return []
  const out: Violation[] = []
  const re = /[^\s]+/g
  let m: RegExpExecArray | null
  while ((m = re.exec(value)) !== null) {
    const tok = m[0]!
    const detail = checkClassToken(tok)
    if (detail) {
      out.push({ index: m.index, len: tok.length, detail })
    }
  }
  return out
}

type UnknownAst = {
  type?: string
  expression?: UnknownAst
  value?: unknown
  quasis?: Array<{ value?: { cooked?: string; raw?: string } }>
  name?: { type?: string; name?: string }
}

function asReportNode(n: UnknownAst): Rule.Node {
  return n as Rule.Node
}

function scanClassExpression(n: unknown, context: Rule.RuleContext): void {
  if (!n || typeof n !== "object") return
  const node = n as UnknownAst

  if (node.type === "JSXExpressionContainer" && node.expression) {
    scanClassExpression(node.expression, context)
    return
  }

  if (node.type === "Literal" && typeof node.value === "string") {
    const violations = findViolationsInString(node.value)
    if (!violations.length) return
    for (const v of violations) {
      context.report({
        node: asReportNode(node),
        messageId: MESSAGE_ID,
        data: { detail: v.detail },
      })
    }
    return
  }

  if (node.type === "TemplateLiteral" && Array.isArray(node.quasis)) {
    for (const q of node.quasis) {
      const cooked = q.value?.cooked ?? q.value?.raw ?? ""
      const violations = findViolationsInString(cooked)
      for (const v of violations) {
        context.report({
          node: asReportNode(q),
          messageId: MESSAGE_ID,
          data: { detail: v.detail },
        })
      }
    }
  }
}

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Proíbe tipografia manual via classes Tailwind fora do contrato do Biome Design System",
    },
    messages: {
      [MESSAGE_ID]:
        "Use HTML semântico ou o componente <Typography /> do Design System. Tipografia manual não é permitida ({{detail}}).",
    },
    schema: [],
  },

  create(context) {
    return {
      JSXAttribute(node: UnknownAst): void {
        const nameNode = node.name
        const jsxName =
          nameNode?.type === "JSXIdentifier" ? nameNode.name : nameNode?.name

        const name = jsxName
        if (name !== "className") return

        const v = node.value
        if (!v || typeof v !== "object") return
        const val = v as UnknownAst

        if (val.type === "Literal") {
          scanClassExpression(val, context)
          return
        }

        if (val.type === "JSXExpressionContainer") {
          scanClassExpression(val, context)
        }
      },
    }
  },
}

export default rule
