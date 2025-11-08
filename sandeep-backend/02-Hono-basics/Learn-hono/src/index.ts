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

export default app
