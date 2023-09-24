import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import React from "react";

interface IFormCustomButton
  extends React.HTMLAttributes<HTMLButtonElement>,
    ButtonProps {}

const IconButton = React.forwardRef<HTMLButtonElement, IFormCustomButton>(
  ({ children, className, ...props }, ref) => {
    return (
      <Button
        className={cn(
          "p-0 bg-transparent hover:bg-transparent focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 cursor-pointer",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
export default IconButton;
