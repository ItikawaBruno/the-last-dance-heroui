"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@heroui/button";

interface Message {
  text: string;
  sender: "user" | "assistant";
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ text: "Olá, como posso te ajudar?", sender: "assistant" }]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { text: inputMessage, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    try {
      const res = await fetch("/api/colaborador/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputMessage }),
      });

      const data = await res.json();
      const assistantMessage: Message = { text: data.message, sender: "assistant" };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { text: "Erro ao conectar com o GPT.", sender: "assistant" },
      ]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="flex flex-col h-full bg-white text-black rounded-md shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-[#993399] shadow-md">
        <span className="text-lg font-semibold text-white">VIVI</span>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-md ${
              msg.sender === "user"
                ? "ml-auto bg-[#993399] text-white"
                : "mr-auto bg-[#d1d1d1] text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 p-4 border-t border-gray-700 text-black">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite uma pergunta..."
          className="flex-1 px-4 py-2 rounded-full bg-[#c9c9c9] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#993399]"
        />
        <Button
          onClick={handleSendMessage}
          className="p-3 rounded-full bg-[#993399] hover:bg-[#7A00E6] transition"
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
}
