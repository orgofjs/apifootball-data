const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const https = require('https')

const app = express()
const PORT = 3001
const DATA_DIR = path.join(__dirname, '..', 'data-stat')

app.use(cors())
app.use(express.json())

// Ensure data-stat directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Proxy + save: POST /api/fetch
app.post('/api/fetch', async (req, res) => {
  const { endpoint, params, apiKey, saveAs } = req.body

  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required' })
  }

  const baseURL = 'https://v3.football.api-sports.io'
  const queryString = params
    ? '?' + Object.entries(params)
        .filter(([, v]) => v !== '' && v !== null && v !== undefined)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&')
    : ''

  const url = `${baseURL}/${endpoint}${queryString}`

  try {
    const options = {
      headers: {
        'x-apisports-key': apiKey,
        'Content-Type': 'application/json',
      }
    }

    const data = await new Promise((resolve, reject) => {
      https.get(url, options, (response) => {
        let body = ''
        response.on('data', (chunk) => (body += chunk))
        response.on('end', () => {
          try {
            resolve(JSON.parse(body))
          } catch (e) {
            reject(new Error('Invalid JSON response'))
          }
        })
      }).on('error', reject)
    })

    // Save to file if saveAs provided
    if (saveAs) {
      const safeName = saveAs.replace(/[^a-zA-Z0-9_\-]/g, '_')
      const filename = `${safeName}_${Date.now()}.json`
      const filePath = path.join(DATA_DIR, filename)
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
      return res.json({ data, savedAs: filename })
    }

    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// List saved files: GET /api/files
app.get('/api/files', (req, res) => {
  try {
    const files = fs.readdirSync(DATA_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        const stat = fs.statSync(path.join(DATA_DIR, f))
        return {
          name: f,
          size: stat.size,
          createdAt: stat.birthtime,
          modifiedAt: stat.mtime,
        }
      })
      .sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt))
    res.json({ files })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get file content: GET /api/files/:name
app.get('/api/files/:name', (req, res) => {
  const safeName = path.basename(req.params.name)
  const filePath = path.join(DATA_DIR, safeName)
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' })
  }
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    res.json({ content: JSON.parse(content), name: safeName })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete a file: DELETE /api/files/:name
app.delete('/api/files/:name', (req, res) => {
  const safeName = path.basename(req.params.name)
  const filePath = path.join(DATA_DIR, safeName)
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' })
  }
  try {
    fs.unlinkSync(filePath)
    res.json({ deleted: safeName })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`\x1b[33m[API SERVER]\x1b[0m Running on http://localhost:${PORT}`)
  console.log(`\x1b[33m[API SERVER]\x1b[0m Saving files to: ${DATA_DIR}`)
})
