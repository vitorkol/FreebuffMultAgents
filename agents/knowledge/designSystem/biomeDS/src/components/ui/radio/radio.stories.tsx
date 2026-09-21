import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"

import { Radio, RadioGroup } from "./radio"
import { Button } from "../button"

const meta: Meta<typeof Radio> = {
  title: "Componentes/Radio",
  component: Radio,
  tags: [],
  argTypes: {
    label: {
      control: "text",
      description: "Rótulo visível ao lado do controle",
    },
    helperText: {
      control: "text",
      description: "Texto auxiliar ou mensagem de erro abaixo do rótulo",
    },
    hasError: {
      control: "boolean",
      description: "Ativa estilos de erro e atributos ARIA",
    },
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    label: "Opção",
    helperText: "",
    hasError: false,
    checked: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Radio>
export const Playground: Story = {}
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Radio name="estados" value="default"   label="Não selecionado (padrão)" defaultChecked={false} />
      <Radio name="estados" value="checked"   label="Selecionado"              defaultChecked />
      <Radio name="estados" value="desc"      label="Com texto auxiliar"       helperText="Texto de apoio que fornece contexto adicional" />
      <Radio name="estados" value="error"     label="Com erro"                 hasError helperText="Selecione uma opção para continuar" />
      <Radio name="estados" value="disabled"  label="Desabilitado"             disabled />
      <Radio name="estados" value="dis-chk"   label="Desabilitado e selecionado" disabled defaultChecked />
    </div>
  ),
}
export const VerticalGroup: Story = {
  name: "RadioGroup — Vertical",
  render: () => {
    const [value, setValue] = useState("")
    return (
      <RadioGroup legend="Selecione o tipo de solicitação">
        {["Reclamação", "Recurso", "Consulta Técnica", "Solicitação de Certidão"].map((opt) => (
          <Radio
            key={opt}
            name="tipo"
            value={opt}
            label={opt}
            checked={value === opt}
            onChange={() => setValue(opt)}
          />
        ))}
      </RadioGroup>
    )
  },
}
export const HorizontalGroup: Story = {
  name: "RadioGroup — Horizontal",
  render: () => {
    const [value, setValue] = useState("")
    return (
      <RadioGroup legend="A resposta atendeu sua solicitação?" row>
        <Radio
          name="resolved"
          value="SIM"
          label="Sim, atendeu"
          checked={value === "SIM"}
          onChange={() => setValue("SIM")}
        />
        <Radio
          name="resolved"
          value="NAO"
          label="Não, não atendeu"
          checked={value === "NAO"}
          onChange={() => setValue("NAO")}
        />
      </RadioGroup>
    )
  },
}
export const GroupWithError: Story = {
  name: "RadioGroup — Com erro",
  render: () => {
    const [value, setValue] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const showError = submitted && !value

    return (
      <div className="flex flex-col gap-4 max-w-xs">
        <RadioGroup
          legend="Tipo de atendimento *"
          hasError={showError}
          {...(showError ? { helperText: "Selecione uma opção para continuar" } : {})}
        >
          {["Presencial", "Online", "Telefone"].map((opt) => (
            <Radio
              key={opt}
              name="tipo-atend"
              value={opt}
              label={opt}
              checked={value === opt}
              onChange={() => setValue(opt)}
            />
          ))}
        </RadioGroup>
        <Button
          size="sm"
          onClick={() => setSubmitted(true)}
          variant={submitted && value ? "secondary" : "primary"}
        >
          {submitted && value ? `Selecionado: ${value}` : "Enviar"}
        </Button>
      </div>
    )
  },
}
export const EvaluationContext: Story = {
  name: "Avaliação de atendimento",
  render: () => {
    const ratingLabels = {
      OTIMO: "Ótimo",
      BOM: "Bom",
      REGULAR: "Regular",
      RUIM: "Ruim",
    } as const
    type RatingValue = keyof typeof ratingLabels
    const [attendantRating, setAttendantRating] = useState<RatingValue | "">("")
    const [citizenRating, setCitizenRating] = useState<string>("")

    return (
      <div className="flex flex-col gap-6 max-w-md">
        <RadioGroup legend="Como você avalia o atendimento recebido? *" row>
          {(Object.keys(ratingLabels) as RatingValue[]).map((value) => (
            <Radio
              key={value}
              name="attendant-rating"
              value={value}
              label={ratingLabels[value]}
              checked={attendantRating === value}
              onChange={() => setAttendantRating(value)}
            />
          ))}
        </RadioGroup>

        <RadioGroup legend="A resposta atendeu sua solicitação? *" row>
          <Radio
            name="citizen-rating"
            value="SIM"
            label="Sim, atendeu"
            checked={citizenRating === "SIM"}
            onChange={() => setCitizenRating("SIM")}
          />
          <Radio
            name="citizen-rating"
            value="NAO"
            label="Não, não atendeu"
            checked={citizenRating === "NAO"}
            onChange={() => setCitizenRating("NAO")}
          />
        </RadioGroup>

        {attendantRating !== "" && citizenRating && (
          <p className="text-body-m text-muted-foreground">
            Avaliação: <strong>{ratingLabels[attendantRating]}</strong> ·{" "}
            <strong>{citizenRating === "SIM" ? "Atendeu" : "Não atendeu"}</strong>
          </p>
        )}
      </div>
    )
  },
}
export const EmailContext: Story = {
  name: "Seleção de e-mail para recuperação",
  render: () => {
    const emails = [
      { value: "primary",   label: "j***@gmail.com",    helperText: "E-mail principal" },
      { value: "secondary", label: "j***@semad.mg.gov.br", helperText: "E-mail alternativo" },
    ]
    const [selected, setSelected] = useState("")

    return (
      <div className="flex flex-col gap-4 max-w-xs rounded-xl border p-6 bg-card">
        <p className="text-body-m text-foreground">
          <strong>Selecione o e-mail para recuperação:</strong>
        </p>
        <RadioGroup>
          {emails.map((email) => (
            <Radio
              key={email.value}
              name="recovery-email"
              value={email.value}
              label={email.label}
              helperText={email.helperText}
              checked={selected === email.value}
              onChange={() => setSelected(email.value)}
            />
          ))}
        </RadioGroup>
        <Button
          size="sm"
          fullWidth
          disabled={!selected}
        >
          Enviar código de recuperação
        </Button>
      </div>
    )
  },
}
