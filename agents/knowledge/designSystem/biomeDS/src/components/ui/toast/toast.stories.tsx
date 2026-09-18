import type { Meta, StoryObj } from "@storybook/react"
import { toast } from "sonner"

import { Button } from "../button"
import { Toaster } from "./toast"

const meta: Meta<typeof Toaster> = {
  title: "Componentes/Toast",
  component: Toaster,
  tags: [],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Toaster>
export const Playground: Story = {
  render: () => (
    <Button onClick={() => toast("Event created")}>Show toast</Button>
  ),
}
export const WithDescription: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast("Event created", {
          description: "Your event has been created successfully.",
        })
      }
    >
      Show toast with description
    </Button>
  ),
}
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast("Default toast")}>Default</Button>
      <Button onClick={() => toast.success("Success!")}>Success</Button>
      <Button onClick={() => toast.error("Something went wrong")}>Error</Button>
      <Button onClick={() => toast.warning("Warning message")}>Warning</Button>
      <Button onClick={() => toast.info("Here is some info")}>Info</Button>
    </div>
  ),
}
export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast("Event created", {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo clicked"),
          },
        })
      }
    >
      Show toast with action
    </Button>
  ),
}
