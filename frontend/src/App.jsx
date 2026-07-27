import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("ドテフン");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("api/messages")
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch(() => setError("メッセージの取得に失敗しました"));
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (!username.trim() || !text.trim()) {
      return;
    }

    try {
      const response = await fetch("api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          text: text.trim(),
        }),
      });

      const newMessage = await response.json();

      setMessages((current) => [...current, newMessage]);
      setText("");
      setError("");
    } catch {
      setError("メッセージの送信に失敗しました");
    }
  };

  return (
    <main className="app">
      <section className="chat">
        <header className="chatHeader">
          <div>
            <p className="label">WEB SYSTEM PROGRAMMING</p>
            <h1>メッセージチャット</h1>
          </div>
          <span className="status">● オンライン</span>
        </header>

        <div className="messageList">
          {messages.length === 0 && (
            <p className="emptyMessage">
              まだメッセージはありません。
            </p>
          )}

          {messages.map((message) => (
            <article className="message" key={message.id}>
              <strong>{message.username}</strong>
              <p>{message.text}</p>
            </article>
          ))}
        </div>

        {error && <p className="error">{error}</p>}

        <form className="messageForm" onSubmit={sendMessage}>
          <input
            className="nameInput"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="名前"
          />

          <input
            className="textInput"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="メッセージを入力"
          />

          <button type="submit">送信</button>
        </form>
      </section>
    </main>
  );
}

export default App;