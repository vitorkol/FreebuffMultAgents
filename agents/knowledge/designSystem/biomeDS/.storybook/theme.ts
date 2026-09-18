import { create } from '@storybook/theming/create'

export const biomeTheme = create({
  base: 'light',

  // Brand
  brandTitle: 'Biome Design System',
  brandUrl: '/',
  brandImage: undefined, // SVG inline via manager-head.html
  brandTarget: '_self',

  // UI Colors — derived from Biome CSS tokens
  colorPrimary: '#264c37',   // --primary
  colorSecondary: '#264c37', // --primary

  // App UI
  appBg: '#f5f9f7',          // slightly tinted background
  appContentBg: '#ffffff',   // --background
  appPreviewBg: '#ffffff',
  appBorderColor: '#e5e5e5', // --border
  appBorderRadius: 8,        // --radius-md

  // Text
  textColor: '#1a1a1a',        // --foreground
  textInverseColor: '#ffffff',
  textMutedColor: '#737373',   // --muted-foreground

  // Toolbar
  barTextColor: '#4c4d4d',     // --text-primary
  barHoverColor: '#264c37',    // --primary
  barSelectedColor: '#264c37', // --primary
  barBg: '#ffffff',

  // Input
  inputBg: '#ffffff',
  inputBorder: '#e5e5e5',
  inputTextColor: '#1a1a1a',
  inputBorderRadius: 6,

  // Fonts
  fontBase: '"Roboto", "Inter", system-ui, sans-serif',
  fontCode: '"Fira Code", "JetBrains Mono", monospace',
})

export const biomeDarkTheme = create({
  base: 'dark',

  brandTitle: 'Biome Design System',
  brandUrl: '/',
  brandTarget: '_self',

  colorPrimary: '#4ade80',
  colorSecondary: '#4ade80',

  appBg: '#0c1410',
  appContentBg: '#162019',
  appPreviewBg: '#0c1410',
  appBorderColor: '#264c37',
  appBorderRadius: 8,

  textColor: '#f5f9f7',
  textInverseColor: '#0c1410',
  textMutedColor: '#9f9f9f',

  barTextColor: '#f5f9f7',
  barHoverColor: '#4ade80',
  barSelectedColor: '#4ade80',
  barBg: '#162019',

  inputBg: '#162019',
  inputBorder: '#264c37',
  inputTextColor: '#f5f9f7',
  inputBorderRadius: 6,

  fontBase: '"Roboto", "Inter", system-ui, sans-serif',
  fontCode: '"Fira Code", "JetBrains Mono", monospace',
})
