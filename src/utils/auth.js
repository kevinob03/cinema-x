const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

export function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

export function findUserByEmail(users, email) {
  const target = normalizeEmail(email)
  return users.find((user) => user.email === target) ?? null
}

export function validateRegistration({ name = '', email = '', password = '' }, users) {
  const errors = {}

  if (!name.trim()) {
    errors.name = 'El nombre es obligatorio.'
  } else if (name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.'
  }

  const normalizedEmail = normalizeEmail(email)
  if (!email.trim()) {
    errors.email = 'El correo es obligatorio.'
  } else if (!EMAIL_PATTERN.test(normalizedEmail)) {
    errors.email = 'Ingresa un correo válido.'
  } else if (findUserByEmail(users, normalizedEmail)) {
    errors.email = 'Ya existe una cuenta con este correo.'
  }

  if (!password) {
    errors.password = 'La contraseña es obligatoria.'
  } else if (password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres.'
  }

  return { ok: Object.keys(errors).length === 0, errors }
}

export function validateLogin({ email = '', password = '' }, users) {
  const user = findUserByEmail(users, email)
  if (!user) {
    return { ok: false, error: 'No hay cuenta registrada con ese correo.' }
  }
  if (user.password !== password) {
    return { ok: false, error: 'La contraseña no coincide.' }
  }
  return { ok: true, user }
}

export function registerUser(users, { name = '', email = '', password = '' }) {
  const validation = validateRegistration({ name, email, password }, users)
  if (!validation.ok) {
    return { user: null, users, errors: validation.errors }
  }

  const user = {
    name: name.trim(),
    email: normalizeEmail(email),
    password,
    createdAt: new Date().toISOString(),
  }

  return { user, users: [...users, user], errors: {} }
}