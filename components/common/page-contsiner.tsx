import { cn } from "@/lib/utils";
import React from "react";

interface IPageContainer extends React.HTMLAttributes<HTMLDialogElement> {
  children: React.ReactNode;
}

const PageContainer = ({ children, className }: IPageContainer) => {
  return (
    <div
      className={cn(
        "container px-4 py-4 sm:py-6 md:py-8 sm:px-6 md:px-12",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;
