"use client"

import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Checkbox } from "./checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Componentes/Checkbox",
  component: Checkbox,
  tags: [],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Escala de tamanho",
    },
    checked: {
      control: "boolean",
    },
    indeterminate: {
      control: "boolean",
      description: "Estado de seleção parcial (sobrescreve checked visualmente)",
    },
    hasError: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    label: { control: "text" },
    helperText: { control: "text" },
  },
  args: {
    label: "Label",
    size: "md",
    checked: false,
    indeterminate: false,
    hasError: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>
export const Playground: Story = {}
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small (sm)" />
      <Checkbox size="md" label="Medium (md)" />
      <Checkbox size="lg" label="Large (lg)" />
      <Checkbox size="xl" label="Extra Large (xl)" />
    </div>
  ),
}
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked (default)" defaultChecked={false} />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate defaultChecked={false} />
      <Checkbox label="With error" hasError helperText="Required field" />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled and checked" disabled defaultChecked />
    </div>
  ),
}
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        label={`I accept the terms (${checked ? "checked" : "unchecked"})`}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    )
  },
}
export const WithHelperText: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="Receive email notifications"
        helperText="You can disable this at any time in settings"
      />
      <Checkbox
        label="Required field"
        hasError
        helperText="This field is required"
      />
    </div>
  ),
}
export const NestedSelection: Story = {
  render: () => {
    const [parent, setParent] = useState(false)
    const [children, setChildren] = useState([false, false, false])

    const allChecked = children.every(Boolean)
    const someChecked = children.some(Boolean)

    const handleParent = () => {
      const next = !allChecked
      setParent(next)
      setChildren(children.map(() => next))
    }

    const handleChild = (i: number) => {
      const next = [...children]
      next[i] = !next[i]
      setChildren(next)
      setParent(next.every(Boolean))
    }

    const labels = ["Product A", "Product B", "Product C"]

    return (
      <div className="flex flex-col gap-2">
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={someChecked && !allChecked}
          onChange={handleParent}
        />
        <div className="ml-7 flex flex-col gap-2">
          {labels.map((label, i) => (
            <Checkbox
              key={label}
              label={label}
              checked={children[i]}
              onChange={() => handleChild(i)}
            />
          ))}
        </div>
      </div>
    )
  },
}
export const AcceptanceForm: Story = {
  render: () => {
    const [terms, setTerms] = useState(false)
    const [newsletter, setNewsletter] = useState(false)
    const [sms, setSms] = useState(false)

    return (
      <div className="flex flex-col gap-3 max-w-sm">
        <Checkbox
          label="I accept the Terms and Conditions"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          helperText="Required to continue"
          hasError={!terms}
        />
        <Checkbox
          label="I wish to receive email communications"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          helperText="Promotions, news and exclusive content"
        />
        <Checkbox
          label="I wish to receive SMS with offers"
          checked={sms}
          onChange={(e) => setSms(e.target.checked)}
        />
      </div>
    )
  },
}
