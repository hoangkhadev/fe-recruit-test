import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

import { Sparkles } from "@/assets/icons";
import logo from "@/assets/images/logo.png";
import { useChatbot } from "@/hooks/useChatbot";

import ChatbotSidebar from "@/pages/chatbot/ChatbotSidebar";
import { ChatbotInput } from "@/pages/chatbot/ChatbotInput";

export default function ChatbotPage() {
  const {
    message,
    isBotThinking,
    currentChatId,
    chatHistory,
    currentChat,
    isTyping,
    setMessage,
    addNewChat,
    renameChat,
    deleteChat,
    selectChat,
    handleSend,
    handlePause,
  } = useChatbot();

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const handleAddNewChat = () => {
    addNewChat();
    inputRef.current.focus();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.data]);

  return (
    <div className="bg-gradient-to-b from-primary/30 to-white fixed top-[70px] left-0 right-0 bottom-0">
      <div className="relative flex h-full overflow-hidden">
        <ChatbotSidebar
          chatHistory={chatHistory}
          addNewChat={handleAddNewChat}
          currentChatId={currentChatId}
          selectChat={selectChat}
          renameChat={renameChat}
          deleteChat={deleteChat}
        />

        <div className="flex justify-center items-center w-full h-full custom-scrollbar overflow-auto px-6">
          <div className="w-full max-w-3xl py-10 h-full flex flex-col justify-between">
            <div className="pb-10 flex-1">
              {currentChat && currentChat.data?.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {currentChat.data.map((m, i) => {
                    return (
                      m.message?.length > 0 && (
                        <div className={`message ${m.from}`} key={i}>
                          <Markdown
                            rehypePlugins={[rehypeHighlight]}
                            remarkPlugins={[remarkGfm]}
                          >
                            {m.message}
                          </Markdown>
                        </div>
                      )
                    );
                  })}
                  {isBotThinking && (
                    <div className="animate-pulse flex items-center gap-2 botText message text-sm">
                      <Sparkles />
                      <p>Thinking...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid place-items-center text-center gap-2 mt-20">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-20 h-20 rounded-full border-4 border-white shadow"
                  />
                  <h2 className="text-xl font-bold bg-gradient-to-r from-green-800 to-green-400 text-transparent bg-clip-text">
                    Xin chào!
                  </h2>
                  <h1 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-700">
                    Udemi AI có thể giúp gì cho bạn?
                  </h1>
                </div>
              )}
            </div>
            <div ref={bottomRef}></div>

            <ChatbotInput
              inputRef={inputRef}
              message={message}
              setMessage={setMessage}
              handleSend={handleSend}
              disabled={isBotThinking}
              isTyping={isTyping}
              handlePause={handlePause}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
