/**
 * Exemplo para apps consumidores (copie como .eslintrc.cjs ou mescle com a config existente).
 */
module.exports = {
  plugins: ["biome-ds"],
  rules: {
    "biome-ds/no-manual-typography": "error",
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
}
