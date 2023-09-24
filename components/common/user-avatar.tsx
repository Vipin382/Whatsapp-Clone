import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { PiCameraPlusDuotone } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

interface IUserAvatar extends React.HtmlHTMLAttributes<HTMLImageElement> {
  src: string;
  loading?: boolean;
  hover?: boolean;
  size?: number;
  hoverClass?: string;
  info?: string;
}

const UserAvatar = ({
  src,
  className,
  loading = false,
  onClick,
  hover = true,
  size,
  hoverClass,
  info,
  ...props
}: IUserAvatar) => {
  return (
    <Avatar
      className={cn(className, "overflow-hidden cursor-pointer relative")}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex h-full w-full rounded-full justify-center items-center">
          <Loader2Icon className="mr-2 text-chatbackground h-4 w-4 animate-spin" />
        </div>
      ) : (
        <>
          {hover ? (
            <div
              className={cn(
                "absolute flex-col inset-0 flex justify-center items-center rounded-full dark:bg-chatPrimary bg-chatPrimaryLight transition-opacity bg-black/20 duration-200 opacity-0 hover:opacity-100",
                hoverClass
              )}
            >
              <PiCameraPlusDuotone size={25} />
              <span className="text-[10px] text-neutral-300 ">
                {info ? info : "Click here"}
              </span>
            </div>
          ) : (
            ""
          )}
          <AvatarImage src={src} {...props} />
          <AvatarFallback>
            <BiSolidUser size={size} className="text-neutral-300/60" />
          </AvatarFallback>
        </>
      )}
    </Avatar>
  );
};

export default UserAvatar;
