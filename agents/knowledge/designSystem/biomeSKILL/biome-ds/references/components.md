# Catálogo de componentes do Biome DS

29 componentes canônicos exportados por `src/index.ts`. **Consuma por props declarativas**
(plug-and-play): importe um componente e resolva o caso comum sem montar Radix/HTML na mão.

Import padrão (React): `import { Button, Input, Select, Table } from "@biome/design-system"`.

Valores de `size` seguem a escala `sm | md | lg | xl` (default `md`) salvo indicação. Ícones são
nomes **Lucide kebab-case** (ver `references/tokens.md` §6 e `references/html.md`).

---

## Ações e navegação

### Button
Props: `variant` `primary|secondary|ghost|outline|danger|link` (default `primary`),
`size` `sm|md|lg|xl` + variantes só-ícone `icon|icon-sm|icon-md|icon-lg|icon-xl`,
`fullWidth`, `loading`, `iconLeft`, `iconRight`, `centerIcon` (botão só-ícone), `asChild`.
```tsx
<Button variant="primary" iconLeft="plus">Novo débito</Button>
<Button variant="danger" loading>Excluir</Button>
<Button size="icon-md" centerIcon="pencil" aria-label="Editar" />
```

### DropdownMenu
Menu de ações declarativo. Props: `actions` (itens `{ label, icon?, onSelect, destructive? }`),
`trigger`. Não monte o menu Radix manualmente.

### Breadcrumb
`data: BreadcrumbDataItem[]` (`{ label, href? }`). Último item = página atual.

### Tabs
Orientado a dados. `items: TabsDataItem[]` — cada um `{ value, label, content, icon?, count? }`.
`count` mostra badge ao lado do label (padrão de modais). Controlável via `value`/`onValueChange`.
```tsx
<Tabs items={[
  { value: "dados", label: "Dados", content: <FormDados/> },
  { value: "hist", label: "Histórico", icon: "clock", count: 3, content: <Hist/> },
]} />
```

### Carousel
`CarouselApi`, `CarouselOptions`, `CarouselPlugin` para casos avançados; use props do componente
para o caso comum.

---

## Formulário (família de campos)

Todos compartilham `label`, `helperText`, `hasError`, `size` (`sm|md|lg|xl`).

### Input
Props extra: `startIcon`, `endIcon`, `passwordToggle` (com `type="password"`),
`endAction="clear"` + `onClear`, `type` nativo. Alturas: sm `h-8` / md `h-9` / lg `h-10` / xl `h-12`.
```tsx
<Input label="CPF/CNPJ" placeholder="000.000.000-00" startIcon="search" />
<Input label="Senha" type="password" passwordToggle hasError helperText="Senha inválida" />
```

### Textarea
`min-h` por tamanho (sm `14` / md `16` / lg `20` / xl `24`, em unidades de 4px). Mesmo contrato de label/erro.

### Select
Alto nível por dados: `options: SelectOption[]` (`{ value, label, disabled? }`),
`placeholder`, `value`/`onValueChange`. Primitivos Radix existem só como escape hatch.
```tsx
<Select label="Órgão" options={orgaos} placeholder="Selecione" />
```

### Checkbox / Radio / Switch
- `Checkbox`: `size sm|md|lg|xl`, `label`, `hasError`.
- `Radio` + `RadioGroup`: agrupe por `RadioGroup` (`value`/`onValueChange`), itens `Radio`.
- `Switch`: booleano on/off (`checked`/`onCheckedChange`).

### Chip / ChipGroup
`Chip` selecionável/removível (`size sm|md|lg`); `ChipGroup` para conjunto (filtros, tags).

### Toggle
`variant default|outline`, `size default|sm|lg`. Botão de estado pressionado (`pressed`).

---

## Feedback e status

### Alert
Faixa de aviso. `intent success|warning|info|destructive|neutral` (default `neutral`),
`title`, `icon` (Lucide; `null` remove), `onDismiss`. Usa o trio surface/on-surface.
```tsx
<Alert intent="warning" title="Débito suspenso">Ação indisponível enquanto suspenso.</Alert>
```

### Badge
`variant primary|secondary|neutral|success|warning|danger|info|on-sale|new|promo` (default `neutral`),
`size xs|sm|md|lg` (default `sm`), `dot`, `icon`, `onDismiss`. Formato pílula (`rounded-full`).

### StatusBadge
Atalho semântico do Badge. `intent success|warning|info|destructive|neutral`, `label`,
`showIcon` (default true — ícone padrão por intent: success→`circle-check`, warning→`triangle-alert`,
info→`info`, destructive→`circle-x`, neutral→`info`).
```tsx
<StatusBadge intent="success" label="Ativo" />
<StatusBadge intent="destructive" label="Excluído" />
```

### Toast
`Toaster` (montar 1x na raiz) + função `toast(...)`. Notificação transiente.

### Progress / Spinner / Skeleton
- `Progress`: barra de progresso (`value`).
- `Spinner`: `size xs|sm|md|lg|xl` — loading inline.
- `Skeleton`: placeholder de carregamento.

### EmptyState
Estado vazio declarativo (ícone + título + descrição + ação).

---

## Dados e layout

### Table
API declarativa (recomendada): `columns: TableColumn[]` + `rows`.
`TableColumn` = `{ header, accessor|render, align?: "left|center|right", headerClassName?, cellClassName? }`.
`rowKey`, `caption`. Cabeçalho usa `text-heading-xs` sobre `bg-muted`, célula `text-body-s`, `h-12 px-4`.
```tsx
<Table
  columns={[
    { header: "Órgão", accessor: "sigla" },
    { header: "Status", render: (r) => <StatusBadge intent={r.intent} label={r.status} />, align: "center" },
  ]}
  rows={orgaos}
/>
```
Primitivos (`TableHeader`, `TableRow`, `TableCell`…) existem para layouts customizados (escape hatch).

### Avatar
`Avatar` + `AvatarImage` + `AvatarFallback` (iniciais quando não há imagem).

### Separator
Divisória horizontal/vertical (`orientation`).

### Accordion
`data: AccordionDataItem[]` (`{ value, title, content }`); expansível.

---

## Sobreposições (overlays)

### DialogModal
Modal do caso comum por props: `open`/`onOpenChange`, `title`, `trigger`, `footer`, `children`,
`size sm|md|lg|xl|full` (max-width sm `max-w-sm` → xl `max-w-3xl`). Primitivos (`DialogContent`,
`DialogHeader`…) só para layout custom.
```tsx
<DialogModal open={open} onOpenChange={setOpen} title="Confirmar exclusão"
  footer={<><Button variant="outline">Cancelar</Button><Button variant="danger">Excluir</Button></>}>
  Esta ação não pode ser desfeita.
</DialogModal>
```

### SheetPanel
Painel lateral. `side top|bottom|left|right` (default `right`), `open`/`onOpenChange`, `title`.

### Tooltip
`content` + elemento-alvo como filho.

---

## Base

### Icon
`<Icon name="chevron-down" size="md" />`. `name` = Lucide kebab-case (1500+ ícones).
`size` = preset (`xs|sm|md|lg|xl|2xl…`) ou número em px. Helpers exportados:
`getIconNames()`, `isValidIconName()`, `ICON_SIZE_PRESETS`.

### tokens (export JS)
`import { tokens } from "@biome/design-system"` expõe os tokens em JS/TS para uso programático.
