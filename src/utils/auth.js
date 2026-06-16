export const AUTH_STORAGE_KEY = 'gb_auth'
export const USER_STORAGE_KEY = 'gb_user'

export const normalizePhone = (phone = '') => phone.replace(/\D/g, '')

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export const setAuthenticated = () => {
  window.localStorage.setItem(AUTH_STORAGE_KEY, 'true')
}

export const clearAuthenticated = () => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}

export const getStoredUser = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const rawUser = window.localStorage.getItem(USER_STORAGE_KEY)

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser)
  } catch {
    return null
  }
}

export const saveUser = ({ fullName, phone, birthDate }) => {
  const payload = {
    fullName: fullName.trim(),
    phone: normalizePhone(phone),
    birthDate,
  }

  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(payload))
}

export const matchesUserCredentials = ({ phone, birthDate }) => {
  const storedUser = getStoredUser()

  if (!storedUser) {
    return false
  }

  return storedUser.phone === normalizePhone(phone) && storedUser.birthDate === birthDate
}
