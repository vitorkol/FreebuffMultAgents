# Skill `biome-ds` — como instalar

Esta skill faz o Claude gerar interfaces **no padrão do Biome Design System** (SEMAD/PSEG/SISEMA/MGFLORESTAS):
protótipos HTML, componentes React/TSX e specs de UI, com tokens, tipografia e componentes fiéis ao
código-fonte do DS. Depois de instalada, ela **aciona sozinha** quando você pede uma tela, protótipo,
componente ou spec — não precisa fazer nada além de pedir.

Há duas formas de usar, dependendo de onde você trabalha. Escolha a sua.

---

## A) Claude.ai (chat / app) — arquivo `biome-ds.skill`

Para quem usa o Claude no navegador ou no app (a maioria).

1. Salve o arquivo **`biome-ds.skill`** no seu computador.
2. No Claude.ai, abra **Configurações → Habilidades**.
3. Clique em **Adicionar** (canto superior direito) e selecione o `biome-ds.skill`.
   - *Alternativa:* arraste o `.skill` para uma conversa nova e clique em **Salvar habilidade** no card.
4. Confirme que **`biome-ds`** aparece na lista, com **Autor: [seu nome]**.
5. Pronto. Vale nas **conversas novas** — é só pedir um protótipo/tela/componente que ela entra.

> Requer que seu plano/organização permita skills customizadas. Se o botão de adicionar/salvar não
> aparecer, é isso — fale com quem administra o workspace.

---

## B) Claude Code (projeto, via git) — pasta em `.claude/skills/`

Para quem usa o **Claude Code** e quer a skill disponível pro time dentro de um repositório.

1. Extraia **`biome-ds-git.zip`** — você terá a pasta `biome-ds/` (com `SKILL.md` + `references/`).
2. Coloque essa pasta em `.claude/skills/` na raiz do repositório, ficando assim:
   ```
   <repo>/.claude/skills/biome-ds/SKILL.md
   <repo>/.claude/skills/biome-ds/references/…
   ```
3. Commite e suba:
   ```bash
   git add .claude/skills/biome-ds
   git commit -m "chore: adiciona skill biome-ds"
   git push
   ```
4. Quem der `git pull` no projeto e usar o Claude Code nesse repo **recebe a skill automaticamente**
   — sem instalar nada. (Na primeira vez, o Claude Code pode pedir para confiar no workspace.)
5. Ela aciona sozinha por contexto ao pedir tela/componente/spec.

> Alternativa pessoal (fora do git): colocar a pasta em `~/.claude/skills/biome-ds/` deixa a skill
> disponível em **todos** os seus projetos locais, só pra você.

---

## Como saber que funcionou

Abra uma conversa/sessão **nova** e peça, por exemplo:
*"me faz um protótipo HTML de uma listagem de órgãos com filtro e coluna de status"*.
Se sair on-brand — verde primário `#264c37`, tipografia semântica, badges de status, ícones Lucide —
está funcionando. Se um pedido curto demais não acionar, é só citar "usa o padrão Biome" ou o sistema
(GAIA, MGDE, PSEG…) que ela entra.

## Atualização futura

Quando o Biome DS evoluir (novo componente, mudança de token), a skill é regerada e redistribuída:
- **Claude.ai:** reenvie o `.skill` novo e clique em **Atualizar habilidade**.
- **git:** substitua a pasta `.claude/skills/biome-ds/`, commite e o time recebe no `git pull`.

Vale manter uma **versão oficial única** para o time não descasar.

## Fonte de verdade

A skill segue o **código-fonte do Biome DS** como fonte de verdade. Havendo divergência entre
protótipo antigo, print ou memória e o DS atual, o DS prevalece.
