import React from 'react'

export interface SpacingRowProps {
  tailwind: string
  value: string
  px: number
  cssVar: string
  usage: string
}

export function SpacingRow({ tailwind, value, px, cssVar, usage }: SpacingRowProps) {
  const barWidth = Math.min(px * 2.5, 360)

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr 80px 80px',
      gap: 12,
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #f5f5f5',
    }}>
      <code style={{ fontSize: 12, fontWeight: 600, color: '#264c37' }}>{tailwind}</code>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          backgroundColor: '#264c37',
          height: 20,
          width: Math.max(barWidth, 4),
          borderRadius: 3,
          opacity: 0.85,
          flexShrink: 0,
        }} />
      </div>
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{px}px</span>
        <br />
        <span style={{ fontSize: 11, color: '#9f9f9f' }}>{value}</span>
      </div>
      <div style={{ fontSize: 11, color: '#9f9f9f', textAlign: 'right', lineHeight: 1.4 }}>{usage}</div>
    </div>
  )
}

export interface SpacingScaleProps {
  items: SpacingRowProps[]
  title?: string
}

export function SpacingScale({ items, title }: SpacingScaleProps) {
  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '90px 1fr 80px 80px',
        gap: 12,
        padding: '8px 16px',
        background: '#f5f5f5',
        fontSize: 11,
        fontWeight: 600,
        color: '#737373',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        <div>Tailwind</div>
        <div>Escala visual</div>
        <div style={{ textAlign: 'right' }}>Valor</div>
        <div style={{ textAlign: 'right' }}>Uso</div>
      </div>
      <div style={{ padding: '0 16px' }}>
        {items.map((item) => <SpacingRow key={item.tailwind} {...item} />)}
      </div>
    </div>
  )
}
