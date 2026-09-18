# Levantamento de Requisitos - Módulo de Autenticação e Acesso
**Data:** 2026-09-16  
**Duração:** 2 horas  
**Local:** Sala de Reuniões TI  
**Facilitador:** Product Owner + Analista de Requisitos  
**Participantes:** Ana Paula (TI), Carlos (Dev), Roberto (Professor), Juliana (Aluna), Sra. Beatriz (Secretaria)

---

## Contexto
Com base nas Lean Inception e Kickoffs, este é o primeiro módulo de requisitos. Sem autenticação, ninguém entra no sistema. Precisamos definir, em detalhes, como cada perfil acessa o Kimi Academy.

---

## Agenda (120 minutos)
| Horário | Atividade |
|---------|-----------|
| 0:00 - 0:15 | Contexto e regras de negócio |
| 0:15 - 0:45 | Requisitos de Cadastro de Usuários |
| 0:45 - 1:15 | Requisitos de Login e Sessão |
| 1:15 - 1:40 | Requisitos de Recuperação de Senha e Segurança |
| 1:40 - 1:55 | Perfis e Permissões |
| 1:55 - 2:00 | Encerramento |

---

## Transcrição da Reunião

### [0:00 - 0:15] Contexto

**Facilitador:** Hoje começamos o levantamento de requisitos técnico. Módulo 1: Autenticação. Parece simples, mas se errarmos aqui, todo mundo sofre depois. Ana Paula, qual a preocupação da TI?

**Ana Paula:** Segurança. Não podemos ter vazamento de dados de alunos menores de idade. E precisamos estar em conformidade com a LGPD.

**Carlos:** Técnicamente, vamos usar Laravel com Sanctum para autenticação via token. React consome a API. Mas precisamos das regras de negócio.

**Sra. Beatriz:** Da secretaria, preciso saber: quem cadastra quem? É automático? É manual?

**Facilitador:** Boa pergunta. Vamos por partes.

---

### [0:15 - 0:45] Cadastro de Usuários

**Facilitador:** Primeira pergunta: como um usuário entra no sistema pela primeira vez?

**Sra. Beatriz:** Na nossa realidade, a secretaria já tem os dados de todos. Nome, e-mail, CPF, data de nascimento, turma. A gente manda planilha.

**Ana Paula:** Então o cadastro inicial é feito pelo administrador via importação de CSV?

**Sra. Beatriz:** Sim. Mas o professor e o aluno precisam criar sua senha no primeiro acesso.

**Carlos:** Técnicamente, o admin importa a planilha. O sistema gera usuários inativos. Envia e-mail de ativação. O usuário clica no link, define senha, e a conta fica ativa.

**Roberto:** E se o professor não receber o e-mail?

**Ana Paula:** O administrador pode reenviar o e-mail de ativação. Ou gerar um link manual.

**Juliana:** E se eu, aluna, quiser trocar meu e-mail depois?

**Facilitador:** Pode. No perfil, você edita dados pessoais. Mas o e-mail precisa ser confirmado novamente.

**Carlos:** E CPF? É obrigatório?

**Sra. Beatriz:** Para alunos, sim. Para professores, também. É nosso identificador único.

**Facilitador:** Então temos:
- **RF-AUT-001:** O sistema deve permitir cadastro de usuários via importação de planilha CSV pelo administrador.
- **RF-AUT-002:** O sistema deve gerar e-mail de ativação com link para definição de senha.
- **RF-AUT-003:** O usuário deve poder editar e-mail e dados pessoais no perfil, com confirmação de e-mail.
- **RF-AUT-004:** CPF é campo obrigatório e único para todos os perfis.

**Ana Paula:** E cadastro manual? Um professor novo chega no meio do ano.

**Facilitador:** O administrador pode cadastrar manualmente, um por um, preenchendo formulário.

- **RF-AUT-005:** O administrador deve poder cadastrar usuários individualmente via formulário.

**Roberto:** E se um aluno se matricular depois do início do ano?

**Sra. Beatriz:** A secretaria cadastra. Não faz sentido o aluno se auto-cadastrar.

**Juliana:** Concordo. Senão qualquer um entraria.

**Facilitador:** Então não haverá auto-cadastro público. Só cadastro via admin/secretaria.

