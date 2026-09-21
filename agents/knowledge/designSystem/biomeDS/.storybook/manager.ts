import { addons } from '@storybook/manager-api'
import { biomeTheme } from './theme'

addons.setConfig({
  theme: biomeTheme,
  sidebar: {
    showRoots: true,
  },
  // Keep toolbar visible for dark mode toggle etc.
  enableShortcuts: true,
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'bottom',
})
