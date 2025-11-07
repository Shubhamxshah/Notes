import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const route = app.post('/test', zValidator("json", z.object({
    name: z.string()
  })),
  async (c) => {
    const { name } = c.req.valid('json')
    return c.json({ message: `hello ${name}` })
  }
)

export type AppType = typeof route

export default {
  fetch: app.fetch,
  port: 3000,
}