import type { Meta, StoryObj } from "@storybook/react"
import type { IconName } from "../icon"

import { EmptyState } from "./empty-state"
import { Button } from "../button"

const EMPTY_STATE_ICONS: Array<IconName | "none"> = [
  "none",
  "inbox",
  "search",
  "bell",
  "file-x",
  "package",
  "folder-open",
  "image",
  "message-square",
  "users",
  "calendar",
  "clipboard",
  "database",
  "cloud-off",
  "wifi-off",
  "lock",
  "shield",
  "settings",
  "archive",
  "trash-2",
  "heart",
  "star",
  "map-pin",
  "globe",
]

const meta: Meta<typeof EmptyState> = {
  title: "Componentes/EmptyState",
  component: EmptyState,
  tags: [],
  argTypes: {
    icon: {
      control: "select",
      options: EMPTY_STATE_ICONS,
      description: "Ícone ilustrativo (nome Lucide em kebab-case)",
    },
    title: {
      control: "text",
      description: "Texto do título principal",
    },
    description: {
      control: "text",
      description: "Texto descritivo abaixo do título",
    },
  },
  args: {
    icon: "inbox",
    title: "No messages yet",
    description:
      "When you receive messages, they will appear here. Start a conversation to get going.",
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Playground: Story = {}

export const WithAction: Story = {
  args: {
    icon: "inbox",
    title: "Your inbox is empty",
    description:
      "Create your first item to get started. You can add more anytime.",
    action: (
      <Button>
        Create item
      </Button>
    ),
  },
}

export const SearchNoResults: Story = {
  args: {
    icon: "search",
    title: "No results found",
    description:
      "Try adjusting your search or filters to find what you're looking for.",
    action: (
      <Button variant="outline">
        Clear filters
      </Button>
    ),
  },
}

export const NoNotifications: Story = {
  args: {
    icon: "bell",
    title: "No notifications",
    description:
      "You're all caught up. We'll notify you when something new arrives.",
  },
}
