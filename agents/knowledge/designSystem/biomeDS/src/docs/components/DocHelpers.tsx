import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { File as LucideFileFallback } from 'lucide-react'
import { getIcon } from '../../icons/icon-registry'

/**
 * Resolve a docs-tree icon by kebab name(s). Lucide's `icons` map uses
 * `file-code2` (from PascalCase `FileCode2`), not lucide.dev URL slug `file-code-2`.
 * Falls back so Storybook never renders `<undefined />`.
 */
function resolveDocIcon(...names: string[]): LucideIcon {
  for (const name of names) {
    const Icon = getIcon(name)
    if (Icon) return Icon
  }
  if (names.length) {
    console.warn(`[DocHelpers] Icon not found for ${JSON.stringify(names)}; using file fallback`)
  }
  return getIcon('file') ?? LucideFileFallback
}

const Folder = resolveDocIcon('folder')
const FileCode2 = resolveDocIcon('file-code2', 'file-code-2')
const FileText = resolveDocIcon('file-text')
const FileIcon = resolveDocIcon('file')
const Settings = resolveDocIcon('settings')
const PackageOpen = resolveDocIcon('package-open')
const Info = resolveDocIcon('info')


export interface DocsCalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger' | 'success'
  title?: string
  children: React.ReactNode
}

const calloutConfig = {
  info:    { bg: '#eff6ff', border: '#93c5fd', icon: 'ℹ', titleColor: '#1d4ed8' },
  warning: { bg: '#fffbeb', border: '#fcd34d', icon: '⚠', titleColor: '#92400e' },
  tip:     { bg: '#f0fdf4', border: '#86efac', icon: '💡', titleColor: '#166534' },
  danger:  { bg: '#fef2f2', border: '#fca5a5', icon: '✕', titleColor: '#991b1b' },
  success: { bg: '#ecfdf5', border: '#6ee7b7', icon: '✓', titleColor: '#065f46' },
}

export function DocsCallout({ type = 'info', title, children }: DocsCalloutProps) {
  const cfg = calloutConfig[type] ?? calloutConfig.info
  return (
    <div style={{
      background: cfg.bg,
      borderLeft: `4px solid ${cfg.border}`,
      borderRadius: '0 8px 8px 0',
      padding: '12px 16px',
      margin: '16px 0',
    }}>
      {title && (
        <div style={{ fontWeight: 700, color: cfg.titleColor, marginBottom: 4, fontSize: 14 }}>
          {cfg.icon} {title}
        </div>
      )}
      <div style={{ fontSize: 13, color: '#4c4d4d', lineHeight: 1.6 }}>{children}</div>
    </div>
  )
}


export interface TokenTableRow {
  token: string
  tailwind?: string
  value?: string
  darkValue?: string
  usage: string
}

export interface TokenTableProps {
  rows: TokenTableRow[]
  showDark?: boolean
}

export function TokenTable({ rows, showDark = false }: TokenTableProps) {
  const cols = showDark ? '1fr 1fr 100px 100px 1fr' : '1fr 1fr 120px 1fr'
  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 10, overflow: 'hidden', fontSize: 13 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: cols,
        gap: 12,
        padding: '8px 16px',
        background: '#f5f5f5',
        fontSize: 11,
        fontWeight: 600,
        color: '#737373',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        <div>Token CSS</div>
        <div>Tailwind</div>
        <div>Valor (claro)</div>
        {showDark && <div>Valor (escuro)</div>}
        <div>Uso</div>
      </div>
      {rows.map((row, i) => (
        <div key={row.token} style={{
          display: 'grid',
          gridTemplateColumns: cols,
          gap: 12,
          padding: '10px 16px',
          borderTop: '1px solid #f5f5f5',
          background: i % 2 === 0 ? '#fff' : '#fafafa',
          alignItems: 'center',
        }}>
          <code style={{ fontSize: 12, color: '#264c37', wordBreak: 'break-all' }}>{row.token}</code>
          <code style={{ fontSize: 12, color: '#737373', wordBreak: 'break-all' }}>{row.tailwind}</code>
          <span style={{ fontSize: 12, color: '#4c4d4d', fontFamily: 'monospace' }}>{row.value}</span>
          {showDark && <span style={{ fontSize: 12, color: '#9f9f9f', fontFamily: 'monospace' }}>{row.darkValue ?? '—'}</span>}
          <span style={{ fontSize: 12, color: '#737373' }}>{row.usage}</span>
        </div>
      ))}
    </div>
  )
}


