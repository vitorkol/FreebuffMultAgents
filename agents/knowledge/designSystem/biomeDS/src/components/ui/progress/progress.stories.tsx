import type { Meta, StoryObj } from "@storybook/react"
import { useEffect, useState } from "react"
import { Progress } from "./progress"

const meta: Meta<typeof Progress> = {
  title: "Componentes/Progress",
  component: Progress,
  tags: [],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Valor do progresso (0–100)",
    },
  },
  args: {
    value: 60,
  },
}

export default meta
type Story = StoryObj<typeof Progress>
export const Playground: Story = {}
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div className="flex flex-col gap-2">
        <span className="text-meta-xs text-muted-foreground">h-1 (4px)</span>
        <Progress value={60} className="h-1" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-meta-xs text-muted-foreground">h-2 (8px)</span>
        <Progress value={60} className="h-2" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-meta-xs text-muted-foreground">h-3 (12px)</span>
        <Progress value={60} className="h-3" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-meta-xs text-muted-foreground">h-4 (16px)</span>
        <Progress value={60} className="h-4" />
      </div>
    </div>
  ),
}
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2 max-w-md">
      <div className="flex justify-between">
        <span className="text-body-s text-muted-foreground">Upload progress</span>
        <span className="text-body-s text-label-m text-foreground">{args.value ?? 0}%</span>
      </div>
      <Progress {...args} />
    </div>
  ),
  args: { value: 75 },
}
export const Animated: Story = {
  render: () => {
    const [value, setValue] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => (prev >= 100 ? 0 : prev + 2))
      }, 50)
      return () => clearInterval(interval)
    }, [])

    return (
      <div className="flex flex-col gap-2 max-w-md">
        <div className="flex justify-between">
          <span className="text-body-s text-muted-foreground">Loading</span>
          <span className="text-body-s text-label-m text-foreground">{value}%</span>
        </div>
        <Progress value={value} />
      </div>
    )
  },
}

/** Cor do preenchimento por token (ex.: força de senha, status). */
export const IndicatorByToken: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Progress value={40} className="h-2 bg-muted" indicatorClassName="bg-destructive" />
      <Progress value={55} className="h-2 bg-muted" indicatorClassName="bg-warning" />
      <Progress value={70} className="h-2 bg-muted" indicatorClassName="bg-brand-lime" />
      <Progress value={90} className="h-2 bg-muted" indicatorClassName="bg-success" />
    </div>
  ),
}
