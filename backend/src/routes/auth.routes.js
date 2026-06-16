import { Router } from 'express'
import pool from '../db.js'

const router = Router()

const normalizePhone = (phone = '') => phone.replace(/\D/g, '')

const isValidDate = (value = '') => /^\d{4}-\d{2}-\d{2}$/.test(value)

const mapClient = (client) => ({
  id: client.id,
  fullName: client.nome_completo,
  phone: client.telefone,
  birthDate:
    client.data_nascimento instanceof Date
      ? client.data_nascimento.toISOString().slice(0, 10)
      : String(client.data_nascimento).slice(0, 10),
  acceptedPrivacy: Boolean(client.aceite_privacidade),
})

router.post('/register', async (request, response) => {
  const { fullName, phone, birthDate, acceptedPrivacy } = request.body ?? {}

  if (!fullName?.trim()) {
    return response.status(400).json({ message: 'Nome completo obrigatorio.' })
  }

  if (!phone?.trim()) {
    return response.status(400).json({ message: 'Telefone obrigatorio.' })
  }

  if (!birthDate || !isValidDate(birthDate)) {
    return response.status(400).json({ message: 'Data de nascimento obrigatoria.' })
  }

  if (acceptedPrivacy !== true) {
    return response.status(400).json({ message: 'Aceite da Politica de Privacidade obrigatorio.' })
  }

  const normalizedPhone = normalizePhone(phone)

  if (!normalizedPhone) {
    return response.status(400).json({ message: 'Telefone obrigatorio.' })
  }

  try {
    const [existingClients] = await pool.query(
      'SELECT id FROM clientes WHERE telefone = ? AND deleted_at IS NULL LIMIT 1',
      [normalizedPhone],
    )

    if (existingClients.length) {
      return response.status(409).json({ message: 'Ja existe uma conta com este telefone.' })
    }

    const [result] = await pool.query(
      `
        INSERT INTO clientes (
          nome_completo,
          telefone,
          data_nascimento,
          aceite_privacidade
        )
        VALUES (?, ?, ?, ?)
      `,
      [fullName.trim(), normalizedPhone, birthDate, 1],
    )

    const [rows] = await pool.query(
      `
        SELECT
          id,
          nome_completo,
          telefone,
          data_nascimento,
          aceite_privacidade
        FROM clientes
        WHERE id = ?
        LIMIT 1
      `,
      [result.insertId],
    )

    return response.status(201).json({
      client: mapClient(rows[0]),
    })
  } catch (error) {
    return response.status(500).json({
      message: 'Nao foi possivel criar a conta.',
      details: error.code || 'SERVER_ERROR',
    })
  }
})

router.post('/login', async (request, response) => {
  const { phone, birthDate } = request.body ?? {}

  if (!phone?.trim()) {
    return response.status(400).json({ message: 'Telefone obrigatorio.' })
  }

  if (!birthDate || !isValidDate(birthDate)) {
    return response.status(400).json({ message: 'Data de nascimento obrigatoria.' })
  }

  const normalizedPhone = normalizePhone(phone)

  try {
    const [rows] = await pool.query(
      `
        SELECT
          id,
          nome_completo,
          telefone,
          data_nascimento,
          aceite_privacidade
        FROM clientes
        WHERE telefone = ?
          AND data_nascimento = ?
          AND deleted_at IS NULL
        LIMIT 1
      `,
      [normalizedPhone, birthDate],
    )

    if (!rows.length) {
      return response.status(401).json({
        message: 'Dados nao encontrados. Verifique o telefone ou crie uma conta.',
      })
    }

    return response.json({
      client: mapClient(rows[0]),
    })
  } catch (error) {
    return response.status(500).json({
      message: 'Nao foi possivel entrar.',
      details: error.code || 'SERVER_ERROR',
    })
  }
})

export default router
