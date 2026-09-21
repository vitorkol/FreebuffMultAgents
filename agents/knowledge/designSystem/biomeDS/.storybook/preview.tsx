import type { Preview } from '@storybook/react'
import React from 'react'

import '../src/styles.css'
import { biomeTheme } from './theme'

const preview: Preview = {
  parameters: {
    layout: 'padded',
    docs: {
      theme: biomeTheme,
      story: {
        inline: true,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      sort: 'requiredFirst',
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Começar',
          ['Introdução', 'Instalação', 'Guia de Contribuição', 'Changelog'],
          'Fundações',
          [
            'Cores',
            'Tipografia',
            'Dimensionamento',
            'Espaçamentos',
            'Iconografia',
            'Opacidade',
            'Preenchimento',
            'Raio de Borda',
            'Sombras e Sobreposição',
          ],
          'Componentes',
          ['*'],
          'Padrões',
          ['*'],
          '*',
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-background text-foreground font-sans">
        <Story />
      </div>
    ),
  ],
}

export default preview
