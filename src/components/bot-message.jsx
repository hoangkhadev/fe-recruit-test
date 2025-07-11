import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const TYPING_SPEED = 20;

export function BotMessage({ fullText, isLastMessage }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isLastMessage) {
      setDisplayedText("");

      if (fullText) {
        let i = 0;
        const intervalId = setInterval(() => {
          if (i < fullText.length) {
            setDisplayedText((prev) => prev + fullText.charAt(i));
            i++;
          } else {
            clearInterval(intervalId);
          }
        }, TYPING_SPEED);

        return () => clearInterval(intervalId);
      }
    } else {
      setDisplayedText(fullText);
    }
  }, [fullText, isLastMessage]);

  return (
    <div className="px-4 py-2 rounded-lg text-base font-medium whitespace-pre-line max-w-xl bg-neutral-50 text-gray-800 self-start text-left">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
    </div>
  );
}
