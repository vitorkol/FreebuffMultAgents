import React, { useState, useMemo, useCallback } from 'react'
import {
  getIconNames,
  getIcon,
} from '../../icons/icon-registry'

const SearchIcon = getIcon('search')!
const CopyIcon = getIcon('copy')!
const ClipboardCheckIcon = getIcon('clipboard-check')!

const INITIAL_DISPLAY = 200

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
}


function IconCard({ name, copiedKey, onCopy }: {
  name: string
  copiedKey: string | null
  onCopy: (text: string, key: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const IconComp = getIcon(name)
  const isCopied = copiedKey === name

  if (!IconComp) return null

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 6px 10px',
        border: `1px solid ${hovered ? '#264c37' : '#e5e5e5'}`,
        borderRadius: 10,
        background: hovered ? '#f8faf9' : '#fff',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        minHeight: 92,
      }}
      onClick={() => onCopy(`<Icon name="${name}" />`, name)}
    >
      {isCopied && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 10,
          background: 'rgba(38, 76, 55, 0.92)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          zIndex: 2,
        }}>
          <ClipboardCheckIcon size={18} color="#fff" />
          <span style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>Copiado!</span>
        </div>
      )}

      <IconComp
        size={hovered ? 28 : 24}
        strokeWidth={1.75}
        color={hovered ? '#264c37' : '#4c4d4d'}
        style={{ transition: 'all 0.15s ease', marginBottom: 8 }}
      />

      <span style={{
        fontSize: 9.5,
        color: '#737373',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
        textAlign: 'center',
        lineHeight: 1.3,
        wordBreak: 'break-word',
        maxWidth: '100%',
      }}>
        {name}
      </span>

      {hovered && !isCopied && (
        <div style={{
          position: 'absolute',
          top: 4,
          right: 4,
          display: 'flex',
          gap: 2,
        }}>
          <CopyButton
            title="Copiar nome"
            onClick={(e) => {
              e.stopPropagation()
              onCopy(name, name)
            }}
          >
            <CopyIcon size={11} />
          </CopyButton>
        </div>
      )}
    </div>
  )
}

function CopyButton({ children, title, onClick }: {
  children: React.ReactNode
  title: string
  onClick: (e: React.MouseEvent) => void
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        border: 'none',
        background: 'rgba(38, 76, 55, 0.08)',
        borderRadius: 4,
        padding: '3px 4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#264c37',
      }}
    >
      {children}
    </button>
  )
}


export function IconBrowser() {
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const allNames = useMemo(() => getIconNames(), [])
  const totalCount = allNames.length

  const filtered = useMemo(() => {
    if (!search) return allNames
    const q = search.toLowerCase()
    return allNames.filter((n) => n.includes(q))
  }, [allNames, search])

  const displayed = search || showAll
    ? filtered
    : filtered.slice(0, INITIAL_DISPLAY)

  const hasMore = !search && !showAll && filtered.length > INITIAL_DISPLAY

  const handleCopy = useCallback(async (text: string, key: string) => {
    await copyText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 1500)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        border: '1px solid #e5e5e5',
        borderRadius: 10,
        background: '#fff',
      }}>
        <SearchIcon size={16} color="#9f9f9f" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar ícones por nome..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: 13,
            color: 'var(--text-primary)',
            background: 'transparent',
          }}
        />
        <span style={{
          fontSize: 11,
          color: '#9f9f9f',
          whiteSpace: 'nowrap',
          fontWeight: 500,
        }}>
          {filtered.length} de {totalCount} ícones
        </span>
      </div>

      {/* Icon grid */}
      {displayed.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: 6,
        }}>
          {displayed.map((name) => (
            <IconCard
              key={name}
              name={name}
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '48px 16px',
          color: '#9f9f9f',
          fontSize: 13,
          border: '1px dashed #e5e5e5',
          borderRadius: 10,
        }}>
          Nenhum ícone encontrado para &ldquo;{search}&rdquo;
        </div>
      )}

      {/* Show all button */}
      {hasMore && (
        <button
          onClick={() => setShowAll(true)}
          style={{
            alignSelf: 'center',
            padding: '8px 24px',
            border: '1px solid #264c37',
            borderRadius: 8,
            background: '#fff',
            color: '#264c37',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Mostrar todos os {totalCount} ícones
        </button>
      )}

      {/* Usage hint */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 14px',
        background: '#f8faf9',
        borderRadius: 8,
        border: '1px solid #e5e5e5',
      }}>
        <span style={{ fontSize: 14 }}>💡</span>
        <span style={{ fontSize: 11, color: '#737373' }}>
          <strong style={{ color: '#264c37' }}>Clique</strong> em um ícone para copiar{' '}
          <code style={{ fontSize: 10, color: '#264c37' }}>{`<Icon name="..." />`}</code>.{' '}
          Os nomes seguem o padrão do <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" style={{ color: '#264c37', fontWeight: 600 }}>lucide.dev</a>.
        </span>
      </div>
    </div>
  )
}


