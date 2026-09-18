import { useState } from 'react'
import { api } from '../api.js'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [lockedUntil, setLockedUntil] = useState(null)
  const [attemptsLeft, setAttemptsLeft] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setAttemptsLeft(null)
    setLoading(true)
    try {
      const data = await api.login(email, password)
      onLogin(data.user, data.token)
    } catch (err) {
      setError(err.message)
      if (err.code === 'ACCOUNT_LOCKED') {
        setLockedUntil(err.data?.locked_until ?? null)
      }
      if (err.status === 401 && typeof err.data?.attempts_remaining === 'number') {
        setAttemptsLeft(err.data.attempts_remaining)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card" aria-label="Login">
      <h1>Entrar</h1>
      <p className="hint">Acesse com seu e-mail institucional e senha.</p>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="voce@escola.test"
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="••••••••"
        />

        {error && (
          <p className={lockedUntil ? 'error error-locked' : 'error'} role="alert">
            {error}
          </p>
        )}
        {attemptsLeft !== null && (
          <p className="warn">Restam {attemptsLeft} tentativa(s) antes do bloqueio de 30 minutos.</p>
        )}
        {lockedUntil && <p className="warn">Guarde este aviso: o bloqueio só é liberado após o prazo informado.</p>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="link-row">
        <a href="/forgot-password">Esqueci minha senha</a>
      </p>
    </section>
  )
}
