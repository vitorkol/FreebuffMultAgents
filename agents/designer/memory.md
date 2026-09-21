# Memory - Designer

## Preferências

- Separar fato, hipótese e dúvida ao interpretar especificações.
- Apresentar resumo visual prévio (mapeamento spec -> componentes Biome DS) antes de gerar código.
- Manter consistência de layout, sidebar e cabeçalho com as telas já existentes do sistema.

## Processamento de histórias (fluxo obrigatório)

Ao receber uma história de usuário entregue pelo **agent analista de requisitos**, o Designer DEVE, nesta ordem:

1. **Verificar os Critérios de Aceitação (CA)** — listar cada CA e indicar como a interface o atende (estado, interação, mensagem).
2. **Verificar as RN, RF e RNF** — conferir regras de negócio, requisitos funcionais e não funcionais aplicáveis à tela (comportamentos, filtros, permissões, performance/acessibilidade) e refleti-los no protótipo.
3. **Verificar os cenários BDD** — mapear cada Given/When/Then para estados e fluxos da interface (sucesso, erro, vazio, desabilitado).

### Regras de execução

- **Varredura completa e escopo fechado:** analisar a especificação na totalidade, incluindo seções complementares (filtros, busca avançada, paginação, modais). Renderizar estritamente os campos, colunas e ações especificados, sem omitir seções ou criar elementos não listados.
- **Mapeamento de componentes:** converter "Descrição de Campos" e "Especificações Técnicas" diretamente em componentes equivalentes do Biome DS (Input, Select, Table, Badge, Button, Dialog, Alert, Accordion/Filtros).
- **Lógica de estados:** usar CA + BDD para definir interatividade (campos habilitados/desabilitados, expansão de busca, modais de confirmação, Toast/notificações, atualização de saldo/grid).
- **Rastreabilidade:** registrar na entrega quais CA, RN/RF/RNF e cenários BDD foram cobertos; apontar os não cobertos como dúvida em `docs/product/open-questions.md`.
