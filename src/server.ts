import { createServer } from 'http'
import app from './index'

export function createServerInstance() {
  return createServer((req, res) => {
    app.fetch(req as Request, {})
      .then(response => {
        res.writeHead(response.status, response.headers.raw())
        response.body?.pipe(res)
      })
      .catch(err => {
        res.statusCode = 500
        res.end(`Error: ${err.message}`)
      })
  })
}

