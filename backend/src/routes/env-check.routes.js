import { Router } from 'express'

const router = Router()

const hasEnvValue = (key) => Boolean(process.env[key]?.trim())

router.get('/', (_request, response) => {
  response.json({
    DB_HOST: hasEnvValue('DB_HOST'),
    DB_PORT: hasEnvValue('DB_PORT'),
    DB_USER: hasEnvValue('DB_USER'),
    DB_PASSWORD: hasEnvValue('DB_PASSWORD'),
    DB_NAME: hasEnvValue('DB_NAME'),
    PORT: hasEnvValue('PORT'),
    CORS_ORIGIN: hasEnvValue('CORS_ORIGIN'),
  })
})

export default router
