import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

import { Spinner } from "./spinner"
import { Button } from "../button"

const meta: Meta<typeof Spinner> = {
  title: "Componentes/Spinner",
  component: Spinner,
  tags: [],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Escala de diâmetro",
    },
    label: {
      control: "text",
      description: "Rótulo acessível anunciado por leitores de tela",
    },
  },
  args: {
    size: "md",
    label: "Loading...",
  },
}

export default meta
type Story = StoryObj<typeof Spinner>
export const Playground: Story = {}
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xs" />
        <span className="text-meta-xs text-muted-foreground">xs — 12px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-meta-xs text-muted-foreground">sm — 16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-meta-xs text-muted-foreground">md — 20px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-meta-xs text-muted-foreground">lg — 24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <span className="text-meta-xs text-muted-foreground">xl — 32px</span>
      </div>
    </div>
  ),
}
export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-center">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" className="text-primary" />
        <span className="text-meta-xs text-muted-foreground">primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" className="text-brand-green" />
        <span className="text-meta-xs text-muted-foreground">brand-green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" className="text-destructive" />
        <span className="text-meta-xs text-muted-foreground">destructive</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" className="text-muted-foreground" />
        <span className="text-meta-xs text-muted-foreground">muted</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg bg-primary p-3">
        <Spinner size="lg" className="text-text-inverse" />
        <span className="text-meta-xs text-text-inverse">white / on dark</span>
      </div>
    </div>
  ),
}
export const InButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button loading>Loading</Button>
      <Button variant="secondary" loading>Searching...</Button>
      <Button variant="outline" loading>Sending</Button>
      <Button variant="danger" loading>Processing</Button>
    </div>
  ),
}
export const LoadingInline: Story = {
  name: "Loading Inline",
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      {/* Inline inside text */}
      <p className="flex items-center gap-2 text-body-m text-muted-foreground">
        <Spinner size="xs" />
        Verifying document...
      </p>

      {/* Centered loading state */}
      <div className="flex flex-col items-center gap-3 py-8">
        <Spinner size="xl" className="text-brand-green" />
        <p className="text-body-m text-muted-foreground">Loading records...</p>
      </div>

      {/* Card loading overlay */}
      <div className="relative rounded-lg border p-6 flex items-center justify-center min-h-24 bg-muted">
        <div className="flex flex-col items-center gap-2">
          <Spinner size="lg" />
          <small className="text-meta-xs text-muted-foreground">Fetching data</small>
        </div>
      </div>
    </div>
  ),
}
export const ProductContext: Story = {
  name: "Real-world Context",
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <div>
        <p className="mb-3 text-label-s text-muted-foreground uppercase">
          Search form
        </p>
        <Button className="bg-brand-green hover:bg-brand-green-light text-text-inverse px-8 h-12 flex items-center gap-2 text-heading-xs">
          <Spinner size="sm" className="text-text-inverse" />
          Searching...
        </Button>
      </div>

      <div>
        <p className="mb-3 text-label-s text-muted-foreground uppercase">
          Evaluation form
        </p>
        <Button className="bg-brand-green hover:bg-brand-green-light text-text-inverse flex items-center gap-2">
          <Spinner size="sm" className="text-text-inverse" />
          Submitting...
        </Button>
      </div>

      <div>
        <p className="mb-3 text-label-s text-muted-foreground uppercase">
          Document verification
        </p>
        <p className="flex items-center gap-2 text-body-m text-muted-foreground">
          <Spinner size="sm" />
          Verifying document...
        </p>
      </div>
    </div>
  ),
}