export interface ShadowCardProps {
  token: string
  tailwind: string
  shadow: string
  usage: string
}

export function ShadowCard({ token, tailwind, shadow, usage }: ShadowCardProps) {
  return (
    <div style={{
      border: '1px solid #f5f5f5',
      borderRadius: 10,
      padding: '20px 16px',
      background: '#fff',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
    }}>
      <div style={{
        width: 80,
        height: 56,
        borderRadius: 8,
        background: '#fff',
        boxShadow: shadow,
        border: '1px solid #f5f5f5',
      }} />
      <div>
        <code style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>{token}</code>
        <code style={{ fontSize: 10, color: '#737373', background: '#f5f5f5', padding: '1px 5px', borderRadius: 4, display: 'inline-block', marginTop: 4 }}>{tailwind}</code>
        <p style={{ fontSize: 11, color: '#9f9f9f', margin: '6px 0 0', lineHeight: 1.4 }}>{usage}</p>
      </div>
    </div>
  )
}


export interface ZIndexRowProps {
  token: string
  value: number
  tailwind: string
  element: string
}

export function ZIndexStack({ rows }: { rows: ZIndexRowProps[] }) {
  const sorted = [...rows].sort((a, b) => b.value - a.value)
  const maxVal = sorted[0]?.value ?? 1
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {sorted.map((row) => (
        <div key={row.token} style={{
          display: 'grid',
          gridTemplateColumns: '120px 60px 1fr 1fr',
          gap: 12,
          alignItems: 'center',
        }}>
          <code style={{ fontSize: 12, color: '#264c37' }}>{row.token}</code>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right' }}>{row.value}</span>
          <div style={{ height: 20, background: '#264c37', borderRadius: 3, opacity: 0.15 + (row.value / maxVal) * 0.7, width: `${(row.value / maxVal) * 100}%` }} />
          <span style={{ fontSize: 12, color: '#737373' }}>{row.element}</span>
        </div>
      ))}
    </div>
  )
}


export interface DocsPageHeaderProps {
  title: string
  description: string
  badge?: string
}

export function DocsPageHeader({ title, description, badge }: DocsPageHeaderProps) {
  return (
    <div style={{ marginBottom: 32, borderBottom: '1px solid #e5e5e5', paddingBottom: 24 }}>
      {badge && (
        <span style={{
          display: 'inline-block',
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#264c37',
          background: '#e9f4ee',
          padding: '3px 10px',
          borderRadius: 100,
          marginBottom: 10,
        }}>
          {badge}
        </span>
      )}
      <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px', lineHeight: 1.2 }}>{title}</h1>
      <p style={{ fontSize: 16, color: '#737373', margin: 0, lineHeight: 1.6, maxWidth: 640 }}>{description}</p>
    </div>
  )
}


export function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div style={{ marginBottom: 16, marginTop: 40, paddingBottom: 8, borderBottom: '2px solid #e9f4ee' }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>{title}</h2>
      {description && <p style={{ fontSize: 13, color: '#737373', margin: 0 }}>{description}</p>}
    </div>
  )
}


export function DoRule({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', gap: 8, alignItems: 'flex-start',
      padding: '10px 14px',
      background: '#f0fdf4', border: '1px solid #86efac',
      borderRadius: 8, marginBottom: 6, fontSize: 13, color: '#166534',
    }}>
      <span style={{ fontWeight: 700, flexShrink: 0 }}>✅</span>
      <span>{children}</span>
    </div>
  )
}

export function DontRule({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', gap: 8, alignItems: 'flex-start',
      padding: '10px 14px',
      background: '#fef2f2', border: '1px solid #fca5a5',
      borderRadius: 8, marginBottom: 6, fontSize: 13, color: '#991b1b',
    }}>
      <span style={{ fontWeight: 700, flexShrink: 0 }}>❌</span>
      <span>{children}</span>
    </div>
  )
}


