import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetTitle,
  type SheetSide,
  SheetTrigger,
} from "./sheet"
import { Button } from "../button"
import { Input } from "../input"

const meta: Meta<typeof SheetPanel> = {
  title: "Componentes/Sheet",
  component: SheetPanel,
  tags: [],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Lado de entrada do painel",
    },
    hideClose: {
      control: "boolean",
      description: "Oculta o botão de fechar (×) integrado",
    },
  },
  args: {
    title: "Editar perfil",
    description: "Atualize seus dados e clique em salvar.",
    side: "right",
    hideClose: false,
  },
}

export default meta
type Story = StoryObj<typeof SheetPanel>

const Trigger = React.forwardRef<HTMLButtonElement, { label?: string }>(
  ({ label = "Open Sheet", ...props }, ref) => (
    <Button ref={ref} {...props}>
      {label}
    </Button>
  )
)
Trigger.displayName = "SheetStoryTrigger"

export const Playground: Story = {
  render: (args) => (
    <SheetPanel
      {...args}
      trigger={<Trigger />}
      footer={
        <>
          <SheetClose asChild>
            <Button variant="outline">Cancelar</Button>
          </SheetClose>
          <Button>Salvar alterações</Button>
        </>
      }
    >
      <p className="text-body-m text-muted-foreground">
        Conteúdo principal do painel lateral. Use este espaço para formulários,
        filtros ou detalhes de um registro sem sair da tela atual.
      </p>
    </SheetPanel>
  ),
}

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <SheetPanel
          key={side}
          side={side}
          trigger={<Button variant="outline">Abrir {side}</Button>}
          title={`Sheet — ${side}`}
          description={`Painel deslizando pela borda ${side}.`}
          footer={
            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
          }
        >
          <p className="text-body-m text-muted-foreground">
            Exemplo de conteúdo para o lado <strong>{side}</strong>.
          </p>
        </SheetPanel>
      ))}
    </div>
  ),
}

export const WithForm: Story = {
  name: "SheetPanel — Formulário",
  render: () => (
    <SheetPanel
      trigger={<Trigger label="Novo usuário" />}
      title="Criar usuário"
      description="Preencha os dados abaixo para cadastrar."
      footer={
        <>
          <SheetClose asChild>
            <Button variant="outline">Cancelar</Button>
          </SheetClose>
          <Button>Salvar</Button>
        </>
      }
    >
      <form className="mt-4 flex flex-col gap-3">
        <Input label="Nome completo" placeholder="Maria Silva" />
        <Input label="E-mail" type="email" placeholder="maria@semad.mg.gov.br" />
      </form>
    </SheetPanel>
  ),
}

export const ComposicaoAvancada: Story = {
  name: "Composição avançada (escape hatch)",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Abrir com primitives</Button>
      </SheetTrigger>
      <SheetContent side={"right" satisfies SheetSide}>
        <SheetHeader className="pr-10">
          <SheetTitle>Detalhes avançados</SheetTitle>
          <SheetDescription>
            Exemplo com primitives para cenários fora do fluxo comum.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-body-m text-muted-foreground">
            Use este caminho apenas quando o layout exigir controle fino da
            anatomia interna do Sheet.
          </p>
        </div>
        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button variant="outline">Fechar</Button>
          </SheetClose>
          <Button>Ação principal</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}
