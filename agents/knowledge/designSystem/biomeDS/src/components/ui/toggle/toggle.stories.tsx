"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "./toggle"
import { Icon } from "../icon"

const meta: Meta<typeof Toggle> = {
  title: "Componentes/Toggle",
  component: Toggle,
  tags: [],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "Estilo visual do toggle",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "Escala de tamanho",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita a interação",
    },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>
export const Playground: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold">
        <Icon name="bold" size="sm" aria-hidden />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Icon name="italic" size="sm" aria-hidden />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Icon name="underline" size="sm" aria-hidden />
      </Toggle>
    </div>
  ),
}
export const Outline: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle variant="outline" aria-label="Toggle bold">
        <Icon name="bold" size="sm" aria-hidden />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic">
        <Icon name="italic" size="sm" aria-hidden />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle underline">
        <Icon name="underline" size="sm" aria-hidden />
      </Toggle>
    </div>
  ),
}
export const WithText: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold">
        <Icon name="bold" size="sm" aria-hidden />
        Bold
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Icon name="italic" size="sm" aria-hidden />
        Italic
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Icon name="underline" size="sm" aria-hidden />
        Underline
      </Toggle>
    </div>
  ),
}
export const Disabled: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle disabled aria-label="Toggle bold">
        <Icon name="bold" size="sm" aria-hidden />
      </Toggle>
      <Toggle disabled aria-label="Toggle italic">
        <Icon name="italic" size="sm" aria-hidden />
      </Toggle>
      <Toggle disabled aria-label="Toggle underline">
        <Icon name="underline" size="sm" aria-hidden />
      </Toggle>
    </div>
  ),
}
