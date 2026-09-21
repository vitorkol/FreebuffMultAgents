import type { Meta, StoryObj } from "@storybook/react"
import { Icon, type IconName, ICON_SIZE_PRESETS } from "./icon"
import React from "react"

const ICON_NAMES: IconName[] = [
  "arrow-right", "arrow-left", "arrow-up", "arrow-down",
  "chevron-right", "chevron-left", "chevron-up", "chevron-down",
  "chevrons-right", "chevrons-left",
  "move-right", "move-left",
  "corner-down-right", "external-link", "undo-2", "redo-2",

  "search", "plus", "minus", "check", "x",
  "pencil", "trash-2", "copy", "clipboard",
  "save", "download", "upload", "share-2", "printer",
  "refresh-cw", "rotate-ccw", "send", "log-in", "log-out",
  "maximize-2", "minimize-2", "expand", "shrink",

  "mail", "message-square", "message-circle", "phone", "video",
  "bell", "bell-off", "megaphone", "at-sign",

  "image", "camera", "film", "music", "file", "file-text",
  "folder", "folder-open", "archive", "package",

  "user", "users", "user-plus", "user-check", "circle-user",
  "contact", "user-round",

  "circle-check", "circle-x", "circle-alert", "triangle-alert",
  "info", "circle-help", "lightbulb", "siren",
  "thumbs-up", "thumbs-down", "flag", "bookmark",

  "heart", "star", "zap", "sparkles", "flame",
  "award", "trophy", "crown", "gift", "rocket",
  "shield", "lock", "lock-open", "key", "eye", "eye-off",

  "settings", "sliders-horizontal", "filter", "arrow-up-narrow-wide",
  "layout-grid", "layout-list", "columns-3", "rows-3",
  "menu", "ellipsis", "ellipsis-vertical", "grip-vertical",

  "calendar", "clock", "timer", "map-pin", "globe",
  "credit-card", "wallet", "shopping-cart", "shopping-bag",
  "tag", "hash", "chart-bar", "trending-up",
  "database", "server", "cloud", "cloud-off", "wifi", "wifi-off",

  "sun", "moon", "cloud-sun", "snowflake", "droplets",
  "leaf", "trees",

  "link", "paperclip", "scissors", "wrench", "code",
  "terminal", "bug", "circle-dot", "square", "circle",
  "inbox", "layers", "palette", "puzzle", "target",
  "house", "building-2", "map", "compass", "signpost",
]

const meta: Meta<typeof Icon> = {
  title: "Componentes/Icon",
  component: Icon,
  tags: [],
  args: {
    name: "heart",
    size: "md",
    strokeWidth: 2,
  },
  argTypes: {
    name: {
      control: "select",
      options: ICON_NAMES,
      description: "Nome do ícone Lucide em kebab-case",
    },
    size: {
      control: "select",
      options: [...ICON_SIZE_PRESETS],
    },
    strokeWidth: { control: { type: "number", min: 0.5, max: 3, step: 0.5 } },
    color: { control: "color" },
    className: { control: "text" },
    "aria-label": { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      {ICON_SIZE_PRESETS.map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Icon name="heart" size={s} />
          <span className="text-meta-xs text-muted-foreground">{s}</span>
        </div>
      ))}
    </div>
  ),
}

export const NumericSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {[12, 16, 20, 24, 32, 48].map((px) => (
        <div key={px} className="flex flex-col items-center gap-2">
          <Icon name="heart" size={px} />
          <span className="text-meta-xs text-muted-foreground">{px}px</span>
        </div>
      ))}
    </div>
  ),
}

export const StrokeWidths: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {[1, 2].map((sw) => (
        <div key={sw} className="flex flex-col items-center gap-2">
          <Icon name="heart" size="lg" strokeWidth={sw} />
          <span className="text-meta-xs text-muted-foreground">{sw}</span>
        </div>
      ))}
    </div>
  ),
}

export const WithColor: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="heart" className="text-destructive" />
      <Icon name="circle-check" className="text-success" />
      <Icon name="triangle-alert" className="text-warning" />
      <Icon name="bell" className="text-info" />
      <Icon name="settings" className="text-muted-foreground" />
    </div>
  ),
}

export const CommonIcons: Story = {
  render: () => {
    const icons: IconName[] = [
      "search", "house", "settings", "mail", "bell",
      "heart", "star", "arrow-right", "circle-check", "trash-2",
    ]
    return (
      <div className="flex flex-wrap gap-3">
        {icons.map((name) => (
          <div key={name} className="flex min-w-20 flex-col items-center gap-1 rounded-md border p-3">
            <Icon name={name} size="lg" />
            <span className="text-meta-2xs text-muted-foreground">{name}</span>
          </div>
        ))}
      </div>
    )
  },
}

export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Icon name="triangle-alert" aria-label="Aviso importante" className="text-warning" />
        <span>Ícone semântico — aria-label + role=&quot;img&quot;</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="search" />
        <span>Ícone decorativo — aria-hidden automático</span>
      </div>
    </div>
  ),
}
