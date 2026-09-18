import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "Componentes/Separator",
  component: Separator,
  tags: [],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Orientação do separador",
    },
    decorative: {
      control: "boolean",
      description: "Define se o separador é puramente visual (sem significado semântico)",
    },
  },
  args: {
    orientation: "horizontal",
    decorative: true,
  },
}

export default meta
type Story = StoryObj<typeof Separator>
export const Playground: Story = {}
export const Horizontal: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div>
        <h4 className="text-heading-s">Section 1</h4>
        <p className="text-body-m text-muted-foreground">Content for the first section.</p>
      </div>
      <Separator orientation="horizontal" />
      <div>
        <h4 className="text-heading-s">Section 2</h4>
        <p className="text-body-m text-muted-foreground">Content for the second section.</p>
      </div>
    </div>
  ),
}
export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4">
      <span className="text-body-s">Item 1</span>
      <Separator orientation="vertical" />
      <span className="text-body-s">Item 2</span>
      <Separator orientation="vertical" />
      <span className="text-body-s">Item 3</span>
    </div>
  ),
}
export const InContent: Story = {
  render: () => (
    <div className="rounded-lg border p-6 w-full max-w-md">
      <div className="space-y-4">
        <div>
          <h3 className="text-heading-m">Card Title</h3>
          <p className="text-body-m text-muted-foreground">
            Description or subtitle.
          </p>
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="text-body-m">
            Body paragraph visually separated from the header above.
          </p>
          <p className="text-body-m text-muted-foreground">
            Another paragraph block demonstrating the separator in real context.
          </p>
        </div>
        <Separator />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded-md border px-3 py-2 text-label-s hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-primary px-3 py-2 text-label-s text-primary-foreground hover:bg-brand-green-light"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  ),
}
