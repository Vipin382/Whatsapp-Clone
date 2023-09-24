"use client";
import React from "react";
import { MdGroups } from "react-icons/md";
import { RiChatNewFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { StatusIcon } from "@/lib/statusIcon";
import UserAvatar from "../common/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconButton from "../common/IconButton";
import { useNavbarAction } from "../providers/navbar-action-provider";
import { SignoutUser } from "@/app/api/signout";
import SearchBar from "./searchbar";
import { BiFilter } from "react-icons/bi";
import { useModal } from "@/hooks/use-modal-store";

const PrimaryNavbar = ({ image = "" }: { image?: string }) => {
  const { setProfile, loading, setContactAside } = useNavbarAction();
  const { onOpen } = useModal();

  return (
    <div className="absolute top-0 left-0 right-0 bg-mainSecondaryDark">
      <nav className="border px-3 py-2 bg-mainPrimaryDark flex justify-between items-center">
        <UserAvatar
          hover={false}
          onClick={() => setProfile(true)}
          size={30}
          loading={loading}
          src={image}
        />
        <div className="grid grid-cols-4 gap-2">
          <IconButton
            onClick={() => setContactAside(true)}
            className="active:bg-white/10 rounded-full h-10 w-10"
          >
            <MdGroups className=" text-white/60" size={26} />
          </IconButton>
          <IconButton className="active:bg-white/10 rounded-full h-10 w-10">
            <StatusIcon
              className=" antialiased stroke-white/60"
              fill={"rgba(255,255,255,0.6)"}
              notification={false}
              height={26}
              width={26}
            />
          </IconButton>
          <IconButton className="active:bg-white/10 rounded-full h-10 w-10">
            <RiChatNewFill className=" text-white/60" size={26} />
          </IconButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton className="active:bg-white/10 rounded-full h-10 w-10">
                <BsThreeDotsVertical className=" text-white/60" size={26} />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-40 bg-mainPrimaryDark border-none shadow-2xl p-0 rounded">
              <DropdownMenuGroup className="space-y-3 text-white/80">
                <DropdownMenuItem className="px-4 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                  New group
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                  New community
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onOpen("createContact")}
                  className="px-4 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark"
                >
                  New Contact
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                  Select chats
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await SignoutUser();
                  }}
                  className="px-4 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-white/20 my-3" />
              <DropdownMenuItem className="px-4 mb-3 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                Get WhatsApp for Windows
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <div className="p-2 flex items-center gap-x-2">
        <SearchBar />
        <IconButton className="h-6 w-6">
          <BiFilter size={40} className="text-white/60" />
        </IconButton>
      </div>
    </div>
  );
};

export default PrimaryNavbar;
