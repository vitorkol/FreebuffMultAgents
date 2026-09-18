import { useState } from 'react'
import { api } from '../api.js'

export default function ForgotPasswordPage({ onBack }) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)
    try {
      const data = await api.forgotPassword(email)
      setMessage(data.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card" aria-label="Recuperação de senha">
      <h1>Recuperar senha</h1>
      <p className="hint">
        Informe seu e-mail cadastrado. Enviaremos um link válido por <strong>1 hora</strong> para
        redefinição.
      </p>

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

        {message && <p className="success" role="status">{message}</p>}
        {error && <p className="error" role="alert">{error}</p>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar link de recuperação'}
        </button>
      </form>

      <p className="link-row">
        <button type="button" className="link-button" onClick={onBack}>
          Voltar para o login
        </button>
      </p>
    </section>
  )
}
