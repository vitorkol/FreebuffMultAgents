// Em dev usa o proxy do Vite (/api -> http://localhost:8000).
// Em produção defina VITE_API_URL com a URL completa da API.
const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

/**
 * Cliente da API de autenticação do backend Laravel (Sprint 1).
 * Erros lançados carregam: message, code (ACCOUNT_LOCKED, INVALID_CREDENTIALS...),
 * status HTTP e errors (validação Laravel).
 */
async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { Accept: 'application/json' }
  if (body) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  let data = null
  try {
    data = await response.json()
  } catch {
    // corpo vazio
  }

  if (!response.ok) {
    const error = new Error(data?.message ?? 'Erro inesperado. Tente novamente.')
    error.code = data?.code
    error.status = response.status
    error.errors = data?.errors
    error.data = data // payload completo (ex.: attempts_remaining, locked_until)
    throw error
  }

  return data
}

export const api = {
  // CA-3/CA-4: login com e-mail e senha (bloqueio tratado pelo chamador via error.code)
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),

  logout: (token) => request('/auth/logout', { method: 'POST', token }),

  me: (token) => request('/auth/me', { token }),

  // CA-6: solicitar link de recuperação
  forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: { email } }),

  // CA-6: redefinir senha com token válido por 1 hora
  resetPassword: ({ token, email, password, password_confirmation }) =>
    request('/auth/reset-password', {
      method: 'POST',
      body: { token, email, password, password_confirmation },
    }),

  // CA-2: definir senha e ativar conta
  activate: ({ token, email, password, password_confirmation }) =>
    request('/register/activate', {
      method: 'POST',
      body: { token, email, password, password_confirmation },
    }),
}
