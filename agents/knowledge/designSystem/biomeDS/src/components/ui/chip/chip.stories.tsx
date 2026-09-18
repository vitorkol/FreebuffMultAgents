"use client"

import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import type { IconName } from "../icon"
import { Chip, ChipGroup } from "./chip"

const CHIP_ICONS: Array<IconName | "none"> = [
  "none",
  "heart",
  "star",
  "check",
  "x",
  "tag",
  "filter",
  "circle-check",
  "circle-x",
  "thumbs-up",
  "thumbs-down",
  "bookmark",
  "flag",
  "award",
  "zap",
  "bell",
  "eye",
  "lock",
  "shield",
  "sparkles",
  "plus",
  "minus",
  "arrow-right",
  "chevron-right",
]

const meta: Meta<typeof Chip> = {
  title: "Componentes/Chip",
  component: Chip,
  tags: [],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Escala de tamanho",
    },
    checked: {
      control: "boolean",
      description: "Estado selecionado",
    },
    disabled: {
      control: "boolean",
    },
    label: { control: "text" },
    iconLeft: {
      control: "select",
      options: CHIP_ICONS,
      description: "Ícone à esquerda (nome Lucide em kebab-case)",
    },
    iconRight: {
      control: "select",
      options: CHIP_ICONS,
      description: "Ícone à direita (nome Lucide em kebab-case)",
    },
  },
  args: {
    label: "Filter",
    size: "md",
    checked: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Chip>
export const Playground: Story = {}
export const SimpleChip: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <div className="flex flex-col gap-2">
        <p className="text-body-m text-muted-foreground">
          Click the chip to select/deselect
        </p>
        <small className="text-meta-xs text-muted-foreground block">
          Status: {checked ? "Selected" : "Unselected"}
        </small>
        <Chip {...args} checked={checked} onChange={setChecked} />
      </div>
    )
  },
}
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Chip label="Small" size="sm" />
      <Chip label="Medium" size="md" />
      <Chip label="Large" size="lg" />
    </div>
  ),
}
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Chip label="Unchecked" checked={false} />
      <Chip label="Selected" checked={true} />
      <Chip label="Disabled" disabled />
      <Chip label="Disabled Selected" checked disabled />
    </div>
  ),
}
export const FilterGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])

    const filters = [
      "Medicine",
      "Vitamins",
      "Skincare",
      "Fragrance",
      "Hygiene",
      "Baby",
      "Orthopedics",
    ]

    const toggle = (item: string) => {
      setSelected((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      )
    }

    return (
      <ChipGroup label="Categories">
        {filters.map((f) => (
          <Chip
            key={f}
            label={f}
            checked={selected.includes(f)}
            onChange={() => toggle(f)}
          />
        ))}
      </ChipGroup>
    )
  },
}
export const SingleSelect: Story = {
  render: () => {
    const [selected, setSelected] = useState("All")
    const options = ["All", "Available", "Out of stock", "Discontinued"]

    return (
      <ChipGroup label="Status">
        {options.map((o) => (
          <Chip
            key={o}
            label={o}
            checked={selected === o}
            onChange={() => setSelected(o)}
          />
        ))}
      </ChipGroup>
    )
  },
}
export const WithIcons: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)
    return (
      <div className="flex flex-wrap gap-3">
        <Chip
          label="Favorite"
          checked={checked}
          onChange={setChecked}
          iconLeft="heart"
        />
        <Chip
          label="Active filter"
          checked
          iconRight="x"
        />
      </div>
    )
  },
}
