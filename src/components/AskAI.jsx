import React, { useState, useRef, useEffect } from "react";
import "../styles/AskAI.css";

function AskAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Add a placeholder for the assistant's response
    setMessages([...newMessages, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6)); // Remove "data: " prefix
            if (data.content) {
              assistantContent += data.content;
              setMessages([
                ...newMessages,
                { role: "assistant", content: assistantContent },
              ]);
            }
          } catch (e) {
            // Skip malformed JSON
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please make sure the AI server is running.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ask-ai-container">
      <h2 className="ask-ai-header">Ask AI About Me</h2>
      <p className="ask-ai-description">
        Ask questions about Justin's experience, skills, or background.
      </p>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-placeholder">
            Try asking: "What programming languages does Justin know?" or "Tell me about his work experience."
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.role === "user" ? "user-message" : "assistant-message"}`}
          >
            <div className="message-role">
              {msg.role === "user" ? "You" : "AI"}
            </div>
            <div className="message-content">{msg.content || "..."}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my experience, skills, projects..."
          className="chat-input"
          disabled={isLoading}
        />
        <button type="submit" className="chat-submit" disabled={isLoading}>
          {isLoading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default AskAI;
