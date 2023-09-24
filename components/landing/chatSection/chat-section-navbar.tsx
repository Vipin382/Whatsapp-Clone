"use client";

import IconButton from "@/components/common/IconButton";
import UserAvatar from "@/components/common/user-avatar";
import { useNavbarAction } from "@/components/providers/navbar-action-provider";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSocket } from "@/components/providers/socket-provider";

const ChatSectionNavbar = () => {
  const { setSearch, setChatSettings } = useNavbarAction();
  const { isConnected } = useSocket();
  return (
    <nav className="left-0 z-[1] right-0 top-0 absolute flex px-4 items-center h-[57.5px] bg-mainPrimaryDark">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center w-full gap-x-3 justify-center">
          <UserAvatar size={30} hover={false} src={""} />
          <div
            onClick={() => {
              setChatSettings(true);
              setSearch(false);
            }}
            className="flex-1 cursor-pointer h-full w-full"
          >
            <div className="flex items-center space-x-2">
              <h1 className="text-xl">Pranshu</h1>
              <Badge
                className={cn(
                  "text-[10px] translate-y-[2px] border-none px-2 py-[2px] text-white",
                  isConnected ? "bg-green-500" : "bg-red-500"
                )}
              >
                {isConnected ? "Online" : "Offline"}
              </Badge>
            </div>
          </div>
        </div>
        <div className="inline-flex">
          <IconButton
            onClick={() => {
              setSearch(true);
              setChatSettings(false);
            }}
          >
            <BiSearch className="text-white/50" size={26} />
          </IconButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton className="active:bg-white/10 rounded-full h-10 w-10">
                <BsThreeDotsVertical className=" text-white/60" size={26} />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-10 bg-mainPrimaryDark border-none shadow-2xl  rounded">
              <DropdownMenuGroup className=" py-3 text-white/80">
                <DropdownMenuItem className="px-5 py-2 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                  Group info
                </DropdownMenuItem>
                <DropdownMenuItem className="px-5 py-2 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                  Select messages
                </DropdownMenuItem>
                <DropdownMenuItem className="px-5 py-2 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                  Mute notifications
                </DropdownMenuItem>
                <DropdownMenuItem className="px-5 py-2 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                  Clear chats
                </DropdownMenuItem>
                <DropdownMenuItem className="px-5 py-2 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                  Exit group
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default ChatSectionNavbar;
