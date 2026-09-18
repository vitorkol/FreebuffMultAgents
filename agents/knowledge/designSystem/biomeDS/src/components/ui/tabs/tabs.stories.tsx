import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"
import { Icon } from "../icon"

const meta: Meta<typeof Tabs> = {
  title: "Componentes/Tabs",
  component: Tabs,
  args: {
    className: "w-full max-w-md",
    items: [
      {
        value: "account",
        label: "Visão geral",
        content:
          "Informações gerais da reunião.",
      },
      {
        value: "documents",
        label: "Documentos",
        count: 4,
        content:
          "Documentos vinculados à pauta.",
      },
      {
        value: "history",
        label: "Histórico",
        content: "Histórico de alterações da reunião.",
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Tabs>
export const Playground: Story = {}

export const WithIcons: Story = {
  args: {
    items: [
      {
        value: "overview",
        label: "Visão geral",
        icon: "layout-list",
        content:
          "Informações gerais da reunião.",
      },
      {
        value: "documents",
        label: "Documentos",
        icon: "file-text",
        count: 4,
        content:
          "Documentos vinculados à pauta.",
      },
      {
        value: "history",
        label: "Histórico",
        icon: "history",
        content: "Histórico de alterações da reunião.",
      },
    ],
  },
}

export const Disabled: Story = {
  args: {
    items: [
      {
        value: "account",
        label: "Account",
        content:
          "Make changes to your account here. Click save when you're done.",
      },
      {
        value: "password",
        label: "Password",
        disabled: true,
        content:
          "Change your password here. After saving, you'll be logged out.",
      },
      {
        value: "notifications",
        label: "Notifications",
        content: "Manage how you receive notifications and alerts.",
      },
    ],
  },
}

export const ComposicaoAvancada: Story = {
  name: "Composição avançada (escape hatch)",
  render: () => (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="account" className="gap-2">
          <Icon name="user" size="sm" aria-hidden />
          Account
        </TabsTrigger>
        <TabsTrigger value="password" className="gap-2">
          <Icon name="lock" size="sm" aria-hidden />
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-body-m text-muted-foreground">Exemplo de uso composicional para casos avançados.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-body-m text-muted-foreground">No uso padrão, prefira `items`.</p>
      </TabsContent>
    </Tabs>
  ),
}
