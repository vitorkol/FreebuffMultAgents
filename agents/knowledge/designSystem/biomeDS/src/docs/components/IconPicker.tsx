import React, { useState } from 'react'
import { getIcon } from '../../icons/icon-registry'

export type DocButtonPreviewVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"

const BUTTON_PREVIEW_VARIANT_ORDER = [
  "primary",
  "secondary",
  "ghost",
  "outline",
  "danger",
] as const satisfies readonly DocButtonPreviewVariant[]

const PICKER_ICONS = [
  "arrow-right", "arrow-left", "chevron-right", "chevron-left", "chevron-down",
  "search", "plus", "minus", "check", "x",
  "send", "download", "upload", "save", "trash-2",
  "pencil", "copy", "heart", "star", "bell",
  "mail", "settings", "user", "log-in", "log-out",
  "external-link", "refresh-cw", "share-2", "printer", "eye",
]

function IconOption({ name, selected, onClick }: {
  name: string
  selected: boolean
  onClick: () => void
}) {
  const IconComp = getIcon(name)
  if (!IconComp) return null

  return (
    <button
      onClick={onClick}
      title={name}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 8px',
        border: `1.5px solid ${selected ? '#264c37' : '#e5e5e5'}`,
        borderRadius: 6,
        background: selected ? '#f0f7f3' : '#fff',
        cursor: 'pointer',
        transition: 'all 0.12s ease',
        minWidth: 0,
      }}
    >
      <IconComp size={14} strokeWidth={1.75} color={selected ? '#264c37' : '#737373'} />
      <span style={{
        fontSize: 10,
        color: selected ? '#264c37' : '#737373',
        fontWeight: selected ? 600 : 400,
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {name}
      </span>
    </button>
  )
}

function NoneOption({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  const XIcon = getIcon('x')
  return (
    <button
      onClick={onClick}
      title="Sem ícone"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 8px',
        border: `1.5px solid ${selected ? '#264c37' : '#e5e5e5'}`,
        borderRadius: 6,
        background: selected ? '#f0f7f3' : '#fff',
        cursor: 'pointer',
        transition: 'all 0.12s ease',
      }}
    >
      {XIcon && <XIcon size={14} strokeWidth={1.75} color={selected ? '#264c37' : '#b0b0b0'} />}
      <span style={{
        fontSize: 10,
        color: selected ? '#264c37' : '#9f9f9f',
        fontWeight: selected ? 600 : 400,
        fontStyle: 'italic',
      }}>
        nenhum
      </span>
    </button>
  )
}

export function ButtonIconPicker() {
  const [leftIcon, setLeftIcon] = useState<string | null>(null)
  const [rightIcon, setRightIcon] = useState<string | null>(null)
  const [variant, setVariant] = useState<DocButtonPreviewVariant>("primary")

  const LeftIconComp = leftIcon ? getIcon(leftIcon) ?? null : null
  const RightIconComp = rightIcon ? getIcon(rightIcon) ?? null : null

  const codeSnippet = (() => {
    const parts: string[] = ['<Button']
    if (variant !== 'primary') parts.push(` variant="${variant}"`)
    if (leftIcon) parts.push(` iconLeft="${leftIcon}"`)
    if (rightIcon) parts.push(` iconRight="${rightIcon}"`)
    parts.push('>')
    parts.push('\n  Label')
    parts.push('\n</Button>')
    return parts.join('')
  })()

  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
      {/* Header */}
      <div style={{
        background: '#fafafa',
        padding: '10px 16px',
        borderBottom: '1px solid #e5e5e5',
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        Icon Picker
        <span style={{ fontSize: 11, color: '#9f9f9f', fontWeight: 400 }}>
          — Selecione ícones para o botão
        </span>
      </div>

      {/* Live preview */}
      <div style={{
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {BUTTON_PREVIEW_VARIANT_ORDER.map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              style={{
                padding: '3px 10px',
                borderRadius: 12,
                border: `1px solid ${variant === v ? '#264c37' : '#e5e5e5'}`,
                background: variant === v ? '#264c37' : '#fff',
                color: variant === v ? '#fff' : '#737373',
                fontSize: 11,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {v}
            </button>
          ))}
        </div>

        {/* The actual button preview */}
        <div style={{ padding: '8px 0' }}>
          <ButtonPreview
            variant={variant}
            leftIcon={LeftIconComp}
            rightIcon={RightIconComp}
          />
        </div>
      </div>

      {/* Pickers side by side */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
      }}>
        {/* Left icon */}
        <div style={{ padding: 12, borderRight: '1px solid #f0f0f0' }}>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#264c37',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Ícone Esquerdo
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <NoneOption selected={leftIcon === null} onClick={() => setLeftIcon(null)} />
            {PICKER_ICONS.map((name) => (
              <IconOption
                key={name}
                name={name}
                selected={leftIcon === name}
                onClick={() => setLeftIcon(name)}
              />
            ))}
          </div>
        </div>

        {/* Right icon */}
        <div style={{ padding: 12 }}>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#264c37',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Ícone Direito
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <NoneOption selected={rightIcon === null} onClick={() => setRightIcon(null)} />
            {PICKER_ICONS.map((name) => (
              <IconOption
                key={name}
                name={name}
                selected={rightIcon === name}
                onClick={() => setRightIcon(name)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Code snippet */}
      <div style={{
        padding: '10px 16px',
        borderTop: '1px solid #f0f0f0',
        background: '#fafafa',
      }}>
        <pre style={{
          margin: 0,
          fontSize: 11,
          lineHeight: 1.5,
          color: '#264c37',
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
          whiteSpace: 'pre-wrap',
        }}>
          {codeSnippet}
        </pre>
      </div>
    </div>
  )
}

function ButtonPreview({ variant, leftIcon, rightIcon }: {
  variant: DocButtonPreviewVariant
  leftIcon: React.ComponentType<{ size?: number; strokeWidth?: number }> | null
  rightIcon: React.ComponentType<{ size?: number; strokeWidth?: number }> | null
}) {
  const variantStyles: Record<DocButtonPreviewVariant, React.CSSProperties> = {
    primary: { background: '#264c37', color: '#fff', border: 'none' },
    secondary: { background: '#f0f7f3', color: '#264c37', border: '1px solid #264c37' },
    ghost: { background: 'transparent', color: '#264c37', border: '1px solid transparent' },
    outline: { background: '#fff', color: 'var(--text-primary)', border: '1px solid #e5e5e5' },
    danger: { background: '#dc2626', color: '#fff', border: 'none' },
  }

  const style = variantStyles[variant]

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 16px',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 500,
      ...style,
    }}>
      {leftIcon && React.createElement(leftIcon, { size: 16, strokeWidth: 2 })}
      <span>Label</span>
      {rightIcon && React.createElement(rightIcon, { size: 16, strokeWidth: 2 })}
    </div>
  )
}
