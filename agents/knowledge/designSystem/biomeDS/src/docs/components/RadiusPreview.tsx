import React from 'react'

export interface RadiusCardProps {
  token: string
  value: string
  tailwind: string
  usage: string
  radiusPx: number
}

export function RadiusCard({ token, value, tailwind, usage, radiusPx }: RadiusCardProps) {
  return (
    <div style={{
      border: '1px solid #e5e5e5',
      borderRadius: 10,
      padding: '20px 16px',
      textAlign: 'center',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
    }}>
      <div style={{
        width: 80,
        height: 80,
        border: '2px dashed #264c37',
        borderRadius: radiusPx,
        background: '#e9f4ee',
        flexShrink: 0,
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        <code style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{token}</code>
        <span style={{ fontSize: 13, color: '#264c37', fontWeight: 600 }}>{value}</span>
        <code style={{ fontSize: 11, color: '#737373', background: '#f5f5f5', padding: '1px 6px', borderRadius: 4 }}>
          {tailwind}
        </code>
        <p style={{ fontSize: 11, color: '#9f9f9f', margin: 0, lineHeight: 1.4 }}>{usage}</p>
      </div>
    </div>
  )
}

export interface RadiusGridProps {
  items: RadiusCardProps[]
}

export function RadiusGrid({ items }: RadiusGridProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: 12,
    }}>
      {items.map((item) => <RadiusCard key={item.token} {...item} />)}
    </div>
  )
}
