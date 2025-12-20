import { Hono } from 'hono'
import type {AppType} from '../../service-A/src/index'
import { hc } from 'hono/client'

const app = new Hono()

const client = hc<AppType>('http://localhost:3000')

app.get('/', async (c) => {
  const response = await client.test.$post({
    json: { name: 'Service B' },
  })

  const data = await response.json();
  return c.json(data);
})



export default {
  fetch: app.fetch,
  port: 3001,
}