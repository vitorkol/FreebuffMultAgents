import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import type { IconName } from "../icon"
import { Input } from "./input"
import { Textarea } from "../textarea"
import { Select } from "../select"

const INPUT_ICONS: Array<IconName | "none"> = [
  "none",
  "search",
  "mail",
  "user",
  "lock",
  "eye",
  "phone",
  "calendar",
  "clock",
  "map-pin",
  "link",
  "at-sign",
  "hash",
  "credit-card",
  "globe",
  "file-text",
  "filter",
  "tag",
  "circle-alert",
  "info",
  "arrow-right",
  "chevron-down",
]

const meta: Meta<typeof Input> = {
  title: "Componentes/Input",
  component: Input,
  tags: [],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Escala de altura do campo",
    },
    hasError: {
      control: "boolean",
      description: "Exibe estilos de erro e atributos ARIA",
    },
    disabled: {
      control: "boolean",
    },
    label: { control: "text" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
    startIcon: {
      control: "select",
      options: INPUT_ICONS,
      description: "Ícone à esquerda (nome Lucide)",
    },
    endIcon: {
      control: "select",
      options: INPUT_ICONS,
      description:
        "Ícone à direita (nome Lucide). Oculto quando clear ou passwordToggle está ativo.",
    },
    passwordToggle: {
      control: "boolean",
      description:
        "Exibe botão de alternar visibilidade da senha. Apenas com type=\"password\".",
    },
    endAction: {
      control: "select",
      options: ["none", "clear"],
      mapping: { none: undefined, clear: "clear" },
      description: "Ação do lado direito. Sobrescrita por passwordToggle.",
    },
  },
  args: {
    label: "Label",
    helperText: "Mensagem auxiliar ou de feedback",
    placeholder: "Placeholder",
    size: "md",
    hasError: false,
    disabled: false,
    passwordToggle: false,
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-6">
      <Input size="sm" label="Small (sm)" placeholder="Placeholder" />
      <Input size="md" label="Medium (md)" placeholder="Placeholder" />
      <Input size="lg" label="Large (lg)" placeholder="Placeholder" />
      <Input size="xl" label="Extra Large (xl)" placeholder="Placeholder" />
    </div>
  ),
}

export const WithLabel: Story = {
  args: { label: "E-mail", placeholder: "nome@exemplo.com" },
}

export const WithHelperText: Story = {
  args: {
    label: "Senha",
    helperText: "Mínimo 8 caracteres, letras e números",
    type: "password",
    placeholder: "••••••••",
  },
}

export const WithError: Story = {
  args: {
    label: "E-mail",
    helperText: "E-mail inválido. Verifique e tente novamente.",
    hasError: true,
    defaultValue: "user@",
    placeholder: "nome@exemplo.com",
  },
}

export const WithStartIcon: Story = {
  render: () => (
    <div className="max-w-sm">
      <Input label="Buscar" placeholder="Pesquisar..." startIcon="search" />
    </div>
  ),
}

export const WithEndIcon: Story = {
  render: () => (
    <div className="max-w-sm">
      <Input
        label="E-mail"
        placeholder="nome@exemplo.com"
        type="email"
        endIcon="mail"
      />
    </div>
  ),
}

export const WithBothIcons: Story = {
  render: () => (
    <div className="max-w-sm">
      <Input
        label="Buscar"
        placeholder="Pesquisar..."
        startIcon="search"
        endIcon="x"
      />
    </div>
  ),
}

export const PasswordToggle: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-6">
      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        passwordToggle
        helperText="Clique no ícone para alternar a visibilidade."
      />
      <Input
        label="Senha com ícone à esquerda"
        type="password"
        placeholder="••••••••"
        startIcon="lock"
        passwordToggle
      />
    </div>
  ),
}

export const ClearAction: Story = {
  render: function Render() {
    const [value, setValue] = React.useState("Texto para limpar")
    return (
      <div className="max-w-sm">
        <Input
          label="Campo com ação de limpar"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          endAction="clear"
          onClear={() => setValue("")}
        />
      </div>
    )
  },
}

export const SearchField: Story = {
  name: 'Busca (type="search")',
  render: function Render() {
    const [value, setValue] = React.useState("")
    return (
      <div className="max-w-sm">
        <Input
          type="search"
          label="Buscar"
          placeholder="Pesquisar..."
          startIcon="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          endAction="clear"
          onClear={() => setValue("")}
          helperText='Com type="search", o botão limpar só aparece quando há texto (comportamento de busca).'
        />
      </div>
    )
  },
}

export const ClearWithStartIcon: Story = {
  render: function Render() {
    const [value, setValue] = React.useState("")
    return (
      <div className="max-w-sm">
        <Input
          label="Buscar"
          placeholder="Pesquisar..."
          startIcon="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          endAction="clear"
          onClear={() => setValue("")}
        />
      </div>
    )
  },
}

export const RightSidePriority: Story = {
  name: "Prioridade do lado direito",
  render: () => (
    <div className="flex max-w-sm flex-col gap-6">
      <Input label="Apenas endIcon" placeholder="endIcon aparece" endIcon="mail" />
      <Input
        label="endAction sobrescreve endIcon"
        placeholder="clear aparece, mail ignorado"
        endIcon="mail"
        endAction="clear"
      />
      <Input
        label="passwordToggle sobrescreve tudo"
        type="password"
        placeholder="toggle aparece, clear e mail ignorados"
        endIcon="mail"
        endAction="clear"
        passwordToggle
      />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    label: "Campo desabilitado",
    defaultValue: "Valor atual",
    disabled: true,
  },
}

export const CompleteForm: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Input label="Nome completo" placeholder="Maria Silva" />
      <Input
        label="E-mail"
        placeholder="maria@empresa.com"
        type="email"
        endIcon="mail"
      />
      <Input
        label="CPF"
        placeholder="000.000.000-00"
        hasError
        helperText="CPF inválido"
      />
      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        startIcon="lock"
        passwordToggle
        helperText="Mínimo 8 caracteres"
      />
    </div>
  ),
}

export const FieldFamily: Story = {
  name: "Família de campos",
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <Input label="Nome" placeholder="Digite seu nome" />

      <Select
        label="Estado"
        placeholder="Selecione um estado"
        options={[
          { value: "mg", label: "Minas Gerais" },
          { value: "sp", label: "São Paulo" },
          { value: "rj", label: "Rio de Janeiro" },
        ]}
      />

      <div className="flex flex-col gap-2">
        <label className="block text-label-m text-foreground">
          Observações
        </label>
        <Textarea placeholder="Descreva aqui..." />
      </div>
    </div>
  ),
}
