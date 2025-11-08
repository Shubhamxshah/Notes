import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono()

app.get(
  '/hello',
  zValidator('query',
    z.object({ name: z.string() })), (c) => {
      const { name } = c.req.valid('query')
      return c.json({
        message: `hello ${name}`,
      })
    })

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/post', (c) => c.text('POST /'))

app.get('/wild/*/card', (c) => {
  return c.text('GET /wild/*/card')
})

export default app
