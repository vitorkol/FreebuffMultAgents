"use strict"

import { RuleTester } from "eslint"
import rule from "./no-manual-typography"

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
})

ruleTester.run("no-manual-typography", rule, {
  valid: [
    `<p className="text-body-m text-muted-foreground">Ok</p>`,
    `<h1 className="text-display-xl">Ok</h1>`,
    `<span className="font-sans">Ok</span>`,
    `<div className={\`text-label-m border\`}>Ok</div>`,
  ],
  invalid: [
    {
      code: `<p className="text-sm">Bad</p>`,
      errors: [{ messageId: "noManualTypography" }],
    },
    {
      code: `<p className="font-bold">Bad</p>`,
      errors: [{ messageId: "noManualTypography" }],
    },
    {
      code: `<p className="leading-tight">Bad</p>`,
      errors: [{ messageId: "noManualTypography" }],
    },
    {
      code: `<p className="tracking-wide">Bad</p>`,
      errors: [{ messageId: "noManualTypography" }],
    },
    {
      code: `<p className={'text-sm font-bold'}>Bad</p>`,
      errors: [{ messageId: "noManualTypography" }, { messageId: "noManualTypography" }],
    },
  ],
})

console.log("[no-manual-typography] RuleTester OK")
