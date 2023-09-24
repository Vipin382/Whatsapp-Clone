import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

interface IFormInput extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormInput = React.forwardRef<HTMLInputElement, IFormInput>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        className={cn(
          "border-chatbackground/10 bg-chatbackground/10 h-8 text-xs focus-visible:ouline focus-visible:outline-none focus-visible:ring-chatbackground/20 focus-visible:ring-offset-chatbackground/80 focus-visible:ring-offset-[0.3px] focus-visible:border-none",
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);

export default FormInput;
