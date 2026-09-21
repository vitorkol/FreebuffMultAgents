import type { Meta, StoryObj } from "@storybook/react"
import { Icon } from "../icon"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb"

const meta: Meta<typeof Breadcrumb> = {
  title: "Componentes/Breadcrumb",
  component: Breadcrumb,
  tags: [],
}

export default meta
type Story = StoryObj<typeof Breadcrumb>
export const Playground: Story = {
  args: {
    items: [
      { id: "home", label: "Home", href: "/" },
      { id: "components", label: "Components", href: "/components" },
      { id: "breadcrumb", label: "Breadcrumb", current: true },
    ],
  },
}
export const WithEllipsis: Story = {
  args: {
    items: [
      { id: "home", label: "Home", href: "/" },
      { id: "ellipsis", label: "...", ellipsis: true },
      { id: "components", label: "Components", href: "/components" },
      { id: "breadcrumb", label: "Breadcrumb", current: true },
    ],
  },
}
export const CustomSeparator: Story = {
  args: {
    items: [
      { id: "home", label: "Home", href: "/" },
      { id: "components", label: "Components", href: "/components" },
      { id: "breadcrumb", label: "Breadcrumb", current: true },
    ],
    separator: <Icon name="slash" size="sm" aria-hidden />,
  },
}

export const ComposicaoAvancada: Story = {
  name: "Composição avançada (escape hatch)",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}
