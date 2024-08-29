import { Hono } from 'hono'
import { renderer } from './renderer'
import { ChatBot } from './components'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<ChatBot/>)
})

app.post('/chat', async (c) => {
  const data = await c.req.formData()
  const prompt = data.get("prompt")
  let messages = data.getAll("messages")
  const response = await fetch("http://localhost:8787",
    {
      body: JSON.stringify({prompt: prompt, messages: messages}), 
      method: "post",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  const aiResp = await response.json()
  const historyItems = [...messages, "Human: " + prompt, "AI: " + aiResp.response].map(msg => <li>{msg}</li>)
  const history = <ul id="history" hx-swap-oob="true">{historyItems}</ul>
  const respMessageList = [...messages, "Human: " + prompt, "AI: " + aiResp.response].map((msg,idx) => <input type="hidden" name="messages" value={msg}/>)
  const respMessages = <div id="messages" hx-swap-oob="true">{respMessageList}</div>
  return c.html([history,respMessages])
})

export default app
