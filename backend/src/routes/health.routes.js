import { Router } from 'express'
import pool from '../db.js'

const router = Router()

router.get('/', async (_request, response) => {
  try {
    await pool.query('SELECT 1 AS ok')

    response.json({
      success: true,
      database: 'connected',
    })
  } catch {
    response.status(500).json({
      success: false,
      database: 'error',
    })
  }
})

export default router
