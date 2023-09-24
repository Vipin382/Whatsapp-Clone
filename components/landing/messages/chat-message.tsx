import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

interface IChatMessage {
  friend?: boolean;
  message: string;
  time: string;
}

const ChatMessage = ({ friend = false, message, time }: IChatMessage) => {
  return (
    <div className={cn("w-full mt-1 flex", friend ? "" : "justify-end")}>
      <div
        className={cn(
          "text-white flex relative max-w-fit gap-x-2 group  px-2 pt-2 pb-1  rounded-md",
          friend ? "bg-mainPrimaryDark" : "bg-[#005c4b]"
        )}
      >
        <div
          className={cn(
            "poly-path rounded-xs h-4 w-4 absolute top-0 ",
            friend
              ? "left-[-10px] -rotate-90 bg-mainPrimaryDark"
              : "right-[-10px] rotate-180 bg-[#005c4b]"
          )}
        ></div>

        <p className="max-w-[200px] break-words">{message}</p>
        <div className=" relative flex flex-col h-full overflow-hidden transition-all justify-end ">
          <div
            className={cn(
              "absolute -top-1  h-[20px] transition-all group-hover:translate-x-0  translate-x-full right-0  cursor-pointer",
              friend ? "bg-mainPrimaryDark" : "bg-[#005c4b]"
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="active:bg-white/10  rounded-full h-6 w-6">
                  <IoIosArrowDown size={20} className="text-neutral-400" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" ml-[60px] -mt-3 bg-mainPrimaryDark border-none shadow-2xl p-0 rounded">
                <DropdownMenuGroup className="space-y-3 py-3 text-white/80">
                  <DropdownMenuItem className="px-6 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                    Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                    React
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                    Star
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                    Report
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <span className={cn("text-[10px] float-right ")}>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
