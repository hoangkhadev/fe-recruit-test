import { PaperAirplane, PauseCircle, Plus } from "@/assets/icons";

export function ChatbotInput({
  message,
  setMessage,
  handleSend,
  inputRef,
  disabled,
  isTyping,
  handlePause,
}) {
  return (
    <div className="sticky bottom-5 py-2 z-[10] bg-white border border-neutral-200 rounded-4xl shadow flex flex-col justify-center px-3 pl-5 focus-within:ring-1 focus-within:ring-primary focus-within:shadow-2xl transition-all duration-300">
      <input
        ref={inputRef}
        className="w-full py-4 outline-none caret-primary"
        placeholder="Hỏi Udemi AI"
        autoFocus={!isTyping}
        value={message}
        disabled={disabled}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && message.length > 0 && handleSend()
        }
      />
      <div className="flex items-center justify-between">
        <div className="w-fit border border-neutral-300 bg-neutral-100 flex items-center justify-between gap-2 px-2 py-[4px] rounded-full text-neutral-600 cursor-pointer hover:border-transparent">
          <Plus className="w-4 h-4" />
          <span className="font-medium ">Đính kèm</span>
        </div>
        <div
          onClick={handleSend}
          className={` p-2 rounded-full ${
            message
              ? "text-primary hover:bg-neutral-100 cursor-pointer"
              : "text-neutral-600 cursor-default"
          } transition-all duration-300 `}
        >
          {isTyping ? (
            <div
              onClick={handlePause}
              className="bg-neutral-200 p-[6px] rounded-lg cursor-pointer hover:bg-neutral-300 transition-colors duration-300"
            >
              <PauseCircle className="animate-pulse w-7 -h-6 text-neutral-500" />
            </div>
          ) : (
            <PaperAirplane />
          )}
        </div>
      </div>
    </div>
  );
}
