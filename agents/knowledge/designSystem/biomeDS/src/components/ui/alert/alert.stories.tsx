import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import type { IconName } from "../icon"

import { Alert } from "./alert"

const ALERT_ICONS: Array<IconName | "none"> = [
  "none",
  "circle-check",
  "triangle-alert",
  "info",
  "circle-x",
  "lightbulb",
  "shield",
  "rocket",
  "sparkles",
  "zap",
  "bell",
  "star",
  "heart",
  "flag",
  "megaphone",
  "siren",
  "lock",
  "eye",
  "clock",
  "check",
]

const meta: Meta<typeof Alert> = {
  title: "Componentes/Alert",
  component: Alert,
  tags: [],
  argTypes: {
    intent: {
      control: "select",
      options: ["success", "warning", "info", "destructive", "neutral"],
      description: "Intenção semântica — define cores e ícone padrão",
    },
    title: {
      control: "text",
      description: "Rótulo em negrito exibido acima da descrição",
    },
    icon: {
      control: "select",
      options: ALERT_ICONS,
      description: "Substitui o ícone padrão da intenção (nome Lucide). Selecione 'none' para ocultar.",
    },
    onDismiss: {
      description: "Quando fornecido, renderiza um botão de dispensar (x)",
    },
  },
  args: {
    intent: "info",
    title: "Alert title",
    children: "This is the alert body with additional information for the user.",
  },
}

export default meta
type Story = StoryObj<typeof Alert>
export const Playground: Story = {}
export const Intents: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <Alert intent="success" title="Operation completed">
        Your request has been registered successfully. Protocol generated.
      </Alert>
      <Alert intent="warning" title="Attention">
        By reopening the service request, a new protocol will be generated and your request will return for review.
      </Alert>
      <Alert intent="info" title="Information">
        Use the same email provided when registering your request to find your service records.
      </Alert>
      <Alert intent="destructive" title="Error processing">
        Unable to send your evaluation. Please try again in a few moments.
      </Alert>
      <Alert intent="neutral" title="Note">
        This field is optional and can be filled in at any time.
      </Alert>
    </div>
  ),
}
export const WithoutTitle: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <Alert intent="success">Service request completed successfully.</Alert>
      <Alert intent="warning">Attention: verify the data before confirming.</Alert>
      <Alert intent="info">Your protocol has been sent to the registered email.</Alert>
      <Alert intent="destructive">CPF not found. Please verify and try again.</Alert>
    </div>
  ),
}
export const WithoutIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <Alert intent="info" icon={null} title="Alert without icon">
        Sometimes the icon is not necessary for simpler contexts.
      </Alert>
      <Alert intent="warning" icon={null}>
        Warning message without icon for compact contexts.
      </Alert>
    </div>
  ),
}
export const WithCustomIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <Alert
        intent="info"
        title="Tip"
        icon="lightbulb"
      >
        Use the same email provided when registering your request.
      </Alert>
    </div>
  ),
}
export const Dismissible: Story = {
  render: () => {
    const [alerts, setAlerts] = useState({
      success: true,
      warning: true,
      info: true,
      destructive: true,
    })

    const dismiss = (key: keyof typeof alerts) =>
      setAlerts((prev) => ({ ...prev, [key]: false }))

    return (
      <div className="flex flex-col gap-3 max-w-xl">
        {alerts.success && (
          <Alert intent="success" title="Successfully sent" onDismiss={() => dismiss("success")}>
            Your evaluation has been registered.
          </Alert>
        )}
        {alerts.warning && (
          <Alert intent="warning" title="Deadline approaching" onDismiss={() => dismiss("warning")}>
            The response deadline for this service request is tomorrow.
          </Alert>
        )}
        {alerts.info && (
          <Alert intent="info" onDismiss={() => dismiss("info")}>
            New feature available: track your protocols in real time.
          </Alert>
        )}
        {alerts.destructive && (
          <Alert intent="destructive" title="Request failed" onDismiss={() => dismiss("destructive")}>
            Unable to load service records. Check your connection.
          </Alert>
        )}
        {Object.values(alerts).every((v) => !v) && (
          <p className="text-body-m text-muted-foreground italic">All alerts have been dismissed.</p>
        )}
      </div>
    )
  },
}
export const ProductContext: Story = {
  name: "Real Context — Produto consumidor",
  render: () => (
    <div className="flex flex-col gap-6 max-w-xl">
      <div>
        <p className="mb-2 text-label-s text-muted-foreground uppercase">
          Service reopening
        </p>
        <Alert intent="warning" title="Attention">
          By reopening this service request, you are indicating that the response did not address
          your needs. A new protocol will be generated and your request will return for review.
        </Alert>
      </div>

      <div>
        <p className="mb-2 text-label-s text-muted-foreground uppercase">
          Request registered
        </p>
        <Alert intent="success" title="Request sent successfully!">
          Your protocol has been generated. Keep this number to track the status of your service request.
        </Alert>
      </div>

      <div>
        <p className="mb-2 text-label-s text-muted-foreground uppercase">
          Search tip
        </p>
        <Alert intent="info" title="Tip">
          Use the same email provided when registering your request to find your service records.
        </Alert>
      </div>

      <div>
        <p className="mb-2 text-label-s text-muted-foreground uppercase">
          Authentication error
        </p>
        <Alert intent="destructive" title="CPF not found">
          Please verify that the CPF provided is correct or register to continue.
        </Alert>
      </div>
    </div>
  ),
}
