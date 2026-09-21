"use strict"

const mod = require("../eslint-rules/no-manual-typography.js")

module.exports = {
  rules: {
    "no-manual-typography": mod.default ?? mod,
  },
}
