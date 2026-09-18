import React, { type CSSProperties } from 'react'

export interface TypographySpecimenRowProps {
  label: string
  size: string
  value: string
  weight?: string
  fontFamily?: string
  lineHeight?: string
  usage: string
  sample?: string
}

export function TypographySpecimenRow({
  label,
  size,
  value,
  weight = '400',
  fontFamily = 'Roboto, sans-serif',
  lineHeight = '1.5',
  usage,
  sample = 'O sistema ambiental da SEMAD',
}: TypographySpecimenRowProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 100px 80px 120px',
      gap: 16,
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: '1px solid #f5f5f5',
    }}>
      <div>
        <div style={{
          fontFamily,
          fontSize: value,
          fontWeight: weight,
          lineHeight,
          color: 'var(--text-primary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {sample}
        </div>
        <div style={{ fontSize: 11, color: '#9f9f9f', marginTop: 4, fontFamily: 'monospace' }}>{label}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{value}</div>
        <div style={{ fontSize: 11, color: '#9f9f9f' }}>size</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{weight}</div>
        <div style={{ fontSize: 11, color: '#9f9f9f' }}>weight</div>
      </div>
      <div style={{ fontSize: 11, color: '#737373', textAlign: 'right', lineHeight: 1.4 }}>{usage}</div>
    </div>
  )
}

export interface TypographyScaleProps {
  items: TypographySpecimenRowProps[]
}

export function TypographyScale({ items }: TypographyScaleProps) {
  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 100px 80px 120px',
        gap: 16,
        padding: '8px 16px',
        background: '#f5f5f5',
        fontSize: 11,
        fontWeight: 600,
        color: '#737373',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        <div>Amostra</div>
        <div style={{ textAlign: 'right' }}>Tamanho</div>
        <div style={{ textAlign: 'right' }}>Peso</div>
        <div style={{ textAlign: 'right' }}>Uso</div>
      </div>
      <div style={{ padding: '0 16px' }}>
        {items.map((item, i) => <TypographySpecimenRow key={i} {...item} />)}
      </div>
    </div>
  )
}

export interface FontFamilyCardProps {
  name: string
  cssVar: string
  tailwind: string
  description: string
  specimen: string
  weights: string[]
}

export function FontFamilyCard({ name, cssVar, tailwind, description, specimen, weights }: FontFamilyCardProps) {
  return (
    <div style={{
      border: '1px solid #e5e5e5',
      borderRadius: 10,
      padding: 24,
      background: '#fff',
      flex: 1,
    }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <code style={{ fontSize: 11, background: '#f5f5f5', padding: '2px 8px', borderRadius: 4 }}>{cssVar}</code>
        <code style={{ fontSize: 11, background: '#e9f4ee', color: '#264c37', padding: '2px 8px', borderRadius: 4 }}>{tailwind}</code>
      </div>
      <div style={{
        fontSize: 32,
        fontFamily: name.includes('Poppins') ? 'Poppins, sans-serif' : 'Roboto, sans-serif',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1.2,
        marginBottom: 8,
      }}>
        {specimen}
      </div>
      <p style={{ fontSize: 13, color: '#737373', margin: '0 0 12px', lineHeight: 1.5 }}>{description}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {weights.map((w) => (
          <span key={w} style={{
            fontSize: 12,
            fontFamily: name.includes('Poppins') ? 'Poppins, sans-serif' : 'Roboto, sans-serif',
            fontWeight: w as CSSProperties['fontWeight'],
            background: '#f5f5f5',
            padding: '3px 10px',
            borderRadius: 6,
            color: '#4c4d4d',
          }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  )
}
