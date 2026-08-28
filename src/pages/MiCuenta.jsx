import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import '../styles/MiCuenta.css'

function formatJoinedDate(iso) {
  if (!iso) return '—'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function MiCuenta() {
  const { user, isAuthenticated, login, register, logout } = useAuth()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState(null)

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFormError(null)
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setErrors({})
    setFormError(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (mode === 'login') {
      const result = login({ email: form.email, password: form.password })
      if (!result.ok) setFormError(result.error ?? 'No se pudo iniciar sesión.')
    } else {
      const result = register({ name: form.name, email: form.email, password: form.password })
      if (!result.ok) setErrors(result.errors ?? {})
    }
  }

  if (isAuthenticated && user) {
    return (
      <section className="cuenta cinema-x-container">
        <header className="cuenta__header">
          <h2 className="cuenta__title">Mi Cuenta</h2>
          <div className="cuenta__line" aria-hidden="true" />
        </header>

        <div className="cuenta__card">
          <div className="cuenta__avatar" aria-hidden="true">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h3 className="cuenta__name">{user.name}</h3>
          <p className="cuenta__status">
            <span className="cuenta__status-dot" aria-hidden="true" />
            Conectado
          </p>

          <dl className="cuenta__list">
            <div className="cuenta__row">
              <dt>Correo</dt>
              <dd>{user.email}</dd>
            </div>
            <div className="cuenta__row">
              <dt>Socio desde</dt>
              <dd>{formatJoinedDate(user.createdAt)}</dd>
            </div>
          </dl>

          <div className="cuenta__links">
            <Link to="/favoritos" className="cuenta__link">
              Mis favoritos →
            </Link>
            <Link to="/entradas" className="cuenta__link">
              Mis entradas →
            </Link>
          </div>

          <button type="button" className="btn-marquee" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="cuenta cinema-x-container">
      <header className="cuenta__header">
        <h2 className="cuenta__title">Mi Cuenta</h2>
        <div className="cuenta__line" aria-hidden="true" />
        <p className="cuenta__intro">
          Registro e inicio de sesión simulados. Todo se guarda solo en este navegador.
        </p>
      </header>

      <div className="cuenta__card">
        <div className="cuenta__tabs" role="tablist" aria-label="Acceso a la cuenta">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
            className={`cuenta__tab ${mode === 'login' ? 'cuenta__tab--active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'register'}
            className={`cuenta__tab ${mode === 'register' ? 'cuenta__tab--active' : ''}`}
            onClick={() => switchMode('register')}
          >
            Crear cuenta
          </button>
        </div>

        <form className="cuenta__form" onSubmit={handleSubmit} noValidate>
          {mode === 'register' && (
            <label className="cuenta__field">
              <span className="cuenta__label">Nombre</span>
              <input
                type="text"
                className="cuenta__input"
                value={form.name}
                onChange={updateField('name')}
                placeholder="Tu nombre"
                autoComplete="name"
              />
              {errors.name && <span className="cuenta__error">{errors.name}</span>}
            </label>
          )}

          <label className="cuenta__field">
            <span className="cuenta__label">Correo</span>
            <input
              type="email"
              className="cuenta__input"
              value={form.email}
              onChange={updateField('email')}
              placeholder="tucorreo@ejemplo.com"
              autoComplete="email"
            />
            {errors.email && <span className="cuenta__error">{errors.email}</span>}
          </label>

          <label className="cuenta__field">
            <span className="cuenta__label">Contraseña</span>
            <input
              type="password"
              className="cuenta__input"
              value={form.password}
              onChange={updateField('password')}
              placeholder="Mínimo 6 caracteres"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            {errors.password && <span className="cuenta__error">{errors.password}</span>}
          </label>

          {formError && <p className="cuenta__form-error">{formError}</p>}

          <button type="submit" className="btn-marquee cuenta__submit">
            {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </form>

        <p className="cuenta__sim">Demo · Sin backend ni autenticación real.</p>
      </div>
    </section>
  )
}