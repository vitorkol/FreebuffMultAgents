import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { getIconNames } from "../../../icons/icon-registry"
import type { IconName } from "../../../icons/icon-registry"

const ICON_PICKER_NONE = "__none__" as const

/** Lista completa de ícones do registro Biome (Lucide), para os controles de Storybook. */
const REGISTRY_ICONS_SORTED: IconName[] = [...getIconNames()].sort((a, b) =>
  a.localeCompare(b),
)

/** Inclui entrada “nenhum” para o Playground mapear para `undefined`. */
const ICON_CONTROL_OPTIONS: Array<typeof ICON_PICKER_NONE | IconName> = [
  ICON_PICKER_NONE,
  ...REGISTRY_ICONS_SORTED,
]

function pickIcon(
  value: (typeof ICON_CONTROL_OPTIONS)[number] | undefined,
): IconName | undefined {
  if (value == null || value === ICON_PICKER_NONE) {
    return undefined
  }
  return value
}

const meta: Meta<typeof Button> = {
  title: "Componentes/Button",
  component: Button,
  tags: [],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "danger", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "icon-sm", "icon-md", "icon-lg", "icon-xl"],
    },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
    centerIcon: {
      control: "select",
      options: ICON_CONTROL_OPTIONS,
      description:
        "Botão só ícone (central). Mesmos nomes que o registro Biome (`IconName` / `getIconNames`).",
    },
    iconLeft: {
      control: "select",
      options: ICON_CONTROL_OPTIONS,
      description: "Ícone à esquerda — mesmos nomes que `IconName` / `getIconNames`.",
    },
    iconRight: {
      control: "select",
      options: ICON_CONTROL_OPTIONS,
      description: "Ícone à direita — mesmos nomes que `IconName` / `getIconNames`.",
    },
    asChild: { table: { disable: true } },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    fullWidth: false,
    loading: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const { centerIcon, iconLeft, iconRight, children, ...rest } = args
    const i = pickIcon(centerIcon as (typeof ICON_CONTROL_OPTIONS)[number] | undefined)
    const il = pickIcon(iconLeft as (typeof ICON_CONTROL_OPTIONS)[number] | undefined)
    const ir = pickIcon(iconRight as (typeof ICON_CONTROL_OPTIONS)[number] | undefined)

    return (
      <Button
        {...rest}
        {...(i != null ? { centerIcon: i } : {})}
        {...(il != null ? { iconLeft: il } : {})}
        {...(ir != null ? { iconRight: ir } : {})}
      >
        {children}
      </Button>
    )
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-end">
      <Button size="sm">Small (sm)</Button>
      <Button size="md">Medium (md)</Button>
      <Button size="lg">Large (lg)</Button>
      <Button size="xl">Extra Large (xl)</Button>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button loading>Loading</Button>
      <Button variant="secondary" loading>Loading</Button>
      <Button variant="outline" loading>Loading</Button>
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-end">
      <Button variant="ghost" size="icon-sm" aria-label="Pequeno" centerIcon="sun" />
      <Button variant="ghost" size="icon-md" aria-label="Médio" centerIcon="sun" />
      <Button variant="ghost" size="icon-lg" aria-label="Grande" centerIcon="sun" />
      <Button variant="ghost" size="icon-xl" aria-label="Extra" centerIcon="sun" />
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button iconLeft="search">
        Search
      </Button>
      <Button iconRight="arrow-right">
        Next
      </Button>
      <Button iconLeft="download" iconRight="chevron-down">
        Download
      </Button>
      <Button variant="danger" iconLeft="trash-2">
        Delete
      </Button>
      <Button variant="ghost" iconLeft="pencil">
        Edit
      </Button>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Button fullWidth>Full width</Button>
      <Button fullWidth variant="secondary">Full width secondary</Button>
      <Button fullWidth variant="outline">Full width outline</Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button disabled>Disabled</Button>
      <Button disabled variant="secondary">Disabled</Button>
      <Button disabled variant="outline">Disabled</Button>
    </div>
  ),
}

export const AsChild: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button asChild>
        <a href="https://example.com">Link as Button</a>
      </Button>
      <Button asChild variant="secondary">
        <a href="https://example.com">Secondary link</a>
      </Button>
      <Button asChild variant="ghost">
        <a href="https://example.com">Ghost link</a>
      </Button>
    </div>
  ),
}

export const SizeVariantGrid: Story = {
  render: () => {
    const sizes = ["sm", "md", "lg", "xl"] as const
    const variants = ["primary", "secondary", "ghost", "outline", "danger"] as const
    return (
      <div className="overflow-x-auto">
        <table className="border-collapse text-body-s">
          <thead>
            <tr>
              <th className="p-2 text-left text-label-s text-muted-foreground">Variant / Size</th>
              {sizes.map((s) => (
                <th key={s} className="p-2 text-center text-label-s text-muted-foreground">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variants.map((v) => (
              <tr key={v}>
                <td className="p-2 text-muted-foreground capitalize">{v}</td>
                {sizes.map((s) => (
                  <td key={s} className="p-2">
                    <Button variant={v} size={s}>Label</Button>
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
