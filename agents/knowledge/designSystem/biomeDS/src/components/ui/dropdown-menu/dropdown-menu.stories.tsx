import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Button } from "../button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu"

const meta: Meta<typeof DropdownMenu> = {
  title: "Componentes/DropdownMenu",
  component: DropdownMenu,
  tags: [],
}

export default meta

type Story = StoryObj<typeof DropdownMenu>
export const Playground: Story = {
  args: {
    trigger: <Button variant="outline">Open Menu</Button>,
    label: "My Account",
    items: [
      { id: "profile", label: "Profile", icon: "user" },
      { id: "settings", label: "Settings", icon: "settings" },
      { id: "logout", label: "Logout", icon: "log-out", destructive: true, separatorBefore: true },
    ],
  },
}

export const ComposicaoAvancada: Story = {
  name: "Composição avançada (escape hatch)",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
export const WithShortcuts: Story = {
  args: {
    trigger: <Button variant="outline">Open Menu</Button>,
    label: "My Account",
    items: [
      { id: "profile", label: "Profile", shortcut: "⇧⌘P" },
      { id: "settings", label: "Settings", shortcut: "⌘S" },
      { id: "logout", label: "Logout", shortcut: "⇧⌘Q", separatorBefore: true },
    ],
  },
}
export const WithCheckboxes: Story = {
  render: function WithCheckboxesStory() {
    const [showStatusBar, setShowStatusBar] = React.useState(true)
    const [showPanel, setShowPanel] = React.useState(false)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}
