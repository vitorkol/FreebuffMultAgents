import React from 'react'

export interface ColorSwatchProps {
  token: string
  tailwind?: string
  light: string
  dark?: string
  description: string
  textColor?: string
}

export function ColorSwatch({ token, tailwind, light, dark, description, textColor = 'var(--text-primary)' }: ColorSwatchProps) {
  return (
    <div style={{
      border: '1px solid #e5e5e5',
      borderRadius: 10,
      overflow: 'hidden',
      background: '#fff',
      fontSize: 13,
    }}>
      <div style={{ backgroundColor: light, height: 56 }} />
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <code style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', wordBreak: 'break-all' }}>
          {token}
        </code>
        {tailwind && (
          <code style={{ fontSize: 10, color: '#737373', background: '#f5f5f5', padding: '1px 5px', borderRadius: 4, width: 'fit-content' }}>
            {tailwind}
          </code>
        )}
        <div style={{ display: 'flex', gap: 6, marginTop: 2, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: '#4c4d4d', background: '#f5f5f5', padding: '1px 6px', borderRadius: 4 }}>
            ☀ {light}
          </span>
          {dark && (
            <span style={{ fontSize: 11, color: '#737373', background: '#f5f5f5', padding: '1px 6px', borderRadius: 4 }}>
              ◑ {dark}
            </span>
          )}
        </div>
        <p style={{ fontSize: 11, color: '#9f9f9f', margin: 0, marginTop: 2, lineHeight: 1.4 }}>
          {description}
        </p>
      </div>
    </div>
  )
}

export interface ColorGroupProps {
  title: string
  description?: string
  columns?: number
  swatches: ColorSwatchProps[]
}

export function ColorGroup({ title, description, columns = 4, swatches }: ColorGroupProps) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>{title}</h3>
      {description && (
        <p style={{ fontSize: 13, color: '#737373', margin: '0 0 16px', lineHeight: 1.5 }}>{description}</p>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(180px, 1fr))`,
        gap: 12,
      }}>
        {swatches.map((s) => <ColorSwatch key={s.token} {...s} />)}
      </div>
    </div>
  )
}
