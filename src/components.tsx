import { sha256 } from 'js-sha256'

export function id_from_hash(msg: string) {
  return 'id_' + sha256(msg)
}

export const InputBox = () => (
    <input id="prompt" type="text" name="prompt" hx-post="/ask" 
      hx-trigger="submit from:form" hx-target="div#chat" 
      hx-swap="beforeend scroll:#chat:bottom" hx-swap-oob="true" 
      placeholder='Type your message here!' />
)
export const Spinner = ({prompt, swap}) => {
    return <div id={id_from_hash(prompt)} class="message ai" hx-swap-oob={swap}>
      <div class="typing typing-1"></div>
      <div class="typing typing-2"></div>
      <div class="typing typing-3"></div>
    </div>
}
export const ChatComponent = () => (
  <div class="center">
    <div class="chat">
      <div class="contact bar">
        <div class="pic cloudflare"></div>
        <div class="name">LangChain JS 🦜️🔗 + Cloudflare Pages, Workers, and AI Geteway</div>
        <div class="seen"></div>
      </div>
      <div class="messages" id="chat">
      </div>
      <form hx-post="/answer" hx-swap="beforeend scroll:#chat:bottom">
        <div class="input">
          <InputBox />
          <button type="submit"><i class="fas fa-paper-plane"></i></button>
        </div>
        <div id="history"></div>
      </form>
    </div>
  </div>
)
