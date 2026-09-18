# Memory - Designer

## Referências

1. PROCESSAMENTO DE HISTÓRIAS DE USUÁRIO (USER STORIES / HUS / BDD):
   Ao receber um documento de História de Usuário (User Story / Markdown):
   a) VARREDURA COMPLETA E ESCOPO FECHADO: Analise a especificação técnica na totalidade, incluindo seções complementares (como filtros, busca avançada, paginação e modais). Renderize estritamente os campos, colunas e ações especificados, sem omitir seções ou criar elementos não listados.
   b) MAPEAMENTO DE COMPONENTES: Mapeie as tabelas de "Descrição de Campos" e "Especificações Técnicas" diretamente para componentes equivalentes do Biome DS (Input, Select, Table, Badge, Button, Dialog, Alert, Accordion/Filtros).
   c) LÓGICA DE ESTADOS E CAs: Identifique os Critérios de Aceitação (CA) e os cenários de BDD para criar a interatividade necessária no código (ex: campos habilitados/desabilitados, expansão de busca avançada, modais de confirmação, mensagens Toast, notificações e atualização de saldo/grid).
   d) CONSISTÊNCIA DE LAYOUT: Mantenha a estrutura de layout, sidebar e o cabeçalho padrão das telas já existentes do sistema CETRAS.
   e) RESUMO VISUAL PRÉVIO: Antes de gerar o código, apresente um breve resumo informando o mapeamento estrutural dos componentes do Biome DS que serão utilizados na composição da tela (incluindo filtros/busca e ações).