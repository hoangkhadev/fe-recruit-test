import { useStorage } from "@/hooks/useStorage";
import { GoogleGenAI } from "@google/genai";
import { useEffect, useRef, useState } from "react";

const CHAT_HISTORY_KEY = "chat-history";

export const useChatbot = () => {
  const { getItem, setItem } = useStorage();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState(() => {
    return getItem(CHAT_HISTORY_KEY) ?? [];
  });
  const [currentChatId, setCurrentChatId] = useState(null);
  const currentChat = chatHistory.find((c) => c.id === currentChatId) || {
    id: null,
    title: "",
    data: [],
  };
  const isPausedRef = useRef(false);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_API_KEY,
  });

  const addNewChat = () => {
    setCurrentChatId(null);
  };

  const renameChat = (id, newTitle) => {
    setChatHistory((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    );
  };

  const deleteChat = (id) => {
    setChatHistory((prev) => prev.filter((c) => c.id !== id));
    setCurrentChatId(null);
  };

  const addMessage = (chatId, from, message) => {
    if (!chatId) return;

    setChatHistory((prev) =>
      prev.map((c) =>
        c.id === chatId ? { ...c, data: [...c.data, { from, message }] } : c
      )
    );
  };

  const selectChat = (id) => {
    setCurrentChatId(id);
  };

  const handleSend = async () => {
    const text = message.trim();
    if (!text || isBotThinking) return;

    let chatId = currentChatId;
    if (!chatId) {
      const newId = `chat-${Date.now()}`;
      const newChat = { id: newId, title: "Untitled", data: [] };
      setChatHistory((prev) => [...prev, newChat]);
      setCurrentChatId(newId);
      chatId = newId;
    }

    addMessage(chatId, "userText", text);
    setMessage("");
    setIsBotThinking(true);
    isPausedRef.current = false;

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text,
    });

    setIsBotThinking(false);
    const reply =
      res.text ||
      "Xin lỗi hiện tại hệ thống đang bảo trì, Vui lòng gửi lại sau nhé!";
    addMessage(chatId, "botText", "");
    setIsTyping(true);

    const words = reply.split(" ");
    let current = "";
    for (let i = 0; i < words.length; i++) {
      if (isPausedRef.current) {
        setIsTyping(false);
        return;
      }
      current += words[i] + " ";

      setChatHistory((prev) =>
        prev.map((chat) => {
          if (chat.id !== chatId) return chat;
          const data = [...chat.data];

          const lastIndex = data.map((m) => m.from).lastIndexOf("botText");
          if (lastIndex < 0) return chat;

          data[lastIndex] = {
            ...data[lastIndex],
            message: current,
          };
          return { ...chat, data };
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 20));
    }
    setIsTyping(false);
  };

  const handlePause = () => {
    isPausedRef.current = true;
    setIsTyping(false);
    setIsBotThinking(false);
  };

  useEffect(() => {
    setItem(CHAT_HISTORY_KEY, chatHistory);
  }, [chatHistory, setItem]);

  return {
    message,
    isBotThinking,
    chatHistory,
    currentChat,
    currentChatId,
    isTyping,
    setMessage,
    addNewChat,
    renameChat,
    deleteChat,
    selectChat,
    addMessage,
    handleSend,
    handlePause,
  };
};
