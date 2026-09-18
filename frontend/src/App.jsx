import { useEffect, useState } from 'react'
import { api } from './api.js'
import DashboardPage from './pages/DashboardPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export default function App() {
  const [path, setPath] = useState(currentPath())
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem('auth')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    const onPop = () => setPath(currentPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function navigate(to) {
    window.history.pushState({}, '', to)
    setPath(currentPath())
  }

  function handleLogin(user, token) {
    const next = { user, token }
    localStorage.setItem('auth', JSON.stringify(next))
    setSession(next)
    navigate('/')
  }

  function handleLogout() {
    if (session?.token) {
      api.logout(session.token).catch(() => {}) // token pode já estar inválido
    }
    localStorage.removeItem('auth')
    setSession(null)
  }

  // Bloqueia rotas autenticadas sem sessão e redireciona para o login.
  if (session && path === '/forgot-password') {
    navigate('/')
  }

  let page
  if (session) {
    page = <DashboardPage token={session.token} user={session.user} onLogout={handleLogout} />
  } else {
    switch (path) {
      case '/forgot-password':
        page = <ForgotPasswordPage onBack={() => navigate('/')} />
        break
      case '/reset-password':
        page = <ResetPasswordPage mode="reset" onDone={() => navigate('/')} />
        break
      case '/activate':
        page = <ResetPasswordPage mode="activate" onDone={() => navigate('/')} />
        break
      default:
        page = <LoginPage onLogin={handleLogin} />
    }
  }

  return (
    <main className="app-shell">
      {page}
    </main>
  )
}
