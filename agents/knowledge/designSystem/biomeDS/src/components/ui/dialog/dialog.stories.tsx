import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogModal,
} from "./dialog"
import { Button } from "../button"
import { Alert } from "../alert"
import { StatusBadge } from "../status-badge"
import { Spinner } from "../spinner"

const meta: Meta<typeof DialogModal> = {
  title: "Componentes/Dialog",
  component: DialogModal,
  tags: [],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Largura do painel de conteúdo",
    },
    hideClose: {
      control: "boolean",
      description: "Oculta o botão de fechar (×) integrado",
    },
  },
  args: {
    title: "Modal Title",
    description: "Optional description with more context about the content.",
    size: "md",
    hideClose: false,
  },
}

export default meta
type Story = StoryObj<typeof DialogModal>
const Trigger = React.forwardRef<HTMLButtonElement, { label?: string }>(
  ({ label = "Open Modal", ...props }, ref) => (
    <Button ref={ref} {...props}>{label}</Button>
  )
)
export const Playground: Story = {
  render: (args) => (
    <DialogModal
      {...args}
      trigger={<Trigger />}
      footer={
        <>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </>
      }
    >
      <p className="text-body-m text-muted-foreground">
        This is the modal body. It can contain forms, lists, long text with auto-scroll,
        or any other content.
      </p>
    </DialogModal>
  ),
}
export const Basic: Story = {
  name: "DialogModal — Basic usage",
  render: () => (
    <DialogModal
      trigger={<Trigger />}
      title="Confirm action"
      description="Do you really want to proceed with this operation?"
      footer={
        <>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </>
      }
    />
  ),
}
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <DialogModal
          key={size}
          trigger={<Button variant="outline">{size.toUpperCase()}</Button>}
          title={`Modal — ${size.toUpperCase()}`}
          description={`Max width: ${
            { sm: "384px", md: "512px", lg: "672px", xl: "768px" }[size]
          }`}
          size={size}
          footer={
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          }
        >
          <p className="text-body-m text-muted-foreground">
            Modal content with size <strong>{size}</strong>. Use the appropriate size for your content
            — prefer <code>md</code> for simple forms, <code>lg</code> for more complex forms,
            and <code>xl</code> for dashboards or tables.
          </p>
        </DialogModal>
      ))}
    </div>
  ),
}
export const WithoutFooter: Story = {
  name: "Without Footer",
  render: () => (
    <DialogModal
      trigger={<Trigger label="Information" />}
      title="Terms of Use"
      description="Read the terms before continuing"
    >
      <div className="space-y-3">
        <p className="text-body-m text-muted-foreground">
          By using this system, you agree to the Terms and Conditions of Use established
          by SEMAD — State Secretariat for Environment and Sustainable Development.
        </p>
        <p className="text-body-m text-muted-foreground">
          Improper use of the system may result in civil and criminal liability under
          applicable law.
        </p>
        <p className="text-body-m text-muted-foreground">
          Your personal data will be processed in accordance with the General Data Protection Law (LGPD —
          Law nº 13.709/2018).
        </p>
      </div>
    </DialogModal>
  ),
}
export const WithAlert: Story = {
  name: "With internal Alert",
  render: () => (
    <DialogModal
      trigger={<Button variant="danger">Reopen Service Request</Button>}
      title="Reopen Service Request"
      description="Protocol #2024-002"
      size="lg"
      footer={
        <>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button className="bg-warning text-warning-foreground hover:bg-warning-surface hover:text-warning-on-surface">
            Reopen Service Request
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Alert intent="warning" title="Attention">
          By reopening this request, you are indicating that the response received did not address
          your request. A new protocol will be generated.
        </Alert>
        <div className="space-y-2">
          <label className="block text-label-m text-foreground">
            Reason for reopening *
          </label>
          <textarea
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-body-s resize-none min-h-24 focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Describe the reason for reopening this service request..."
          />
        </div>
      </div>
    </DialogModal>
  ),
}
export const WithPrimitives: Story = {
  name: "Composition with Primitives",
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open (primitives)</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="lg">
            <DialogHeader divided>
              <DialogTitle>Service Request Details</DialogTitle>
              <DialogDescription>Protocol #2024-001 · Created on 2024-03-10</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge intent="success" label="Completed" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subject</span>
                  <span className="text-label-m">Environmental certificate request</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Response deadline</span>
                  <span className="text-label-m">15 business days</span>
                </div>
                <div className="border-t pt-3">
                  <p className="mb-2 text-label-s text-muted-foreground uppercase">
                    Response
                  </p>
                  <p className="text-body-m text-foreground">
                    Your certificate has been processed and is available for download on the portal.
                    The document was sent to the registered email.
                  </p>
                </div>
              </div>
            </DialogBody>
            <DialogFooter divided>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button>Evaluate Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
}
export const LoadingState: Story = {
  name: "Loading State",
  render: () => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    const handleConfirm = () => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setDone(true)
        setTimeout(() => {
          setOpen(false)
          setDone(false)
        }, 1500)
      }, 2000)
    }

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Submit Evaluation</Button>
        <Dialog open={open} onOpenChange={(v) => !loading && setOpen(v)}>
          <DialogContent size="sm">
            <DialogHeader divided>
              <DialogTitle>Submit Evaluation</DialogTitle>
            </DialogHeader>
            <DialogBody>
              {loading ? (
                <div className="flex flex-col items-center gap-3 py-6">
                  <Spinner size="xl" className="text-brand-green" />
                  <p className="text-body-m text-muted-foreground">Submitting evaluation...</p>
                </div>
              ) : done ? (
                <Alert intent="success" title="Evaluation submitted!">
                  Thank you for your feedback.
                </Alert>
              ) : (
                <p className="text-body-m text-muted-foreground">
                  Click "Confirm" to submit your service evaluation.
                </p>
              )}
            </DialogBody>
            {!loading && !done && (
              <DialogFooter divided>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirm}>Confirm</Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      </div>
    )
  },
}
export const ServiceContext: Story = {
  name: "Real-world Context — Service Modal",
  render: () => {
    const [open, setOpen] = useState(false)
    const [view, setView] = useState<"details" | "evaluate">("details")

    return (
      <div>
        <Button onClick={() => { setOpen(true); setView("details") }}>
          View Service Request
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="lg">
            <DialogHeader divided>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle>Protocol #2024-003</DialogTitle>
                  <DialogDescription>Technical consultation on environmental licensing</DialogDescription>
                </div>
                <StatusBadge intent="success" label="Completed" />
              </div>
            </DialogHeader>

            <DialogBody>
              {view === "details" ? (
                <div className="flex flex-col gap-4">
                  <dl className="grid grid-cols-2 gap-3">
                    {[
                      ["Created on",   "2024-03-08"],
                      ["Completed on", "2024-03-15"],
                      ["Deadline",     "15 business days"],
                      ["Protocol",     "#2024-003"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg bg-muted p-3">
                        <dt className="text-meta-xs text-muted-foreground mb-1">{label}</dt>
                        <dd className="text-label-m text-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div>
                    <p className="mb-2 text-label-s text-muted-foreground uppercase">
                      Response
                    </p>
                    <p className="text-body-m text-foreground">
                      The licensing process was analyzed and approved. The permit is available
                      for download on the portal and was sent to the registered email.
                    </p>
                  </div>
                </div>
              ) : (
                <Alert intent="info" title="Evaluation">
                  Evaluation form would be displayed here (EvaluationForm).
                </Alert>
              )}
            </DialogBody>

            <DialogFooter divided>
              {view === "details" ? (
                <>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={() => setView("evaluate")}>
                    Evaluate Service
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setView("details")}>
                    Back
                  </Button>
                  <Button>Submit Evaluation</Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
}
