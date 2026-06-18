import { Router } from 'express'
import pool from '../db.js'

const router = Router()
const DATABASE_TEST_TIMEOUT_MS = 4000
const REQUIRED_ENV_KEYS = [
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
]

const hasValue = (value) => Boolean(value?.trim())

const createTimeoutError = () => {
  const error = new Error('Tempo limite ao ligar a base de dados.')
  error.code = 'DB_TIMEOUT'
  return error
}

router.get('/', async (_request, response) => {
  const missingEnvKeys = REQUIRED_ENV_KEYS.filter((key) => !hasValue(process.env[key]))

  if (missingEnvKeys.length) {
    return response.status(500).json({
      success: false,
      database: 'error',
      message: `Variaveis em falta: ${missingEnvKeys.join(', ')}`,
      code: 'DB_ENV_MISSING',
    })
  }

  try {
    await Promise.race([
      pool.query('SELECT 1 AS ok'),
      new Promise((_, reject) => {
        setTimeout(() => reject(createTimeoutError()), DATABASE_TEST_TIMEOUT_MS)
      }),
    ])

    return response.json({
      success: true,
      database: 'connected',
    })
  } catch (error) {
    return response.status(500).json({
      success: false,
      database: 'error',
      message: error.message || 'Nao foi possivel ligar a base de dados.',
      code: error.code || 'DB_ERROR',
    })
  }
})

export default router
