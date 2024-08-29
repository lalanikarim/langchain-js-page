import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { renderer } from './renderer'
import { ChatComponent, InputBox } from './components'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<ChatComponent/>)
})

app.post('/ask', async (c) => {
  const data = await c.req.formData()
  const prompt = data.get("prompt")
  return c.html([<div class="message human">{prompt}</div>,<InputBox />].join(""))
})

app.post('/answer', async (c) => {
  const { WORKER_URL } = env<{ WORKER_URL: string }>(c)
  const data = await c.req.formData()
  const prompt = data.get("prompt")
  let messages = data.getAll("messages")
  const response = await fetch(WORKER_URL,
    {
      body: JSON.stringify({prompt: prompt, messages: messages}), 
      method: "post",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  const aiRespObj: any = await response.json()
  const aiResp: string = aiRespObj.response
  const history = [...messages, "Human: " + prompt, "AI: " + aiResp].map(
    (msg,idx) => <input type="hidden" name="messages" value={msg}/>
  )
  return c.html(
      [<div class="message ai">{aiResp}</div>,
      <div id="history" hx-swap-oob="true">{history}</div>].join("")
  )
})

export default app
