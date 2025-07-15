import { useCallback, useEffect, useRef, useState } from "react";

import { useStorage } from "@/hooks/useStorage";
import {
  ArrowPointingIn,
  ArrowPointingOut,
  EllipsisHorizontal,
  EllipsisVertical,
  Pencil,
  PencilSquare,
  QuestionMarkCircle,
  Sparkles,
  Trash,
} from "@/assets/icons";

const SIDEBAR_STORAGE_KEY = "sidebar-status";

export default function ChatbotSidebar({
  chatHistory,
  currentChatId,
  selectChat,
  addNewChat,
  renameChat,
  deleteChat,
}) {
  const { setItem, getItem } = useStorage();

  const [title, setTitle] = useState("");
  const [oldTitle, setOldTitle] = useState("");
  const [renameId, setRenameId] = useState(null);
  const [showIconId, setShowIconId] = useState(null);
  const [showMenuId, setShowMenuId] = useState(null);
  const [isOpen, setIsOpen] = useState(() => {
    return getItem(SIDEBAR_STORAGE_KEY) || false;
  });

  const ref = useRef(null);
  const inputRef = useRef(null);
  const sideBarRef = useRef(null);

  const handleRename = useCallback(() => {
    if (title.length === 0 || title === oldTitle) return;
    renameChat(renameId, title.trim() || oldTitle);
    setRenameId(null);
  }, [renameChat, renameId, title, oldTitle]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowMenuId(null);
      }
      if (
        renameId &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        handleRename();
        setRenameId(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [renameId, oldTitle, title, handleRename]);

  useEffect(() => {
    setItem(SIDEBAR_STORAGE_KEY, isOpen);
  }, [isOpen, setItem]);

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className={`fixed top-20 left-4 cursor-pointer z-[1002] text-neutral-600 hover:text-primary transition-all duration-300 ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <ArrowPointingOut />
      </div>

      <div
        id="sidebar-chatbot"
        ref={sideBarRef}
        className={`${
          isOpen
            ? "-translate-x-0 opacity-100 w-full visible"
            : "opacity-0 -translate-x-full w-0 invisible"
        } absolute lg:relative flex flex-col h-full max-w-[300px] border-r border-r-neutral-300 bg-white transition-all duration-400`}
      >
        <div className="flex items-center justify-between text-neutral-700 border-b p-3 border-b-neutral-200">
          <div
            onClick={() => setIsOpen(false)}
            className="cursor-pointer hover:text-primary transition-colors duration-300"
          >
            <ArrowPointingIn />
          </div>
          <div
            onClick={() => addNewChat()}
            className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors duration-300"
          >
            <PencilSquare />
            <p className="text-sm font-medium mt-1">Tạo Chat Mới</p>
          </div>
        </div>

        <div className="p-3 flex-1 overflow-auto custom-scrollbar">
          <h3 className="text-sm font-medium">Chats</h3>

          <div className="mt-4 grid gap-[2px]">
            {chatHistory?.map((chat, index) => {
              const isActive = currentChatId === chat.id;
              const isShowIcon =
                showIconId === chat.id || showMenuId === chat.id;

              return (
                <div key={index} className="relative">
                  <div
                    onMouseOver={() => setShowIconId(renameId ? null : chat.id)}
                    onMouseOut={() => setShowIconId(null)}
                    onClick={() => {
                      selectChat(chat.id);
                    }}
                    className={`rounded-lg hover:bg-neutral-300/20 hover:text-primary transition-all duration-300 cursor-pointer flex items-center justify-between  ${
                      isActive
                        ? "bg-neutral-300/10 font-medium text-primary"
                        : "text-neutral-700"
                    }`}
                  >
                    {renameId ? (
                      <input
                        ref={renameId === chat.id ? inputRef : null}
                        value={renameId === chat.id ? title : chat.title}
                        className={`border ring-1 rounded outline-none transition-all duration-300 w-full line-clamp-1 py-2 px-3 ${
                          renameId === chat.id
                            ? "border-primary caret-primary ring-primary"
                            : "caret-transparent border-transparent ring-transparent cursor-pointer"
                        }`}
                        onChange={(e) => setTitle(e.target.value)}
                        readOnly={!renameId === chat.id}
                        onKeyDown={(e) => e.key === "Enter" && handleRename()}
                      />
                    ) : (
                      <div className="rounded outline-none transition-all duration-300 w-full line-clamp-1 py-2 px-3">
                        {chat.title}
                      </div>
                    )}
                    <div
                      className={`pr-2 ${
                        isActive
                          ? "hover:text-green-800"
                          : "hover:text-neutral-800"
                      } ${isShowIcon ? "block" : "hidden"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenuId((prev) =>
                          prev === chat.id ? null : chat.id
                        );
                      }}
                    >
                      <EllipsisVertical className="w-5 h-5" />
                    </div>
                  </div>
                  <div
                    ref={ref}
                    className={`${
                      showMenuId === chat.id ? "block" : "hidden"
                    } absolute top-full right-0 bg-white border border-neutral-200 shadow p-1 rounded-lg min-w-[140px] z-[50]`}
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setRenameId(chat.id);
                        setShowMenuId(null);
                        setTitle(chat.title);
                        setOldTitle(chat.tiTitle);
                        setTimeout(() => {
                          inputRef.current.focus();
                          inputRef.current.select();
                        }, 0);
                      }}
                      className="flex items-center gap-2 rounded-lg p-2 hover:bg-neutral-300/20 cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                      <p className="text-sm font-medium">Rename</p>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
                      className="flex items-center gap-2 text-rose-500 rounded-lg p-2 hover:bg-neutral-300/20 cursor-pointer"
                    >
                      <Trash className="w-4 h-4" />
                      <p className="text-sm font-medium">Delete</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-3 border-t border-t-neutral-200">
          <div className="flex items-center gap-2 hover:bg-primary/20 p-2 rounded-lg cursor-pointer transition-colors duration-300">
            <Sparkles className="w-5 h-5 fill-primary text-primary" />
            <p className="font-medium">Về Udemi AI</p>
          </div>
          <div className="flex items-center gap-2 hover:bg-primary/20 p-2 rounded-lg cursor-pointer transition-colors duration-300">
            <QuestionMarkCircle className="w-5 h-5" />
            <p className="font-medium">Câu hỏi thường gặp</p>
          </div>
        </div>
      </div>

      <div
        className={`fixed lg:invisible bg-black/30 w-full h-full z-[60] transition-all duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}
