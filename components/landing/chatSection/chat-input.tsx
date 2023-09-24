import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

interface IFormInput extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: React.ReactNode;
}

const ChatInput = React.forwardRef<HTMLInputElement, IFormInput>(
  ({ className, Icon, ...props }, ref) => {
    return (
      <div className="flex overflow-hidden bg-chatForeground w-full items-center h-full px-3 rounded-lg">
        {Icon ?? ""}
        <Input
          className={cn(
            "h-full bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none text-xs rounded-none  focus-visible:outline-none focus-visible:border-none",
            className
          )}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

export default ChatInput;