- **RF-AUT-006:** Não haverá auto-cadastro público. Todo cadastro é realizado ou aprovado pelo administrador.

---

### [0:45 - 1:15] Login e Sessão

**Facilitador:** Vamos ao login. O que acontece quando o usuário entra?

**Carlos:** E-mail e senha. O sistema valida, gera token JWT, retorna para o React.

**Ana Paula:** Quantas tentativas de senha errada antes de bloquear?

**Carlos:** Sugiro 5 tentativas. Bloqueia por 30 minutos.

**Roberto:** E se o professor esquecer a senha de verdade?

**Ana Paula:** Aí usa recuperação de senha. Vamos falar disso daqui a pouco.

**Juliana:** E "lembrar-me"? Para não ter que digitar toda vez?

**Facilitador:** Sim. Checkbox "Lembrar-me". Se marcado, sessão dura 30 dias. Se não, sessão dura 8 horas.

**Carlos:** No React, guardamos o token no localStorage se "lembrar-me" estiver marcado. Senão, no sessionStorage.

- **RF-AUT-007:** O login deve ser feito com e-mail e senha.
- **RF-AUT-008:** Após 5 tentativas incorretas, a conta deve ser bloqueada por 30 minutos.
- **RF-AUT-009:** O sistema deve oferecer opção "Lembrar-me" (sessão de 30 dias) ou sessão padrão (8 horas).
- **RF-AUT-010:** O sistema deve registrar data/hora do último login no perfil do usuário.

**Ana Paula:** E login em dois dispositivos? Posso estar no computador e no celular?

**Carlos:** Sim. Sanctum permite múltiplos tokens. Mas podemos limitar a 3 dispositivos simultâneos.

**Facilitador:** Vamos deixar ilimitado no MVP. Se virar problema, limitamos depois.

- **RF-AUT-011:** O sistema deve permitir login em múltiplos dispositivos simultâneos.

**Roberto:** E logout? Se eu sair de um, sai de todos?

**Carlos:** Não. Logout é por dispositivo. Mas podemos ter uma opção "Sair de todos os dispositivos" no perfil.

- **RF-AUT-012:** O usuário deve poder encerrar sessão em todos os dispositivos via configurações de perfil.

---

### [1:15 - 1:40] Recuperação de Senha e Segurança

**Facilitador:** Recuperação de senha. Como funciona?

**Ana Paula:** Usuário clica "Esqueci senha", digita e-mail. Recebe link com token temporário. Clica, redefine senha.

**Carlos:** O token expira em 1 hora. Senha nova não pode ser igual às últimas 3 senhas.

**Juliana:** E se eu não lembrar qual e-mail cadastrei?

**Sra. Beatriz:** Aí a secretaria consulta e informa. Não podemos expor dados por segurança.

**Facilitador:** E força de senha?

**Carlos:** Mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 caractere especial.

**Roberto:** Os professores vão reclamar. Muitos usam "123456".

**Ana Paula:** Temos que educar. Mas podemos mostrar uma barra de força da senha enquanto digita.

- **RF-AUT-013:** A recuperação de senha deve enviar e-mail com link de token temporário (válido por 1 hora).
- **RF-AUT-014:** A nova senha não pode ser igual às 3 últimas senhas utilizadas.
- **RF-AUT-015:** A senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.
- **RF-AUT-016:** O sistema deve exibir indicador visual de força da senha durante o cadastro.

**Ana Paula:** E autenticação de dois fatores? 2FA?

**Carlos:** Para o MVP, não. É complexo. Podemos avaliar para fase 2.

**Facilitador:** Concordo. 2FA é desejável, mas não bloqueante.

- **RF-AUT-017:** Autenticação de dois fatores (2FA) é funcionalidade futura, não inclusa no MVP.

---

### [1:40 - 1:55] Perfis e Permissões

**Facilitador:** Vamos aos perfis. Quantos perfis temos?

**Ana Paula:** Administrador, Professor, Aluno. O coordenador pedagógico é um professor com permissões extras?

**Prof. Ricardo:** Na prática, o coordenador é um professor que também vê relatórios de todas as turmas.

**Facilitador:** Então temos dois caminhos: criar um perfil "Coordenador" separado, ou dar permissões avançadas a determinados professores.