export interface PropRow {
  prop: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 10, overflow: 'hidden', fontSize: 13 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr 100px 1fr',
        gap: 12,
        padding: '8px 16px',
        background: '#f5f5f5',
        fontSize: 11,
        fontWeight: 600,
        color: '#737373',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        <div>Prop</div>
        <div>Tipo</div>
        <div>Padrão</div>
        <div>Descrição</div>
      </div>
      {rows.map((row, i) => (
        <div key={row.prop} style={{
          display: 'grid',
          gridTemplateColumns: '160px 1fr 100px 1fr',
          gap: 12,
          padding: '10px 16px',
          borderTop: '1px solid #f5f5f5',
          background: i % 2 === 0 ? '#fff' : '#fafafa',
          alignItems: 'start',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <code style={{ fontSize: 12, fontWeight: 700, color: '#264c37' }}>{row.prop}</code>
            {row.required && (
              <span style={{ fontSize: 10, background: '#fef2f2', color: '#991b1b', padding: '0px 5px', borderRadius: 4, fontWeight: 600 }}>obrig.</span>
            )}
          </div>
          <code style={{ fontSize: 11, color: '#4c4d4d', background: '#f5f5f5', padding: '2px 6px', borderRadius: 4, lineHeight: 1.6, wordBreak: 'break-word' }}>
            {row.type}
          </code>
          <code style={{ fontSize: 11, color: '#737373' }}>{row.default ?? '—'}</code>
          <span style={{ fontSize: 12, color: '#4c4d4d', lineHeight: 1.5 }}>{row.description}</span>
        </div>
      ))}
    </div>
  )
}


export interface ComponentCardProps {
  name: string
  description: string
  category: string
  status?: 'stable' | 'beta' | 'planned'
  path?: string
}

export function ComponentCard({ name, description, category, status = 'stable', path }: ComponentCardProps) {
  const statusConfig = {
    stable:  { label: 'Estável', bg: '#e9f4ee', color: '#166534' },
    beta:    { label: 'Beta',    bg: '#fffbeb', color: '#92400e' },
    planned: { label: 'Planejado', bg: '#f5f5f5', color: '#737373' },
  }
  const sc = statusConfig[status]
  return (
    <div style={{
      border: '1px solid #e5e5e5',
      borderRadius: 10,
      padding: '14px 16px',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <code style={{ fontSize: 13, fontWeight: 700, color: '#264c37' }}>{name}</code>
        <span style={{ fontSize: 10, background: sc.bg, color: sc.color, padding: '1px 7px', borderRadius: 100, fontWeight: 600, flexShrink: 0 }}>
          {sc.label}
        </span>
      </div>
      <span style={{ fontSize: 11, color: '#9f9f9f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{category}</span>
      <p style={{ fontSize: 12, color: '#737373', margin: 0, lineHeight: 1.5 }}>{description}</p>
    </div>
  )
}


export function ComponentGrid({ items }: { items: ComponentCardProps[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 10,
    }}>
      {items.map((item) => <ComponentCard key={item.name} {...item} />)}
    </div>
  )
}


export interface TokenCategoryCardProps {
  category: string
  description: string
  examples: string[]
  color?: string
}

export function TokenCategoryCard({ category, description, examples, color = '#264c37' }: TokenCategoryCardProps) {
  return (
    <div style={{
      border: '1px solid #e5e5e5',
      borderRadius: 10,
      padding: '16px',
      background: '#fff',
      borderLeft: `3px solid ${color}`,
    }}>
      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14, marginBottom: 4 }}>{category}</div>
      <p style={{ fontSize: 12, color: '#737373', margin: '0 0 8px', lineHeight: 1.5 }}>{description}</p>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {examples.map((ex) => (
          <code key={ex} style={{ fontSize: 10, background: '#f5f5f5', color: '#4c4d4d', padding: '1px 6px', borderRadius: 4 }}>{ex}</code>
        ))}
      </div>
    </div>
  )
}


export function DialogAnatomy() {
  const parts = [
    { part: 'DialogOverlay',     desc: 'Fundo escurecido com blur, fecha ao clicar' },
    { part: 'DialogContent',     desc: 'Contêiner principal com tamanho variável' },
    { part: 'DialogHeader',      desc: 'Título, descrição e botão fechar' },
    { part: 'DialogBody',        desc: 'Conteúdo com scroll automático' },
    { part: 'DialogFooter',      desc: 'Ações primária e secundária' },
    { part: 'DialogTitle',       desc: 'Texto semântico (aria-labelledby)' },
    { part: 'DialogDescription', desc: 'Subtítulo semântico (aria-describedby)' },
  ]
  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden', background: '#fff', marginBottom: 16 }}>
      <div style={{ background: '#1a1a1a', padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#333', borderRadius: 16, padding: 24, border: '1px dashed #555', width: '100%', maxWidth: 360 }}>
          <div style={{ background: '#fff', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14, marginBottom: 2 }}>DialogHeader</div>
                <div style={{ fontSize: 11, color: '#9f9f9f' }}>DialogDescription</div>
              </div>
              <div style={{ width: 20, height: 20, borderRadius: 4, border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#737373' }}>×</div>
            </div>
            <div style={{ padding: '16px 20px', background: '#fafafa' }}>
              <div style={{ fontSize: 12, color: '#737373', fontStyle: 'italic' }}>DialogBody (scroll automático)</div>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <div style={{ fontSize: 11, color: '#737373', padding: '4px 10px', border: '1px solid #e5e5e5', borderRadius: 6 }}>Cancelar</div>
              <div style={{ fontSize: 11, color: '#fff', padding: '4px 10px', background: '#264c37', borderRadius: 6 }}>Confirmar</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: 10, color: '#aaa', marginTop: 8 }}>DialogOverlay (bg-black/60 blur)</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 0 }}>
        {parts.map(({ part, desc }) => (
          <div key={part} style={{ padding: '10px 14px', borderTop: '1px solid #f5f5f5', background: '#fff' }}>
            <code style={{ fontSize: 11, color: '#264c37', display: 'block', marginBottom: 3 }}>{part}</code>
            <p style={{ fontSize: 11, color: '#9f9f9f', margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


export interface KeyboardShortcut {
  key: string
  action: string
}

export function KeyboardShortcuts({ shortcuts }: { shortcuts: KeyboardShortcut[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {shortcuts.map(({ key, action }) => (
        <div key={key} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '7px 12px', background: '#fafafa', borderRadius: 6, border: '1px solid #f5f5f5' }}>
          <kbd style={{ fontSize: 11, background: '#fff', border: '1px solid #e5e5e5', borderRadius: 4, padding: '1px 7px', fontFamily: 'monospace', color: '#264c37', fontWeight: 600, flexShrink: 0, whiteSpace: 'nowrap' }}>{key}</kbd>
          <span style={{ fontSize: 12, color: '#4c4d4d' }}>{action}</span>
        </div>
      ))}
    </div>
  )
}


export function OpacityDemo() {
  const steps = [
    { opacity: 0,    label: '0%',   token: 'opacity-0' },
    { opacity: 0.10, label: '10%',  token: 'opacity-10' },
    { opacity: 0.20, label: '20%',  token: 'opacity-20' },
    { opacity: 0.40, label: '40%',  token: 'opacity-40' },
    { opacity: 0.50, label: '50%',  token: 'opacity-50' },
    { opacity: 0.60, label: '60%',  token: 'opacity-60' },
    { opacity: 0.75, label: '75%',  token: 'opacity-75' },
    { opacity: 0.90, label: '90%',  token: 'opacity-90' },
    { opacity: 1,    label: '100%', token: 'opacity-100' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
      {steps.map(({ opacity, label, token }) => (
        <div key={token} style={{ textAlign: 'center' }}>
          <div style={{
            border: '1px solid #e5e5e5',
            borderRadius: 8,
            overflow: 'hidden',
            background: `repeating-conic-gradient(#e5e5e5 0% 25%, #fff 0% 50%) 0 0 / 12px 12px`,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 6,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: '#264c37',
              opacity,
            }} />
          </div>
          <code style={{ fontSize: 10, display: 'block', color: '#264c37', fontWeight: 600 }}>{token}</code>
          <span style={{ fontSize: 11, color: '#9f9f9f' }}>{label}</span>
        </div>
      ))}
    </div>
  )
}


export interface ComponentOverviewProps {
  category: string
  aria?: string
  file: string
  darkMode?: string
}

export function ComponentOverviewCard({ category, aria, file, darkMode }: ComponentOverviewProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: 8,
      border: '1px solid #e5e5e5',
      borderRadius: 10,
      padding: 16,
      background: '#fafafa',
      marginBottom: 24,
    }}>
      {[
        { label: 'Categoria', value: category, icon: '📦' },
        ...(aria ? [{ label: 'ARIA', value: aria, icon: '♿' }] : []),
        { label: 'Arquivo', value: file, icon: '📄' },
        ...(darkMode ? [{ label: 'Dark mode', value: darkMode, icon: '🌙' }] : []),
      ].map(({ label, value, icon }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontSize: 10, color: '#9f9f9f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{icon} {label}</span>
          <code style={{ fontSize: 11, color: '#264c37', background: '#f5f5f5', padding: '2px 6px', borderRadius: 4, wordBreak: 'break-all' }}>{value}</code>
        </div>
      ))}
    </div>
  )
}


const structureBadgeConfig: Record<string, { bg: string; color: string }> = {
  storybook:  { bg: '#eff6ff',  color: '#3b82f6' },
  components: { bg: '#e9f4ee',  color: '#264c37' },
  tokens:     { bg: '#fef9c3',  color: '#a16207' },
  docs:       { bg: '#f5f3ff',  color: '#7c3aed' },
  config:     { bg: '#f5f5f5',  color: '#737373' },
  entry:      { bg: '#fff7ed',  color: '#c2410c' },
  utility:    { bg: '#f0f9ff',  color: '#0284c7' },
  assets:     { bg: '#fdf2f8',  color: '#db2777' },
  css:        { bg: '#ecfdf5',  color: '#059669' },
  component:  { bg: '#e9f4ee',  color: '#264c37' },
  stories:    { bg: '#eff6ff',  color: '#3b82f6' },
  export:     { bg: '#f5f5f5',  color: '#737373' },
}

type StructureItemType = 'folder' | 'code' | 'text' | 'file' | 'config'

interface StructureItem {
  type: StructureItemType
  name: string
  badge?: string
  badgeType?: string
  desc?: string
  indent?: number
  dimmed?: boolean
}

function StructureItemIcon({ type }: { type: StructureItemType }) {
  switch (type) {
    case 'folder': return <Folder size={14} strokeWidth={1.75} color="#264c37" />
    case 'code':   return <FileCode2 size={14} strokeWidth={1.75} color="#737373" />
    case 'text':   return <FileText size={14} strokeWidth={1.75} color="#737373" />
    case 'config': return <Settings size={14} strokeWidth={1.75} color="#9f9f9f" />
    default:       return <FileIcon size={14} strokeWidth={1.75} color="#737373" />
  }
}

function StructureItemRow({ item }: { item: StructureItem }) {
  const indent = item.indent ?? 0
  const cfg = item.badge && item.badgeType ? structureBadgeConfig[item.badgeType] : null
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: `5px 14px 5px ${14 + indent * 18}px`,
      opacity: item.dimmed ? 0.55 : 1,
    }}>
      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
        <StructureItemIcon type={item.type} />
      </span>
      <code style={{
        fontSize: 12,
        fontWeight: item.type === 'folder' ? 600 : 500,
        color: item.type === 'folder' ? '#264c37' : '#4c4d4d',
        whiteSpace: 'nowrap',
      }}>
        {item.name}
      </code>
      {cfg && item.badge && (
        <span style={{
          fontSize: 10,
          fontWeight: 600,
          padding: '1px 7px',
          borderRadius: 100,
          background: cfg.bg,
          color: cfg.color,
          whiteSpace: 'nowrap',
          lineHeight: '16px',
        }}>
          {item.badge}
        </span>
      )}
      {item.desc && (
        <span style={{
          fontSize: 11,
          color: '#b0b0b0',
          marginLeft: 'auto',
          whiteSpace: 'nowrap',
        }}>
          {item.desc}
        </span>
      )}
    </div>
  )
}

export function ProjectStructure() {
  const items: (StructureItem | 'separator' | { hint: string; indent: number })[] = [
    { type: 'folder', name: '.storybook/', badge: 'storybook', badgeType: 'storybook', desc: '5 config files' },
    { type: 'folder', name: 'src/' },
    { type: 'folder', name: 'assets/', indent: 1, badge: 'assets', badgeType: 'assets', desc: 'Logo e imagens' },
    { type: 'folder', name: 'components/ui/', indent: 1, badge: '32 componentes', badgeType: 'components' },
    { type: 'folder', name: 'button/', indent: 2 },
    { type: 'code', name: 'button.tsx', indent: 3, badge: 'componente', badgeType: 'component' },
    { type: 'code', name: 'button.stories.tsx', indent: 3, badge: 'stories', badgeType: 'stories' },
    { type: 'text', name: 'button.docs.mdx', indent: 3, badge: 'docs', badgeType: 'docs' },
    { type: 'file', name: 'index.ts', indent: 3, badge: 'export', badgeType: 'export' },
    { type: 'folder', name: 'accordion/', indent: 2 },
    { type: 'code', name: 'accordion.tsx', indent: 3, badge: 'componente', badgeType: 'component' },
    { type: 'code', name: 'accordion.stories.tsx', indent: 3, badge: 'stories', badgeType: 'stories' },
    { type: 'text', name: 'accordion.docs.mdx', indent: 3, badge: 'docs', badgeType: 'docs' },
    { type: 'file', name: 'index.ts', indent: 3, badge: 'export', badgeType: 'export' },
    { hint: '… e mais 30 componentes', indent: 2 },
    { type: 'folder', name: 'docs/', indent: 1, badge: 'documentação', badgeType: 'docs', desc: 'Fundações e introdução' },
    { type: 'folder', name: 'theme/', indent: 1, badge: 'tokens', badgeType: 'tokens', desc: 'Colors, spacing, shadows…' },
    { type: 'folder', name: 'utils/', indent: 1, badge: 'utility', badgeType: 'utility', desc: 'cn() e helpers' },
    { type: 'code', name: 'index.ts', indent: 1, badge: 'entry point', badgeType: 'entry', desc: 'Exportações públicas' },
    { type: 'text', name: 'styles.css', indent: 1, badge: 'css', badgeType: 'css', desc: 'Tokens CSS + Tailwind' },
    'separator',
    { type: 'config', name: 'package.json', badge: 'config', badgeType: 'config' },
    { type: 'config', name: 'tsconfig.json', badge: 'config', badgeType: 'config' },
    { type: 'config', name: 'postcss.config.cjs', badge: 'config', badgeType: 'config' },
  ]

  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{
        background: '#fafafa',
        padding: '10px 14px',
        borderBottom: '1px solid #e5e5e5',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <PackageOpen size={16} color="#264c37" />
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>biome-design-system</span>
        <span style={{ fontSize: 11, color: '#9f9f9f' }}>— visão geral</span>
      </div>
      <div style={{ padding: '6px 0', background: '#fff' }}>
        {items.map((item, i) => {
          if (typeof item === 'string') {
            return <div key={i} style={{ borderTop: '1px solid #f0f0f0', margin: '4px 14px' }} />
          }
          if ('hint' in item) {
            return (
              <div key={i} style={{
                padding: `5px 14px 5px ${14 + item.indent * 18}px`,
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: 11, color: '#b0b0b0', fontStyle: 'italic' }}>{item.hint}</span>
              </div>
            )
          }
          return <StructureItemRow key={i} item={item} />
        })}
      </div>
    </div>
  )
}

export function ComponentFolderExample() {
  const items: StructureItem[] = [
    { type: 'code', name: 'button.tsx', badge: 'componente', badgeType: 'component', desc: 'Source + CVA variants' },
    { type: 'code', name: 'button.stories.tsx', badge: 'stories', badgeType: 'stories', desc: 'Playground e variantes' },
    { type: 'text', name: 'button.docs.mdx', badge: 'docs', badgeType: 'docs', desc: 'Documentação MDX' },
    { type: 'file', name: 'index.ts', badge: 'export', badgeType: 'export', desc: 'Barrel re-export' },
  ]

  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{
        background: '#fafafa',
        padding: '10px 14px',
        borderBottom: '1px solid #e5e5e5',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <Folder size={16} color="#264c37" />
        <code style={{ fontSize: 13, fontWeight: 700, color: '#264c37' }}>src/components/ui/button/</code>
        <span style={{ fontSize: 11, color: '#9f9f9f' }}>— estrutura recomendada</span>
      </div>
      <div style={{ padding: '6px 0', background: '#fff' }}>
        {items.map((item, i) => <StructureItemRow key={i} item={item} />)}
      </div>
      <div style={{
        padding: '8px 14px',
        borderTop: '1px solid #f5f5f5',
        background: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        <Info size={12} color="#264c37" />
        <span style={{ fontSize: 11, color: '#737373' }}>
          O arquivo <code style={{ fontSize: 11, fontWeight: 600, color: '#264c37' }}>.docs.mdx</code> é <strong style={{ color: '#264c37' }}>obrigatório</strong> — todos os 32 componentes possuem documentação MDX.
        </span>
      </div>
    </div>
  )
}
