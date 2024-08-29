export const InputBox = () => (
    <input id="prompt" type="text" name="prompt" hx-post="/ask" 
      hx-trigger="submit from:form" hx-target="div#chat" 
      hx-swap="beforeend" hx-swap-oob="true" />
)
export const ChatComponent = () => (
  <div class="center">
    <div class="chat">
      <div class="contact bar">
        <div class="pic"></div>
        <div class="name">Cloudflare AI Gateway</div>
        <div class="seen"></div>
      </div>
      <div class="messages" id="chat">
      </div>
      <div class="messages">
        <div id="spinner" class="message ai htmx-indicator">
          <div class="typing typing-1"></div>
          <div class="typing typing-2"></div>
          <div class="typing typing-3"></div>
        </div>
      </div>
      <form hx-post="/answer" hx-swap="beforeend" hx-target="div#chat">
        <div class="input">
          <InputBox />
        </div>
        <div id="history"></div>
        <button type="submit" style="display: none">Send</button>
      </form>
    </div>
  </div>
)
