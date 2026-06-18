import './load-env.js'
import cors from 'cors'
import express from 'express'
import authRoutes from './routes/auth.routes.js'
import dbTestRoutes from './routes/db-test.routes.js'
import envCheckRoutes from './routes/env-check.routes.js'
import healthRoutes from './routes/health.routes.js'

const app = express()
const parsedPort = Number(process.env.PORT)
const port = Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : 3000

const corsOriginValue = process.env.CORS_ORIGIN?.trim()
const corsOrigins = corsOriginValue
  ? corsOriginValue.split(',').map((origin) => origin.trim()).filter(Boolean)
  : []

app.use(
  cors({
    origin:
      !corsOrigins.length || corsOrigins.includes('*')
        ? true
        : corsOrigins,
  }),
)

app.use(express.json())

console.log('[startup] NODE_ENV:', process.env.NODE_ENV || 'undefined')
console.log('[startup] PORT:', port)
console.log('[startup] DB_HOST configured:', Boolean(process.env.DB_HOST?.trim()))
console.log('[startup] DB_NAME configured:', Boolean(process.env.DB_NAME?.trim()))
console.log('[startup] DB_USER configured:', Boolean(process.env.DB_USER?.trim()))

app.use('/api/health', healthRoutes)
app.use('/api/env-check', envCheckRoutes)
app.use('/api/db-test', dbTestRoutes)
app.use('/api/auth', authRoutes)

app.use((_request, response) => {
  response.status(404).json({
    message: 'Rota nao encontrada.',
    code: 'ROUTE_NOT_FOUND',
  })
})

app.use((error, request, response, _next) => {
  console.error('[request error]', {
    method: request.method,
    url: request.originalUrl,
    message: error.message || 'Erro interno no servidor.',
    code: error.code || 'INTERNAL_ERROR',
  })

  response.status(error.statusCode || 500).json({
    message: error.message || 'Erro interno no servidor.',
    code: error.code || 'INTERNAL_ERROR',
  })
})

app.listen(port, () => {
  console.log(`Backend Guilherme Barbershop a correr na porta ${port}`)
})