export function IconSizePreview() {
  const sizes: { token: string; px: number; usage: string }[] = [
    { token: 'xs', px: 14, usage: 'Indicadores compactos, badges inline' },
    { token: 'sm', px: 16, usage: 'Inline com texto, botões pequenos' },
    { token: 'md', px: 20, usage: 'Padrão UI — botões, inputs, navegação' },
    { token: 'lg', px: 24, usage: 'Destaque, headers, ações primárias' },
    { token: 'xl', px: 32, usage: 'Elementos grandes, empty states, hero sections' },
    { token: '2xl', px: 40, usage: 'Cards com foco visual e indicadores principais' },
    { token: '3xl', px: 48, usage: 'Hero sections e destaques de alta prioridade' },
    { token: '4xl', px: 56, usage: 'Ilustrações simples e pontos de atenção' },
    { token: '5xl', px: 64, usage: 'Áreas institucionais e estados vazios amplos' },
    { token: '6xl', px: 72, usage: 'Componentes promocionais com ênfase visual' },
    { token: '7xl', px: 80, usage: 'Banners e chamadas de alto impacto' },
    { token: '8xl', px: 88, usage: 'Elementos especiais de campanha' },
    { token: '9xl', px: 96, usage: 'Destaques máximos em layouts responsivos amplos' },
    { token: '10xl', px: 104, usage: 'Uso excepcional para composições hero' },
  ]

  const PreviewIcon = getIcon('heart')!

  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{
        background: '#fafafa',
        padding: '10px 16px',
        borderBottom: '1px solid #e5e5e5',
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--text-primary)',
      }}>
        Escala de Tamanhos
      </div>
      <div style={{ padding: 0 }}>
        {sizes.map(({ token, px, usage }, i) => (
          <div
            key={token}
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 80px 1fr',
              alignItems: 'center',
              gap: 16,
              padding: '14px 16px',
              borderTop: i > 0 ? '1px solid #f5f5f5' : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PreviewIcon size={px} strokeWidth={1.75} color="#264c37" />
            </div>
            <div>
              <code style={{ fontSize: 13, fontWeight: 600, color: '#264c37' }}>{token}</code>
              <span style={{ fontSize: 11, color: '#9f9f9f', marginLeft: 4 }}>{px}px</span>
            </div>
            <span style={{ fontSize: 12, color: '#737373' }}>{usage}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


export function IconStrokePreview() {
  const strokes = [
    { width: 1, label: 'Fina (1)', usage: 'Visual leve e elegante — ideal para ícones grandes e contextos decorativos' },
    { width: 1.5, label: 'Regular (1.5)', usage: 'Equilíbrio visual — recomendado pelo Biome para a maioria dos contextos' },
    { width: 2, label: 'Média (2)', usage: 'Padrão Lucide — boa legibilidade em todos os tamanhos' },
    { width: 2.5, label: 'Grossa (2.5)', usage: 'Alto contraste — ideal para tamanhos pequenos e acessibilidade' },
  ]

  const PreviewIcon = getIcon('heart')!

  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{
        background: '#fafafa',
        padding: '10px 16px',
        borderBottom: '1px solid #e5e5e5',
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--text-primary)',
      }}>
        Espessura de Traço (strokeWidth)
      </div>
      <div style={{ padding: 0 }}>
        {strokes.map(({ width, label, usage }, i) => (
          <div
            key={width}
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 100px 1fr',
              alignItems: 'center',
              gap: 16,
              padding: '14px 16px',
              borderTop: i > 0 ? '1px solid #f5f5f5' : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PreviewIcon size={28} strokeWidth={width} color="#264c37" />
            </div>
            <code style={{ fontSize: 12, fontWeight: 600, color: '#264c37' }}>{label}</code>
            <span style={{ fontSize: 12, color: '#737373' }}>{usage}</span>
          </div>
        ))}
      </div>
      <div style={{
        padding: '10px 16px',
        borderTop: '1px solid #f0f0f0',
        background: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        <span style={{ fontSize: 14 }}>✦</span>
        <span style={{ fontSize: 11, color: '#737373' }}>
          <strong style={{ color: '#264c37' }}>Recomendação Biome:</strong> Use{' '}
          <code style={{ fontSize: 11, color: '#264c37' }}>strokeWidth=1.5</code> como padrão para a maioria dos contextos de UI.
        </span>
      </div>
    </div>
  )
}


export function IconUsageExamples() {
  const examples = [
    {
      title: 'Uso básico',
      code: `import { Icon } from "@biome/ui"\n\n<Icon name="circle-check" />`,
    },
    {
      title: 'Com tamanho',
      code: `<Icon name="arrow-right" size="sm" />\n<Icon name="heart" size="lg" />\n<Icon name="star" size={40} />`,
    },
    {
      title: 'Ícone decorativo (padrão)',
      code: `{/* aria-hidden automático */}\n<Icon name="search" />\n<span>Buscar</span>`,
    },
    {
      title: 'Ícone semântico',
      code: `{/* role="img" automático */}\n<Icon\n  name="triangle-alert"\n  aria-label="Aviso"\n/>`,
    },
    {
      title: 'Dentro de um botão',
      code: `<Button>\n  <Icon name="send" size="sm" />\n  Enviar\n</Button>`,
    },
    {
      title: 'Com cor e classe',
      code: `<Icon\n  name="heart"\n  color="#e11d48"\n  className="animate-pulse"\n/>`,
    },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10 }}>
      {examples.map(({ title, code }) => (
        <div key={title} style={{ border: '1px solid #e5e5e5', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{
            padding: '8px 12px',
            background: '#fafafa',
            borderBottom: '1px solid #f0f0f0',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}>
            {title}
          </div>
          <pre style={{
            padding: '12px',
            margin: 0,
            fontSize: 11,
            lineHeight: 1.6,
            color: '#264c37',
            background: '#fff',
            overflow: 'auto',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
          }}>
            {code}
          </pre>
        </div>
      ))}
    </div>
  )
}
