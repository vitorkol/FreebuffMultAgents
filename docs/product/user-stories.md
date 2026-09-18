# Histórias de usuário

**Produzido por:** ANR
**Data:** 2026-09-16
**Entrada lida:** docs/product/requirements.md
**Nota:** histórias aguardam revisão do Revisor e refinamento/aprovação do Tech Leader antes de qualquer implementação.

## Critérios gerais de qualidade das histórias
- Cada história tem persona, necessidade, valor e critérios de aceite.
- Cada critério de aceite é testável por QA.
- Não há implementação antes da aprovação do ANR e do Tech Leader.
- Histórias marcadas como Onda 2 ou Onda 3 não entram no escopo da Sprint 1.

---

## US-01 — Professor publica uma aula simples

Como professor, eu quero criar e publicar uma aula rapidamente, para que eu possa disponibilizar o conteúdo sem perder muito tempo.

### Critérios de aceite
- Dado que o professor está logado e possui turmas vinculadas, quando ele abre “Nova Aula”, então ele vê campos para título, descrição, turma, data de publicação, tipo e opções de anexo/link.
- Dado que o professor preenche os campos obrigatórios, quando ele confirma a publicação, então a aula fica visível para os alunos da turma selecionada.
- Dado que a aula foi publicada, quando o primeiro aluno acessa, então a edição plena da aula é limitada conforme a regra do produto.
- Dado que o professor publicou uma aula simples, quando medido em sessão de uso com dados mínimos preenchidos e condições representativas de uso real, então o fluxo de criação e publicação deve ser concluído em até 10 minutos.

### BDD
- Cenário 1: publicar aula com anexo PDF.
- Cenário 2: publicar aula com link externo de vídeo.
- Cenário 3: tentar publicar sem preencher campo obrigatório.

### Prioridade
Alta — escopo MVP.

---

## US-02 — Aluno entrega atividade

Como aluno, eu quero ver e entregar minhas atividades, para que eu saiba o que devo fazer e possa entregar no prazo.

### Critérios de aceite
- Dado que o aluno está logado, quando ele acessa o dashboard, então ele vê atividades pendentes.
- Dado que há uma atividade com prazo, quando o aluno entrega antes do prazo, então o sistema registra a entrega.
- Dado que a entrega ocorreu antes do prazo, quando o aluno reenvia, então o sistema aceita o novo envio até a data/hora do prazo.
- Dado que o prazo passou, quando o aluno tenta reenviar, então a entrega somente é possível mediante autorização do professor.

### BDD
- Cenário 1: entrega por texto.
- Cenário 2: entrega por arquivo.
- Cenário 3: reenvio antes do prazo.
- Cenário 4: tentativa de entrega após o prazo.

### Prioridade
Alta — escopo MVP.

---

## US-03 — Aluno realiza prova objetiva com timer

Como aluno, eu quero fazer uma prova online com tempo limitado, para que a avaliação seja aplicada de forma padronizada e justa.

### Critérios de aceite
- Dado que há uma prova liberada, quando o aluno clica “Iniciar Prova”, então o sistema exibe tempo restante e impedimento de novo início fora do período.
- Dado que a prova está em andamento, quando o aluno responde, então o sistema salva automaticamente.
- Dado que o navegador é fechado e reaberto dentro do período, então o aluno retoma a prova no ponto em que parou, mas o cronômetro no servidor continua correndo.
- Dado que o aluno finaliza, então questões objetivas são corrigidas automaticamente e o aluno recebe nota imediata para essas questões.
- Dado que há questões dissertativas, então a correção fica para o professor e a nota só é considerada após lançamento manual.

### BDD
- Cenário 1: início e salvamento automático.
- Cenário 2: retomada após queda/reenvio do navegador.
- Cenário 3: finalização e correção automática de objetivas.
- Cenário 4: prova fora do período liberado.

### Prioridade
Alta — escopo MVP.

---

## US-04 — Professor veja participação da turma

Como professor, eu quero saber quantos alunos visualizaram a aula e entregaram atividades, para que eu possa orientar a turma com base em dados.

### Critérios de aceite
- Dado que a aula foi publicada, quando o professor abre a turma, então ele vê métricas de visualização e entrega.
- Dado que o professor abre o relatório da turma, então ele consegue identificar alunos que ainda não entregaram.

### Prioridade
Alta — escopo MVP.

---

## US-05 — Aluno veja notas e feedback

Como aluno, eu quero consultar minhas notas e comentários, para que eu entenda meu desempenho e o que preciso melhorar.

