import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/app/lib/utils"

const chatMessageVariants = cva(
  `rounded-t-4xl `,
  {
    variants: {
      variant: {
        default: "bg-gray-600 rounded-br-4xl ",
        farmer:"bg-gray-100 rounded-bl-4xl rounded-br-md",
        query:"bg-green-100 hover:bg-green-200 hover:cursor-pointer grid justify-start",   
      },
      size: {
        default: "sm:max-w-1/4 md:max-w-1/2 w-fit h-fit p-2 md:p-6 m-4 md:m-2",
        sm: "rounded-md px-3 m-3",
        lg: " rounded-md px-8 m-2",
        icon: " p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ChatMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatMessageVariants> {
  asChild?: boolean;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(chatMessageVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

ChatMessage.displayName = "Chat";

export { ChatMessage, chatMessageVariants };