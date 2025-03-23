"use client";

import { forwardRef, useState, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { IconSend } from "../icons/icon";

const inputVariants = cva(
  "w-full max-h-32 h-fit resize-none overflow-y-scroll no-scrollbar text-black rounded-lg focus:outline-none focus:ring-none p-2",
  {
    variants: {
      variant: {
        default: "focus:ring-none",
        error: "border-red-500 focus:ring-red-500",
        success: "border-green-500 focus:ring-green-500",
      },
      size: {
        sm: "text-sm py-1 px-2",
        md: "text-base py-2 px-3",
        lg: "text-lg py-3 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, variant, size, ...props }, ref) => {
    const [message, setMessage] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    };

    const sendMessage = () => {
      if (message.trim()) {
        console.log("Sending message:", message);
        setMessage(""); // Reset input after sending
        if (textareaRef.current) {
          textareaRef.current.style.height = "40px";
        }
      }
    };

    return (
      <div className=" w-1/2 h-fit mx-auto max-w-full items-end gap-2 p-3 bg-gray-200 rounded-xl">
        <textarea
          ref={(el) => {
            textareaRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className={cn(inputVariants({ variant, size, className }))}
          rows={1}
          {...props}
        />

        <div className="flex justify-end">
          <button
            onClick={sendMessage}
            className="cursor-pointer bg-gray-50 text-white rounded-full hover:bg-gray-800 transition p-3"
          >
            <IconSend/>
          </button>
        </div>

      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export { ChatInput, inputVariants };