**Carlos:** Técnicamente, é mais flexível ter um sistema de permissões granular. Mas para o MVP, perfis fixos são mais simples.

**Dra. Mariana:** Vamos de perfis fixos no MVP. Admin, Professor, Aluno. O coordenador usa login de professor e o admin dá acesso aos relatórios.

- **RF-AUT-018:** O sistema deve ter 3 perfis fixos no MVP: Administrador, Professor e Aluno.
- **RF-AUT-019:** O administrador pode conceder acesso a relatórios a professores específicos (função de coordenador).

**Roberto:** E o que cada um pode fazer?

**Facilitador:** Vamos listar:

**Administrador:**
- Cadastrar/editar/excluir usuários
- Cadastrar turmas, disciplinas, associar professor-turma-disciplina
- Acessar todos os relatórios
- Configurar parâmetros do sistema (prazos, notificações)

**Professor:**
- Visualizar suas turmas
- Criar/editar/excluir aulas e atividades (próprias)
- Lançar notas
- Visualizar relatórios de suas turmas
- Responder em fóruns (futuro)

**Aluno:**
- Visualizar aulas e atividades de suas turmas
- Entregar atividades
- Fazer provas
- Visualizar próprias notas
- Editar perfil pessoal

- **RF-AUT-020:** Cada perfil deve ter acesso apenas às funcionalidades e dados autorizados.
- **RF-AUT-021:** O sistema deve verificar permissões em cada requisição de API.

**Juliana:** E se um aluno tentar acessar aula de outra turma?

**Carlos:** A API retorna 403 Forbidden. O React mostra mensagem de acesso negado.

- **RF-AUT-022:** Tentativas de acesso não autorizado devem ser registradas em log de auditoria.

---

### [1:55 - 2:00] Encerramento

**Facilitador:** Resumo do que definimos hoje: cadastro via CSV e manual, ativação por e-mail, login com bloqueio por tentativas, recuperação de senha com token, 3 perfis com permissões claras, e segurança desde o início.

**Carlos:** Técnicamente é factível. Laravel tem tudo isso nativo ou com pacotes consolidados.

**Ana Paula:** Da parte de segurança e LGPD, estamos cobertos.

**Facilitador:** Próxima reunião: Cadastros Básicos — turmas, disciplinas e associações.

---

## Requisitos Consolidados

### Funcionais
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-AUT-001 | Cadastro via importação CSV | Alta |
| RF-AUT-002 | E-mail de ativação com link | Alta |
| RF-AUT-003 | Edição de perfil com confirmação de e-mail | Média |
| RF-AUT-004 | CPF obrigatório e único | Alta |
| RF-AUT-005 | Cadastro manual individual | Alta |
| RF-AUT-006 | Sem auto-cadastro público | Alta |
| RF-AUT-007 | Login com e-mail e senha | Alta |
| RF-AUT-008 | Bloqueio após 5 tentativas | Alta |
| RF-AUT-009 | Opção "Lembrar-me" | Média |
| RF-AUT-010 | Registro de último login | Média |
| RF-AUT-011 | Múltiplos dispositivos | Média |
| RF-AUT-012 | Logout global | Média |
| RF-AUT-013 | Recuperação de senha por e-mail | Alta |
| RF-AUT-014 | Histórico de senhas | Média |
| RF-AUT-015 | Força mínima de senha | Alta |
| RF-AUT-016 | Indicador de força de senha | Baixa |
| RF-AUT-017 | 2FA futuro | Baixa |
| RF-AUT-018 | 3 perfis fixos | Alta |
| RF-AUT-019 | Permissão de relatórios para professores | Média |
| RF-AUT-020 | Controle de acesso por perfil | Alta |
| RF-AUT-021 | Verificação de permissões em API | Alta |
| RF-AUT-022 | Log de auditoria de acessos negados | Média |

### Não-Funcionais
| ID | Descrição |
|----|-----------|
| RNF-AUT-001 | Conformidade com LGPD |
| RNF-AUT-002 | Senhas armazenadas com bcrypt |
| RNF-AUT-003 | Tokens JWT com expiração |
| RNF-AUT-004 | Comunicação via HTTPS |

---
*Documento gerado em 2026-09-16*
