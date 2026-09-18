import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../button"
import { Icon } from "../icon"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const meta: Meta<typeof Tooltip> = {
  title: "Componentes/Tooltip",
  component: Tooltip,
  tags: [],
  args: {
    trigger: <Button>Hover to see tooltip</Button>,
    content: "This is a tooltip message.",
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tooltip>
export const Playground: Story = {}
export const Positions: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center p-16">
        <Tooltip trigger={<Button variant="outline">Top</Button>} content="Tooltip on top" side="top" />
        <div className="flex gap-8">
          <Tooltip trigger={<Button variant="outline">Left</Button>} content="Tooltip on left" side="left" />
          <Tooltip trigger={<Button variant="outline">Right</Button>} content="Tooltip on right" side="right" />
        </div>
        <Tooltip trigger={<Button variant="outline">Bottom</Button>} content="Tooltip on bottom" side="bottom" />
      </div>
  ),
}
export const WithIcon: Story = {
  args: {
    trigger: (
      <Button variant="outline" size="icon-md">
        <Icon name="info" size="sm" aria-hidden />
      </Button>
    ),
    content: "More information",
  },
}

export const ComposicaoAvancada: Story = {
  name: "Composição avançada (escape hatch)",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Trigger manual</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-body-m">Use this mode only for advanced positioning/custom composition.</p>
      </TooltipContent>
    </Tooltip>
  ),
}
