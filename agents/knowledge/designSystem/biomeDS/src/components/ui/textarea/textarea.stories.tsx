import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "Componentes/Textarea",
  component: Textarea,
  tags: [],
  argTypes: {
    label: { control: "text", description: "Label visível acima do campo" },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Escala de altura do campo",
    },
    helperText: { control: "text", description: "Texto auxiliar abaixo do campo" },
    hasError: {
      control: "boolean",
      description: "Ativa estilo de erro e feedback visual",
    },
    placeholder: { control: "text", description: "Texto placeholder do campo" },
    disabled: { control: "boolean", description: "Desabilita a interação" },
    rows: { control: { type: "number", min: 2, max: 20, step: 1 }, description: "Número de linhas visíveis" },
  },
  args: {
    label: "Descrição",
    size: "md",
    helperText: "Mensagem auxiliar do campo",
    hasError: false,
    placeholder: "Digite sua mensagem...",
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Playground: Story = {}

export const WithValue: Story = {
  args: {
    defaultValue:
      "Este é um textarea pré-preenchido para demonstrar o comportamento com conteúdo inicial.",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Este campo está desabilitado",
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <Textarea
        size="sm"
        label="Small (sm)"
        placeholder="Digite sua mensagem..."
      />
      <Textarea
        size="md"
        label="Medium (md)"
        placeholder="Digite sua mensagem..."
      />
      <Textarea
        size="lg"
        label="Large (lg)"
        placeholder="Digite sua mensagem..."
      />
      <Textarea
        size="xl"
        label="Extra Large (xl)"
        placeholder="Digite sua mensagem..."
      />
    </div>
  ),
}

export const WithError: Story = {
  args: {
    label: "Observações",
    hasError: true,
    helperText: "Este campo é obrigatório",
    placeholder: "Descreva o ocorrido...",
  },
}

export const CustomHeight: Story = {
  args: {
    placeholder: "Descreva em detalhes...",
    className: "min-h-40",
  },
}

export const NoResize: Story = {
  args: {
    placeholder: "Textarea com tamanho fixo...",
    className: "resize-none",
  },
}