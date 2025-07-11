import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";

import { AppConfig } from "@/config/app";
import { BoxIcon } from "@/components/ui/box-icon";
import { BotMessage } from "@/components/bot-message";

import logo from "@/assets/images/logo.png";
import { PaperAirplane, Plus } from "@/assets/icons";
import { generateReply } from "@/utils/generate-reply";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const replyText = generateReply(input, messages);
    const botReply = {
      from: "bot",
      text: replyText,
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput("");
    setIsBotTyping(true);
  };

  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isBotTyping]);

  return (
    <div className="bg-gradient-to-b from-primary/30 to-white p-6">
      <Helmet>
        <title>{AppConfig.appName} | Khám phá các khóa học cùng Udemi AI</title>
      </Helmet>
      <div className="max-w-4xl mx-auto text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="w-20 h-20 rounded-full border-4 border-white shadow"
          />
        </div>

        {/* Greeting */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-green-200 text-transparent bg-clip-text">
          Xin chào!
        </h2>
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-neutral-700">
          Udemi AI có thể giúp gì cho bạn?
        </h1>

        <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col">
          {messages.map((msg, idx) => {
            const isLastMessage = idx === messages.length - 1;
            if (msg.from === "bot") {
              return (
                <BotMessage
                  key={idx}
                  fullText={msg.text}
                  isLastMessage={isLastMessage}
                />
              );
            }
            return (
              <div
                key={idx}
                className={`px-4 py-2 rounded-lg text-base font-medium whitespace-pre-line ${
                  msg.from === "bot"
                    ? "bg-neutral-50 text-gray-800 self-start text-left"
                    : "bg-primary text-white self-end text-right"
                }`}
                style={{
                  alignSelf: msg.from === "bot" ? "flex-start" : "flex-end",
                }}
              >
                {msg.text}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input box */}
        <div className="sticky bottom-0 w-full left-0">
          <div className="flex items-center bg-white rounded-xl border border-neutral-300 px-4 py-6 max-w-4xl mx-auto">
            <BoxIcon className="border border-neutral-200">
              <Plus className="!size-5" />
            </BoxIcon>
            <input
              type="text"
              placeholder="Hỏi Udemi AI"
              className="flex-1 outline-none px-2 font-medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <BoxIcon
              className="!text-gray-400 hover:!text-primary text-xl border border-neutral-200"
              onClick={handleSend}
            >
              <PaperAirplane />
            </BoxIcon>
          </div>
        </div>
      </div>
    </div>
  );
}
