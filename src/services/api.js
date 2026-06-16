const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : { message: await response.text() }

  if (!response.ok) {
    throw new Error(payload.message || 'Ocorreu um erro. Tente novamente.')
  }

  return payload
}

export const registerUser = (data) =>
  request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const loginUser = (data) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const getApiHealth = () => request('/health')

export const getDatabaseStatus = () => request('/db-test')