### Critérios de aceite
- Dado que o professor lançou nota, quando o aluno acessa “Minhas Notas”, então ele vê disciplina, atividades, provas e média.
- Dado que houver comentário do professor, quando o aluno abre a nota, então ele lê o feedback.

### Prioridade
Alta — escopo MVP.

---

## US-06 — Coordenador consulte indicadores pedagógicos

Como coordenador, eu quero ver indicadores de entrega e desempenho, para que eu possa identificar turmas e alunos com problemas antes da prova final.

### Critérios de aceite
- Dado que o coordenador está logado, quando ele abre o dashboard, então ele vê KPIs básicos de entrega e média por turma.
- Dado que o coordenador filtra por turma/disciplina/período, então ele vê o relatório filtrado.
- Dado que o coordenador busca um aluno, então ele abre o histórico individual com notas, entregas e acessos.
- Dado que há tempo no MVP, então o relatório pode ser exportado para PDF.

### Prioridade
Alta — escopo MVP. Exportação PDF é desejável, mas não bloqueante.

### BDD
- Cenário 1: dashboard geral.
- Cenário 2: filtro por turma.
- Cenário 3: relatório individual.
- Cenário 4: exportação PDF se implementada na sprint.

---

## US-07 — Admin cadastra usuários e turmas

Como administrador, eu quero cadastrar usuários, turmas e disciplinas, para que a escola possa provisionar o ambiente de forma controlada.

### Critérios de aceite
- Dado que o administrador está logado, quando ele abre “Gestão de Usuários”, então ele pode cadastrar um usuário por vez.
- Dado que o administrador tem planilha padronizada, quando ele faz upload, então o sistema importa os registros válidos.
- Dado que há erro na planilha, quando a importação falha em alguns registros, então o sistema sinaliza os problemas.
- Dado que o administrador altera a turma de um aluno, então seu histórico permanece.

### Prioridade
Alta — escopo MVP.

---

## US-08 — Recuperação de senha

Como professor ou aluno, eu quero redefinir minha senha caso a esqueça, para que eu possa voltar a acessar o sistema.

### Critérios de aceite
- Dado que o usuário esqueceu a senha, quando solicita recuperação, então recebe e-mail com instruções.
- Dado que o usuário segue o link válido, quando redefine a senha, então o novo acesso funciona.

### Prioridade
Alta — escopo MVP.

---

## US-09 — Primeiro acesso do professor

Como professor novice em tecnologia, eu quero receber orientação no primeiro acesso, para que eu possa começar a usar sem frustração.

### Critérios de aceite
- Dado que o professor faz login pela primeira vez, quando ele abre o sistema, então vê um manual ou guia de início rápido.

### Prioridade
Média — escopo MVP, conforme feedback do kickoff de jornada.

---

## US-10 — Configuração de notificações

Como aluno ou professor, eu quero escolher como recebo notificações, para que eu não seja sobrecarregado de e-mails.

### Critérios de aceite
- Dado que o usuário está logado, quando ele acessa as configurações, então pode escolher entre receber tudo, resumo diário ou somente itens importantes.
- Dado que o usuário salva a preferência, quando uma notificação relevante ocorre, então o sistema aplica a regra escolhida.

### Prioridade
Média — escopo MVP. Alinhado à funcionalidade aprovada nas reuniões.

---

## Histórias de Onda 2 (não para Sprint 1)
- Fórum de dúvidas por turma.
- Questões dissertativas com correção manual completa.
- Biblioteca pessoal do professor.
- Calendário acadêmico.

## Histórias de Onda 3 (futuro)
- Aplicativo mobile.
- Chat em tempo real.
- Gamificação.
- Certificados automáticos.
- Integração com Google Classroom.

---

## Handoff do ANR
- Entrada lida: docs/product/requirements.md
- Decisões tomadas: histórias criadas a partir das convergências do MVP; não foi inventada funcionalidade fora do registrado.
- Dúvidas e riscos: critérios de usabilidade quantitativa e algumas regras ainda precisam de refinamento técnico.
- Confirmação recebida: condição de medição da US-01 foi confirmada pelo Product Owner.
- Saída gravada: docs/product/user-stories.md
- Status: aprovado

## Aprovação
- Agente: Revisor
- Data: 2026-09-16
- Justificativa: conteúdo revisado quanto a clareza, coerência, critérios de aceite e BDD; sem alteração de escopo; US-01 ajustada para o critério mensurável confirmado pelo Product Owner.
