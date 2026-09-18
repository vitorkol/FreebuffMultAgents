import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: [
    "../src/docs/**/*.mdx",
    "../src/components/ui/!(card|typography)/**/*.mdx",
    "../src/components/ui/!(card|typography)/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal(config) {
    config.base = process.env.STORYBOOK_BASE_PATH || '/'
    return config
  },
}

export default config

