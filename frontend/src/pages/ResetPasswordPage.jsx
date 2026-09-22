import { useState } from 'react'
import { api } from '../api.js'

/**
 * Tela única para definir senha a partir de token:
 * - ativação de conta (CA-2, via e-mail de ativação)
 * - redefinição (CA-6, via e-mail de recuperação)
 * Valida no cliente as regras de complexidade (CA-5) antes de chamar a API.
 */
export default function ResetPasswordPage({ mode = 'reset', onDone }) {
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token') ?? ''
  const emailFromLink = params.get('email') ?? ''

  const [email, setEmail] = useState(emailFromLink)
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  // CA-5: regra de complexidade (espelha o backend)
  function passwordProblems(pwd) {
    const problems = []
    if (pwd.length < 8) problems.push('Pelo menos 8 caracteres')
    if (!/[a-z]/.test(pwd)) problems.push('Uma letra minúscula')
    if (!/[A-Z]/.test(pwd)) problems.push('Uma letra maiúscula')
    if (!/[0-9]/.test(pwd)) problems.push('Um número')
    if (!/[^A-Za-z0-9]/.test(pwd)) problems.push('Um caractere especial')
    return problems
  }

  const problems = passwordProblems(password)
  const isStrong = password.length > 0 && problems.length === 0

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (password !== confirmation) {
      setError('As senhas não coincidem.')
      return
    }
    if (!isStrong) {
      setError('A senha não atende às regras de complexidade.')
      return
    }

    setLoading(true)
    try {
      const payload = { token, email, password, password_confirmation: confirmation }
      const data = mode === 'activate'
        ? await api.activate(payload)
        : await api.resetPassword(payload)
      setSuccess(data.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card" aria-label={mode === 'activate' ? 'Ativar conta' : 'Redefinir senha'}>
      <h1>{mode === 'activate' ? 'Definir senha' : 'Redefinir senha'}</h1>
      <p className="hint">
        {mode === 'activate'
          ? 'Defina sua senha para ativar sua conta.'
          : 'Crie uma nova senha para sua conta.'}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Nova senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <ul className="rules" aria-live="polite">
          <li className={problems.length === 0 && password ? 'ok' : ''}>
            {problems.length === 0 && password ? '✓ Senha válida' : `Requisitos: ${problems.join(', ') || '8+ caracteres, maiúscula, minúscula, número e especial'}`}
          </li>
          <li className={password && password === confirmation ? 'ok' : ''}>
            {password && password === confirmation ? '✓ Senhas coincidem' : 'As senhas devem coincidir'}
          </li>
        </ul>

        <label htmlFor="confirmation">Confirmar senha</label>
        <input
          id="confirmation"
          type="password"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          required
          autoComplete="new-password"
        />

        {error && <p className="error" role="alert">{error}</p>}
        {success && (
          <>
            <p className="success" role="status">{success}</p>
            <button type="button" className="btn-primary" onClick={onDone}>
              Ir para o login
            </button>
          </>
        )}

        {!success && (
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar senha'}
          </button>
        )}
      </form>
    </section>
  )
}
