"use client"

import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Switch } from "./switch"

const meta: Meta<typeof Switch> = {
  title: "Componentes/Switch",
  component: Switch,
  argTypes: {
    checked: {
      control: "boolean",
      description: "Estado ativo do switch",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita a interação",
    },
  },
  args: {
    checked: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Switch>
export const Playground: Story = {}
export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-3 cursor-pointer text-label-m text-foreground">
      <Switch defaultChecked />
      <span className="text-label-m text-foreground">
        Enable notifications
      </span>
    </label>
  ),
}
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-3 cursor-not-allowed opacity-50 text-label-m text-foreground">
        <Switch disabled />
        <span className="text-label-m text-foreground">
          Disabled (unchecked)
        </span>
      </label>
      <label className="flex items-center gap-3 cursor-not-allowed opacity-50 text-label-m text-foreground">
        <Switch disabled defaultChecked />
        <span className="text-label-m text-foreground">
          Disabled (checked)
        </span>
      </label>
    </div>
  ),
}
export const FormExample: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true)
    const [marketing, setMarketing] = useState(false)
    const [security, setSecurity] = useState(true)

    return (
      <div className="flex flex-col gap-6 max-w-sm rounded-lg border border-border bg-card p-6">
        <h3 className="text-heading-m text-foreground">Settings</h3>
        <div className="flex flex-col gap-4">
          <label className="flex items-center justify-between gap-4 cursor-pointer text-label-m text-foreground">
            <div>
              <span className="text-label-m text-foreground block">
                Push notifications
              </span>
              <span className="text-body-s text-muted-foreground">
                Receive alerts about your account activity
              </span>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </label>
          <label className="flex items-center justify-between gap-4 cursor-pointer text-label-m text-foreground">
            <div>
              <span className="text-label-m text-foreground block">
                Marketing emails
              </span>
              <span className="text-body-s text-muted-foreground">
                Receive news, offers and product updates
              </span>
            </div>
            <Switch checked={marketing} onCheckedChange={setMarketing} />
          </label>
          <label className="flex items-center justify-between gap-4 cursor-pointer text-label-m text-foreground">
            <div>
              <span className="text-label-m text-foreground block">
                Security alerts
              </span>
              <span className="text-body-s text-muted-foreground">
                Get notified about login attempts and password changes
              </span>
            </div>
            <Switch checked={security} onCheckedChange={setSecurity} />
          </label>
        </div>
      </div>
    )
  },
}
