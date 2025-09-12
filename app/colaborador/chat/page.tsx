"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";

// Define o tipo de mensagem
interface Message {
  text: string;
  sender: "user" | "assistant";
}

const ChatApp = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ text: "Olá, como posso te ajudar?", sender: "assistant" }]);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage: Message = { text: inputMessage, sender: "user" };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");

    setTimeout(() => {
      const newAssistantMessage: Message = {
        text: "Ótima pergunta, esse assunto...",
        sender: "assistant",
      };
      setMessages((prev) => [...prev, newAssistantMessage]);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="flex flex-col h-full bg-[white] text-black rounded-md">
      <div className="flex items-center gap-3 p-4 bg-[#993399] shadow-md">
        <span className="text-lg font-semibold text-white">VIVI</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-md
              ${
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

      <div className="flex items-center gap-2 p-4 border-t text-black border-gray-700">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite uma pergunta..."
          className="flex-1 px-4 py-2 rounded-full bg-[#c9c9c9] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#993399]"
        />
        <button
          onClick={handleSendMessage}
          className="p-3 rounded-full bg-[#993399] hover:bg-[#7A00E6] transition"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatApp;