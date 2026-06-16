export const AUTH_STORAGE_KEY = 'gb_auth'
export const USER_STORAGE_KEY = 'gb_user'

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
  window.localStorage.removeItem(USER_STORAGE_KEY)
}

export const saveCurrentUser = (user) => {
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export const getCurrentUser = () => {
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
