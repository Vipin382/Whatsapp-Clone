import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import React from "react";

interface IFormCustomButton
  extends React.HTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  Icon?: React.ReactNode;
  loading?: boolean;
}

const FormCustomButton = React.forwardRef<HTMLButtonElement, IFormCustomButton>(
  ({ children, Icon, loading, ...props }, ref) => {
    return (
      <Button disabled={loading} ref={ref} {...props}>
        {loading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : ""}
        {Icon && Icon}
        {children}
      </Button>
    );
  }
);
export default FormCustomButton;
