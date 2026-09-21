import type { Meta, StoryObj } from "@storybook/react"
import type { IconName } from "../icon"
import { Badge } from "./badge"

const BADGE_ICONS: Array<IconName | "none"> = [
  "none",
  "check",
  "x",
  "circle-check",
  "circle-x",
  "triangle-alert",
  "info",
  "star",
  "heart",
  "bell",
  "shield",
  "zap",
  "award",
  "flag",
  "bookmark",
  "tag",
  "lock",
  "eye",
  "sparkles",
  "rocket",
  "clock",
  "thumbs-up",
  "thumbs-down",
]

const meta: Meta<typeof Badge> = {
  title: "Componentes/Badge",
  component: Badge,
  tags: [],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "neutral",
        "success",
        "warning",
        "danger",
        "info",
        "on-sale",
        "new",
        "promo",
      ],
      description: "Significado visual / semântico",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Escala de tamanho",
    },
    dot: {
      control: "boolean",
      description: "Exibe ponto de status antes do rótulo",
    },
    icon: {
      control: "select",
      options: BADGE_ICONS,
      description: "Ícone inicial (nome Lucide em kebab-case)",
    },
  },
  args: {
    children: "Badge",
    variant: "neutral",
    size: "sm",
    dot: false,
  },
}

export default meta
type Story = StoryObj<typeof Badge>
export const Playground: Story = {}
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="on-sale">On Sale</Badge>
      <Badge variant="new">New</Badge>
      <Badge variant="promo">Promo</Badge>
    </div>
  ),
}
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="primary" size="xs">XS</Badge>
      <Badge variant="primary" size="sm">SM</Badge>
      <Badge variant="primary" size="md">MD</Badge>
      <Badge variant="primary" size="lg">LG</Badge>
    </div>
  ),
}
export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="danger" dot>Offline</Badge>
      <Badge variant="neutral" dot>Inactive</Badge>
    </div>
  ),
}
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="success" icon="check">
        Approved
      </Badge>
      <Badge variant="danger" icon="x">
        Rejected
      </Badge>
      <Badge variant="warning" icon="triangle-alert">
        Warning
      </Badge>
    </div>
  ),
}
export const Dismissible: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-2 items-center">
        <Badge variant="primary" onDismiss={() => alert("removed")}>
          React
        </Badge>
        <Badge variant="secondary" onDismiss={() => alert("removed")}>
          TypeScript
        </Badge>
        <Badge variant="neutral" onDismiss={() => alert("removed")}>
          Tailwind CSS
        </Badge>
      </div>
    )
  },
}
export const ProductContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Badge variant="on-sale" size="sm">-30%</Badge>
        <Badge variant="new" size="sm">New</Badge>
        <Badge variant="promo" size="sm">Exclusive</Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="success" dot>In stock</Badge>
        <Badge variant="warning" dot>Last units</Badge>
        <Badge variant="danger" dot>Out of stock</Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="neutral" size="xs">Generic</Badge>
        <Badge variant="neutral" size="xs">Similar</Badge>
        <Badge variant="neutral" size="xs">Reference</Badge>
      </div>
    </div>
  ),
}
export const StatusVariants: Story = {
  name: "Status Variants (surface tokens)",
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-body-m text-muted-foreground">
        Status variants now use CSS variable surface tokens — dark mode works automatically.
      </p>
      <div className="flex flex-wrap gap-2 items-center">
        <Badge variant="success">Completed</Badge>
        <Badge variant="warning">In Progress</Badge>
        <Badge variant="info">Awaiting</Badge>
        <Badge variant="danger">Cancelled</Badge>
        <Badge variant="neutral">Unknown</Badge>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <Badge variant="success" dot>Completed</Badge>
        <Badge variant="warning" dot>In Progress</Badge>
        <Badge variant="info" dot>Awaiting</Badge>
        <Badge variant="danger" dot>Cancelled</Badge>
        <Badge variant="neutral" dot>Unknown</Badge>
      </div>
    </div>
  ),
}
