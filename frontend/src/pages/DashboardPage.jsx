import { useEffect, useState } from 'react'
import { api } from '../api.js'

/**
 * Dashboard exibido após login bem-sucedido (BDD "Login válido").
 * Recupera o usuário autenticado com o token da sessão.
 */
export default function DashboardPage({ token, user, onLogout }) {
  const [me, setMe] = useState(user ?? null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (me || !token) return
    api.me(token)
      .then((data) => setMe(data.user))
      .catch((err) => setError(err.message))
  }, [token, me])

  return (
    <section className="auth-card" aria-label="Dashboard">
      <h1>Bem-vindo(a){me?.name ? `, ${me.name}` : ''}!</h1>
      <p className="hint">
        Sessão ativa{me?.role ? ` — perfil: ${me.role}` : ''}.
      </p>

      {error && <p className="error" role="alert">{error}</p>}

      <ul className="me-info">
        {me?.email && <li><strong>E-mail:</strong> {me.email}</li>}
        {me?.role && <li><strong>Perfil:</strong> {me.role}</li>}
        {me?.is_active !== undefined && (
          <li><strong>Conta ativa:</strong> {me.is_active ? 'sim' : 'não'}</li>
        )}
      </ul>

      <button type="button" className="btn-primary" onClick={onLogout}>
        Sair
      </button>
    </section>
  )
}
