export const ChatBot = () => (
  <div>
    <ul id="history">
    </ul>
    <form hx-post="/chat" hx-target="ul">
      <div id="messages">
      </div>
      <label>
        <input type="text" name="prompt"/>
      </label>
      <button type="submit">Send</button>
    </form>
  </div>
)
