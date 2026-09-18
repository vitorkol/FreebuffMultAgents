# Modo protótipo HTML

Para telas navegáveis / mocks de validação em **um arquivo HTML**, sem React. Reproduz o visual do
Biome DS embutindo os tokens e a tipografia semântica, e usando ícones **Lucide via CDN**.

Convenção do fluxo: versionar manualmente (ex.: `tela-x-prototipo_v2.html`); ao gerar, informe a
versão e sugira salvar incrementando o número. Mobile-first quando o contexto pedir.

## Esqueleto base

```html
<!doctype html>
<html lang="pt-BR"> <!-- adicione class="dark" para tema escuro -->
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>/* COLE AQUI a "Base embutível" abaixo + as receitas de componente que usar */</style>
</head>
<body>
  <!-- conteúdo -->
  <script>lucide.createIcons();</script>
</body>
</html>
```
Ícones: `<i data-lucide="circle-check"></i>` (nome Lucide kebab-case). Chame `lucide.createIcons()`
após inserir o DOM.

Tema: alterne a classe `.dark` no `<html>`. Para um toggle simples:
`document.documentElement.classList.toggle('dark')`.

---

## Base embutível (tokens + tipografia + reset)

Cole este bloco no `<style>`. Contém os tokens (light/dark), a tipografia semântica e o reset.

```css
:root{
  /* superfícies */
  --background:#ffffff; --foreground:#4c4d4d; --card:#ffffff; --card-foreground:#4c4d4d;
  --popover:#ffffff; --popover-foreground:#1a1a1a;
  /* papéis */
  --primary:#264c37; --primary-foreground:#ffffff; --secondary:#e9f4ee; --secondary-foreground:#264c37;
  --muted:#f5f5f5; --muted-foreground:#737373; --accent:#f5f5f5; --accent-foreground:#1a1a1a;
  /* feedback sólido */
  --destructive:#dc2626; --destructive-foreground:#fff; --success:#198754; --success-foreground:#fff;
  --warning:#d97706; --warning-foreground:#fff; --info:#2563eb; --info-foreground:#fff;
  /* feedback surface */
  --success-surface:#f0fdf4; --success-surface-border:#bbf7d0; --success-on-surface:#15803d;
  --warning-surface:#fefce8; --warning-surface-border:#fde68a; --warning-on-surface:#a16207;
  --info-surface:#eff6ff; --info-surface-border:#bfdbfe; --info-on-surface:#1d4ed8;
  --destructive-surface:#fef2f2; --destructive-surface-border:#fecaca; --destructive-on-surface:#b91c1c;
  --neutral-surface:#f3f4f6; --neutral-surface-border:#e5e7eb; --neutral-on-surface:#4b5563;
  /* input / texto / marca */
  --border:#e5e5e5; --input:#e5e5e5; --ring:#264c37; --label:#1a1a1a; --label-required:#dc2626;
  --text-muted:#9f9f9f; --text-placeholder:#b3b3b3; --text-disabled:#d4d4d4; --text-inverse:#fff;
  --link:#396dc0; --brand-green:#198754; --brand-green-dark:#024d2a; --brand-green-light:#157347;
  --brand-lime:#92b123; --footer-bg:#053b2d; --section-gray:#fafafa;
  /* tipografia */
  --font-sans:"Roboto",sans-serif; --font-display:"Poppins",sans-serif;
  --fs-2xs:10px; --fs-xs:12px; --fs-sm:14px; --fs-base:16px; --fs-lg:18px; --fs-xl:20px;
  --fs-2xl:24px; --fs-3xl:30px; --fs-4xl:36px; --fs-5xl:48px; --fs-6xl:60px; --fs-7xl:72px;
  --fw-regular:400; --fw-medium:500; --fw-semibold:600; --fw-bold:700;
  --lh-tight:1.2; --lh-snug:1.3; --lh-normal:1.5; --ls-tight:-.01em; --ls-wide:.025em;
  /* spacing / radius / sombra / z */
  --sp:4px; --radius-sm:6px; --radius-md:8px; --radius-lg:12px; --radius-full:9999px;
  --shadow-sm:0 1px 3px rgba(0,0,0,.10),0 1px 2px -1px rgba(0,0,0,.10);
  --shadow-md:0 4px 6px -1px rgba(0,0,0,.10),0 2px 4px -2px rgba(0,0,0,.10);
  --shadow-header:0 1px 4px rgba(0,0,0,.10);
  --z-modal:400; --z-toast:600;
}
.dark{
  --background:#0c1410; --foreground:#f0f8f4; --card:#162019; --card-foreground:#f5f9f7;
  --popover:#162019; --popover-foreground:#f5f9f7;
  --primary:#2d8a5e; --primary-foreground:#fff; --secondary:#1e352b; --secondary-foreground:#e0f0e8;
  --muted:#1c2a24; --muted-foreground:#a8c4b8; --accent:#243530; --accent-foreground:#f0f8f4;
  --destructive:#f87171; --destructive-foreground:#1a1a1a; --success:#4ade80; --success-foreground:#052e16;
  --warning:#fbbf24; --warning-foreground:#1a1a1a; --info:#60a5fa; --info-foreground:#172554;
  --success-surface:#052e16; --success-surface-border:#14532d; --success-on-surface:#4ade80;
  --warning-surface:#422006; --warning-surface-border:#713f12; --warning-on-surface:#fbbf24;
  --info-surface:#172554; --info-surface-border:#1e3a8a; --info-on-surface:#60a5fa;
  --destructive-surface:#450a0a; --destructive-surface-border:#7f1d1d; --destructive-on-surface:#f87171;
  --neutral-surface:#1f2937; --neutral-surface-border:#374151; --neutral-on-surface:#9ca3af;
  --border:#2f4238; --input:#2f4238; --ring:#4ade80; --label:#f0f8f4; --label-required:#f87171;
  --text-muted:#a8c4b8; --text-placeholder:#6b9e8a; --text-disabled:#3a5447; --text-inverse:#0c1410;
  --link:#93c5fd; --brand-green:#4ade80; --section-gray:#111c17;
  --shadow-sm:0 1px 3px rgba(0,0,0,.40),0 1px 2px -1px rgba(0,0,0,.40);
  --shadow-md:0 4px 6px -1px rgba(0,0,0,.40),0 2px 4px -2px rgba(0,0,0,.40);
}
*{box-sizing:border-box; border-color:var(--border);}
body{margin:0; background:var(--background); color:var(--foreground);
  font-family:var(--font-sans); font-size:var(--fs-base); font-weight:var(--fw-regular);
  line-height:var(--lh-normal); -webkit-font-smoothing:antialiased;}

/* tipografia semântica — ÚNICAS classes de texto permitidas */
.text-display-l{font-family:var(--font-display);font-size:var(--fs-5xl);font-weight:var(--fw-bold);line-height:var(--lh-tight);letter-spacing:var(--ls-tight);}
.text-heading-xl{font-family:var(--font-display);font-size:var(--fs-3xl);font-weight:var(--fw-bold);line-height:var(--lh-tight);letter-spacing:var(--ls-tight);}
.text-heading-l{font-family:var(--font-display);font-size:var(--fs-2xl);font-weight:var(--fw-semibold);line-height:var(--lh-snug);}
.text-heading-m{font-size:var(--fs-xl);font-weight:var(--fw-semibold);line-height:var(--lh-snug);}
.text-heading-s{font-size:var(--fs-lg);font-weight:var(--fw-medium);}
.text-heading-xs{font-size:var(--fs-base);font-weight:var(--fw-medium);}
.text-body-l{font-size:var(--fs-lg);} .text-body-m{font-size:var(--fs-base);}
.text-body-s{font-size:var(--fs-sm);} .text-body-xs{font-size:var(--fs-xs);}
.text-label-m{font-size:var(--fs-sm);font-weight:var(--fw-medium);letter-spacing:var(--ls-wide);}
.text-label-s{font-size:var(--fs-xs);font-weight:var(--fw-medium);letter-spacing:var(--ls-wide);}
.text-meta-xs{font-size:var(--fs-xs);} .text-meta-2xs{font-size:var(--fs-2xs);}
```

