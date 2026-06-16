import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import authRoutes from './routes/auth.routes.js'
import dbTestRoutes from './routes/db-test.routes.js'
import healthRoutes from './routes/health.routes.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 3001)

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

app.use('/api/health', healthRoutes)
app.use('/api/db-test', dbTestRoutes)
app.use('/api/auth', authRoutes)

app.use((error, _request, response, _next) => {
  response.status(500).json({
    message: error.message || 'Erro interno no servidor.',
  })
})

app.listen(port, () => {
  console.log(`Backend Guilherme Barbershop a correr na porta ${port}`)
})
