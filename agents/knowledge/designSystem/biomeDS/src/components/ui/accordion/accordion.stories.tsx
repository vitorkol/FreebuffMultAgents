import type { Meta, StoryObj } from "@storybook/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

const meta: Meta<typeof Accordion> = {
  title: "Componentes/Accordion",
  component: Accordion,
  tags: [],
  args: {
    type: "single",
    collapsible: true,
    items: [
      {
        value: "item-1",
        title: "O componente é acessível?",
        content:
          "Sim. Ele segue o padrão WAI-ARIA do Radix e mantém navegação por teclado com foco visível.",
      },
      {
        value: "item-2",
        title: "Preciso montar Header/Trigger/Content manualmente?",
        content:
          "Não. Use a prop items para passar título e resposta. A composição interna é responsabilidade do Biome.",
      },
      {
        value: "item-3",
        title: "Há animação de abertura?",
        content:
          "Sim. O conteúdo expande/retrai com animação e o ícone rotaciona conforme o estado aberto.",
      },
    ],
    className: "w-full max-w-md",
  },
}

export default meta
type Story = StoryObj<typeof Accordion>
export const Playground: Story = {
}
export const Multiple: Story = {
  args: {
    type: "multiple",
  },
}
export const DefaultOpen: Story = {
  args: {
    defaultValue: "item-1",
  },
}

export const ComposicaoAvancada: Story = {
  name: "Composição avançada (escape hatch)",
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Se quiser, ainda pode compor manualmente</AccordionTrigger>
        <AccordionContent>
          Essa opção existe para casos avançados, mas o uso recomendado no produto é
          via prop `items`.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
