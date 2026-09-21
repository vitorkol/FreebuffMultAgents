import type { Meta, StoryObj } from "@storybook/react"
import type { IconName } from "../icon"
import {
  Select,
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

const SELECT_ICONS: Array<IconName | "none"> = [
  "none",
  "search",
  "mail",
  "user",
  "building",
  "map-pin",
  "globe",
  "filter",
  "chevron-right",
]

const meta: Meta<typeof Select> = {
  title: "Componentes/Select",
  component: Select,
  tags: [],
  argTypes: {
    label: { control: "text", description: "Label visível do campo" },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Escala de altura do campo",
    },
    placeholder: {
      control: "text",
      description: "Texto exibido quando não há seleção",
    },
    helperText: { control: "text", description: "Texto auxiliar abaixo do campo" },
    hasError: {
      control: "boolean",
      description: "Ativa estilo de erro e feedback visual",
    },
    disabled: { control: "boolean", description: "Desabilita interação" },
    startIcon: {
      control: "select",
      options: SELECT_ICONS,
      mapping: { none: undefined },
      description: "Ícone à esquerda (nome Lucide)",
    },
    endIcon: {
      control: "select",
      options: SELECT_ICONS,
      mapping: { none: undefined },
      description: "Ícone à direita (antes do chevron)",
    },
  },
  args: {
    label: "Categoria",
    size: "md",
    placeholder: "Selecione uma categoria",
    helperText: "Escolha uma opção para continuar",
    hasError: false,
    disabled: false,
    options: [
      { value: "service", label: "Serviço" },
      { value: "support", label: "Suporte" },
      { value: "billing", label: "Financeiro" },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Playground: Story = {}

export const WithPlaceholder: Story = {
  args: {
    label: "Fruta",
    placeholder: "Escolha uma fruta...",
    options: [
      { value: "apple", label: "Maçã" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cereja" },
      { value: "grape", label: "Uva" },
    ],
  },
}

export const Disabled: Story = {
  args: {
    label: "Campo desabilitado",
    placeholder: "Seleção indisponível",
    disabled: true,
    options: [{ value: "a", label: "Item A" }],
  },
}

export const LongContent: Story = {
  args: {
    label: "Fuso horário",
    placeholder: "Selecione um fuso horário...",
    options: [
      { value: "utc-8", label: "Pacific Time (UTC-8)" },
      { value: "utc-5", label: "Eastern Time (UTC-5)" },
      { value: "utc-3", label: "Brasilia Time (UTC-3)" },
      { value: "utc+0", label: "Greenwich Mean Time (UTC+0)" },
      { value: "utc+1", label: "Central European Time (UTC+1)" },
      { value: "utc+9", label: "Japan Standard Time (UTC+9)" },
    ],
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Select
        size="sm"
        label="Small (sm)"
        placeholder="Selecione..."
        options={[
          { value: "a", label: "Opção A" },
          { value: "b", label: "Opção B" },
        ]}
      />
      <Select
        size="md"
        label="Medium (md)"
        placeholder="Selecione..."
        options={[
          { value: "a", label: "Opção A" },
          { value: "b", label: "Opção B" },
        ]}
      />
      <Select
        size="lg"
        label="Large (lg)"
        placeholder="Selecione..."
        options={[
          { value: "a", label: "Opção A" },
          { value: "b", label: "Opção B" },
        ]}
      />
      <Select
        size="xl"
        label="Extra Large (xl)"
        placeholder="Selecione..."
        options={[
          { value: "a", label: "Opção A" },
          { value: "b", label: "Opção B" },
        ]}
      />
    </div>
  ),
}

export const WithIcons: Story = {
  args: {
    label: "Localidade",
    placeholder: "Selecione uma cidade",
    startIcon: "map-pin",
    endIcon: "globe",
    options: [
      { value: "bh", label: "Belo Horizonte" },
      { value: "sp", label: "São Paulo" },
      { value: "rj", label: "Rio de Janeiro" },
    ],
  },
}

export const WithError: Story = {
  args: {
    label: "Estado",
    placeholder: "Selecione um estado",
    hasError: true,
    helperText: "Selecione um estado válido",
    options: [
      { value: "mg", label: "Minas Gerais" },
      { value: "sp", label: "São Paulo" },
      { value: "rj", label: "Rio de Janeiro" },
    ],
  },
}

export const CompositionalPrimitives: Story = {
  name: "Primitivos composicionais",
  render: () => (
    <SelectRoot>
      <SelectTrigger className="w-72">
        <SelectValue placeholder="Selecione um fuso horário..." />
      </SelectTrigger>
      <SelectContent className="max-h-48">
        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
        <SelectItem value="utc-3">Brasilia Time (UTC-3)</SelectItem>
        <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
        <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
        <SelectItem value="utc+9">Japan Standard Time (UTC+9)</SelectItem>
      </SelectContent>
    </SelectRoot>
  ),
}