**Regra:** para tamanho de texto use SÓ essas classes. Não escreva `font-size` cru no markup.
Cores sempre via `var(--token)`. Ícone sempre Lucide.

---

## Receitas de componente (CSS por token)

Adicione ao `<style>` só as que usar. Todas seguem os tokens/alturas do DS.

```css
/* superfície de card */
.ds-card{background:var(--card);color:var(--card-foreground);border:1px solid var(--border);
  border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:calc(var(--sp)*6);}

/* Button */
.ds-btn{display:inline-flex;align-items:center;justify-content:center;gap:calc(var(--sp)*2);
  height:36px;padding:0 16px;border-radius:var(--radius-lg);border:1px solid transparent;
  font-size:var(--fs-sm);font-weight:var(--fw-medium);letter-spacing:var(--ls-wide);cursor:pointer;
  transition:all .15s ease;}
.ds-btn:disabled{opacity:.5;cursor:not-allowed;}
.ds-btn--primary{background:var(--brand-green);color:var(--text-inverse);box-shadow:var(--shadow-sm);}
.ds-btn--primary:hover{background:var(--brand-green-light);}
.ds-btn--secondary{background:var(--secondary);color:var(--secondary-foreground);border-color:var(--brand-green);}
.ds-btn--ghost{background:transparent;color:var(--brand-green);}
.ds-btn--outline{background:var(--background);border-color:var(--input);color:var(--foreground);}
.ds-btn--danger{background:var(--destructive);color:var(--text-inverse);border-color:var(--destructive);}
.ds-btn--sm{height:32px;padding:0 12px;font-size:var(--fs-xs);}
.ds-btn--lg{height:40px;padding:0 20px;} .ds-btn--xl{height:48px;padding:0 24px;}

/* Field (input/select/textarea) + label + helper */
.ds-field{display:block;margin-bottom:8px;font-size:var(--fs-sm);font-weight:var(--fw-medium);
  letter-spacing:var(--ls-wide);color:var(--label);}
.ds-input{width:100%;height:36px;padding:0 12px;border:1px solid var(--input);border-radius:var(--radius-lg);
  background:var(--background);color:var(--foreground);font-size:var(--fs-sm);outline:none;}
.ds-input::placeholder{color:var(--text-placeholder);}
.ds-input:focus{border-color:var(--ring);box-shadow:0 0 0 3px color-mix(in srgb,var(--ring) 25%,transparent);}
.ds-input--error{border-color:var(--destructive);}
.ds-helper{margin-top:8px;font-size:var(--fs-xs);color:var(--muted-foreground);}
.ds-helper--error{color:var(--destructive);}

/* Badge (pílula) */
.ds-badge{display:inline-flex;align-items:center;gap:4px;height:20px;padding:0 8px;
  border-radius:var(--radius-full);font-size:var(--fs-xs);font-weight:var(--fw-medium);
  letter-spacing:var(--ls-wide);border:1px solid transparent;white-space:nowrap;}
.ds-badge--success{background:var(--success-surface);color:var(--success-on-surface);border-color:var(--success-surface-border);}
.ds-badge--warning{background:var(--warning-surface);color:var(--warning-on-surface);border-color:var(--warning-surface-border);}
.ds-badge--info{background:var(--info-surface);color:var(--info-on-surface);border-color:var(--info-surface-border);}
.ds-badge--danger{background:var(--destructive-surface);color:var(--destructive-on-surface);border-color:var(--destructive-surface-border);}
.ds-badge--neutral{background:var(--neutral-surface);color:var(--neutral-on-surface);border-color:var(--neutral-surface-border);}
.ds-badge svg{width:14px;height:14px;}

/* Alert */
.ds-alert{display:flex;gap:12px;padding:16px;border:1px solid transparent;border-radius:var(--radius-lg);}
.ds-alert--success{background:var(--success-surface);border-color:var(--success-surface-border);color:var(--success-on-surface);}
.ds-alert--warning{background:var(--warning-surface);border-color:var(--warning-surface-border);color:var(--warning-on-surface);}
.ds-alert--info{background:var(--info-surface);border-color:var(--info-surface-border);color:var(--info-on-surface);}
.ds-alert--destructive{background:var(--destructive-surface);border-color:var(--destructive-surface-border);color:var(--destructive-on-surface);}
.ds-alert--neutral{background:var(--neutral-surface);border-color:var(--neutral-surface-border);color:var(--neutral-on-surface);}
.ds-alert svg{width:20px;height:20px;flex:0 0 auto;margin-top:2px;}

/* Table */
.ds-table{width:100%;border-collapse:collapse;}
.ds-table caption{text-align:left;padding:12px 0;color:var(--muted-foreground);font-size:var(--fs-sm);}
.ds-table th{height:48px;padding:0 16px;text-align:left;background:var(--muted);color:var(--foreground);
  font-size:var(--fs-base);font-weight:var(--fw-medium);}
.ds-table td{padding:12px 16px;font-size:var(--fs-sm);border-top:1px solid var(--border);}

/* Modal (overlay + surface) */
.ds-overlay{position:fixed;inset:0;background:rgb(0 0 0/.6);z-index:var(--z-modal);
  display:flex;align-items:center;justify-content:center;padding:16px;}
.ds-modal{background:var(--popover);color:var(--popover-foreground);border-radius:var(--radius-lg);
  box-shadow:var(--shadow-md);width:100%;max-width:32rem;max-height:90dvh;overflow:auto;}
.ds-modal__head{padding:24px 24px 0;} .ds-modal__body{padding:16px 24px;}
.ds-modal__foot{padding:16px 24px 24px;display:flex;gap:8px;justify-content:flex-end;}
```

Exemplo de uso:
```html
<button class="ds-btn ds-btn--primary"><i data-lucide="plus"></i> Novo débito</button>
<span class="ds-badge ds-badge--success"><i data-lucide="circle-check"></i> Ativo</span>
<div class="ds-alert ds-alert--warning"><i data-lucide="triangle-alert"></i>
  <div><p class="text-heading-s">Débito suspenso</p>
  <p class="text-body-s">Ação indisponível enquanto suspenso.</p></div></div>
```

## Cobrindo outros componentes

Para componentes sem receita acima (Tabs, Switch, Chip, Accordion, Sheet, DropdownMenu…): siga o
mesmo princípio — estrutura HTML mínima + CSS **só com `var(--token)`** e alturas do DS
(sm 32 / md 36 / lg 40 / xl 48), tipografia por classe semântica, ícones Lucide. Consulte props e
comportamento esperado em `references/components.md` para manter paridade com a versão React.
