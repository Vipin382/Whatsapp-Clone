"use client";
import React from "react";
import UserAvatar from "../common/user-avatar";
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IListItemProps {
  children: React.ReactNode;
}

const ListItem = ({
  name,
  about,
  profile = "",
}: {
  name: string;
  about: string;
  profile: string;
}) => {
  return (
    <>
      <UserAvatar size={30} className="h-14 w-14" hover={false} src={profile} />
      <div className="flex flex-col border-b h-full w-full justify-center">
        <div className=" flex items-center w-full justify-between">
          <h2 className="capitalize">{name}</h2>
          <span className="capitalize text-xs text-white/60">
            {"yesterday"}
          </span>
        </div>
        <div className="flex justify-between w-full items-center">
          <div className="text-white/50 text-xs w-full text-start flex-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-[240px]">
            {about}
          </div>
          <div className="inline-flex gap-x-4 group-hover:gap-x-1 group-hover:translate-x-0 translate-x-10 transition-all justify-between items-center ">
            <span className="rounded-full cursor-pointer flex justify-center items-center h-5 w-5 text-xs bg-chatbackground text-chatPrimary font-medium  p-2">
              {20}
            </span>
            <span className="cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="active:bg-white/10  rounded-full h-6 w-6">
                    <IoIosArrowDown size={20} className="text-neutral-400" />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 ml-44 bg-mainPrimaryDark border-none shadow-2xl p-0 rounded">
                  <DropdownMenuGroup className="space-y-3 py-3 text-white/80">
                    <DropdownMenuItem className="px-6 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                      Archive chat
                    </DropdownMenuItem>
                    <DropdownMenuItem className="px-6 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                      Exit group
                    </DropdownMenuItem>
                    <DropdownMenuItem className="px-6 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                      Pin chat
                    </DropdownMenuItem>
                    <DropdownMenuItem className="px-6 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                      Mark as unread
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListItem;
