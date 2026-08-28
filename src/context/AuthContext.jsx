import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { registerUser, validateLogin } from '../utils/auth.js'

const USERS_KEY = 'cinemaX_users'
const SESSION_KEY = 'cinemaX_session'
const AuthContext = createContext(null)

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : fallback
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function buildSession(user) {
  return {
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }
}

export default function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readJSON(USERS_KEY, []))
  const [user, setUser] = useState(() => readJSON(SESSION_KEY, null))

  useEffect(() => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
    } catch {
      // almacenamiento no disponible
    }
  }, [users])

  const register = useCallback(
    ({ name, email, password }) => {
      const result = registerUser(users, { name, email, password })
      if (result.user) {
        setUsers(result.users)
        const session = buildSession(result.user)
        setUser(session)
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(session))
        } catch {
          // ignorar
        }
      }
      return { ok: Boolean(result.user), errors: result.errors }
    },
    [users],
  )

  const login = useCallback(
    ({ email, password }) => {
      const result = validateLogin({ email, password }, users)
      if (result.ok) {
        const session = buildSession(result.user)
        setUser(session)
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(session))
        } catch {
          // ignorar
        }
      }
      return { ok: result.ok, error: result.error ?? null }
    },
    [users],
  )

  const logout = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch {
      // ignorar
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      register,
      login,
      logout,
    }),
    [user, register, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return context
}