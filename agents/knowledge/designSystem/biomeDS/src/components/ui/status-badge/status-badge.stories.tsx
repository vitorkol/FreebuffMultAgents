import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import type { IconName } from "../icon"

import { StatusBadge } from "./status-badge"

const STATUS_BADGE_ICONS: Array<IconName | "none"> = [
  "none",
  "circle-check",
  "circle-x",
  "triangle-alert",
  "info",
  "clock",
  "eye",
  "shield",
  "lock",
  "check",
  "x",
  "star",
  "bell",
  "flag",
  "zap",
  "rocket",
  "sparkles",
  "award",
  "user",
  "settings",
]

const meta: Meta<typeof StatusBadge> = {
  title: "Componentes/StatusBadge",
  component: StatusBadge,
  tags: [],
  argTypes: {
    intent: {
      control: "select",
      options: ["success", "warning", "info", "destructive", "neutral"],
      description: "Intenção de status semântico — define cor e ícone padrão",
    },
    label: {
      control: "text",
      description: "Texto exibido dentro do badge",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Escala de tamanho",
    },
    showIcon: {
      control: "boolean",
      description: "Alterna a exibição do ícone inicial",
    },
    icon: {
      control: "select",
      options: STATUS_BADGE_ICONS,
      description: "Substitui o ícone padrão da intenção (nome Lucide em kebab-case)",
    },
  },
  args: {
    intent: "info",
    label: "In Progress",
    size: "sm",
    showIcon: true,
  },
}

export default meta
type Story = StoryObj<typeof StatusBadge>
export const Playground: Story = {}
export const Intents: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <StatusBadge intent="success"     label="Completed" />
      <StatusBadge intent="warning"     label="In Progress" />
      <StatusBadge intent="info"        label="Pending" />
      <StatusBadge intent="destructive" label="Cancelled" />
      <StatusBadge intent="neutral"     label="Unknown" />
    </div>
  ),
}
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <StatusBadge intent="success" label="Completed" size="xs" />
      <StatusBadge intent="success" label="Completed" size="sm" />
      <StatusBadge intent="success" label="Completed" size="md" />
      <StatusBadge intent="success" label="Completed" size="lg" />
    </div>
  ),
}
export const WithoutIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <StatusBadge intent="success"     label="Completed"   showIcon={false} />
      <StatusBadge intent="warning"     label="Pending"    showIcon={false} />
      <StatusBadge intent="info"        label="Active"     showIcon={false} />
      <StatusBadge intent="destructive" label="Cancelled"  showIcon={false} />
      <StatusBadge intent="neutral"     label="Undefined"  showIcon={false} />
    </div>
  ),
}
export const WithCustomIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <StatusBadge
        intent="warning"
        label="In Progress"
        icon="clock"
      />
      <StatusBadge
        intent="info"
        label="Awaiting Review"
        icon="eye"
      />
    </div>
  ),
}
export const ServiceContext: Story = {
  name: "Real-world — Service List",
  render: () => {
    const attendances = [
      { id: "#2024-001", subject: "Certificate request",     status: "Completed",     intent: "success"     as const },
      { id: "#2024-002", subject: "Administrative appeal",   status: "In Progress",   intent: "warning"     as const },
      { id: "#2024-003", subject: "Technical consultation",  status: "Pending",      intent: "info"        as const },
      { id: "#2024-004", subject: "Environmental complaint", status: "Cancelled",     intent: "destructive" as const },
      { id: "#2024-005", subject: "Inspection request",      status: "Under review", intent: "neutral"     as const },
    ]

    return (
      <div className="flex flex-col gap-2 max-w-lg">
        {attendances.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between rounded-xl border border-border p-4 hover:border-brand-green transition-colors"
          >
            <div>
              <p className="text-body-m text-foreground">
                <strong>{a.id}</strong>
              </p>
              <small className="text-meta-xs text-muted-foreground mt-1 block">{a.subject}</small>
            </div>
            <StatusBadge intent={a.intent} label={a.status} />
          </div>
        ))}
      </div>
    )
  },
}
export const Grade: Story = {
  name: "Intent x Size Grid",
  render: () => {
    const intents = ["success", "warning", "info", "destructive", "neutral"] as const
    const sizes   = ["xs", "sm", "md", "lg"] as const

    return (
      <div className="overflow-x-auto">
        <table className="border-collapse text-body-s">
          <thead>
            <tr>
              <th className="p-2 text-left text-label-s text-muted-foreground">Intent / Size</th>
              {sizes.map((s) => (
                <th key={s} className="p-2 text-center text-label-s text-muted-foreground">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {intents.map((intent) => (
              <tr key={intent}>
                <td className="p-2 text-muted-foreground capitalize">{intent}</td>
                {sizes.map((size) => (
                  <td key={size} className="p-2">
                    <StatusBadge intent={intent} label="Status" size={size} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
}
