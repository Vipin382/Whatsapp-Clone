"use client";
import React from "react";
import { useNavbarAction } from "../providers/navbar-action-provider";
import { cn } from "@/lib/utils";
import { BiArrowBack } from "react-icons/bi";
import UserAvatar from "../common/user-avatar";
import AboutForm from "./forms/settings/about-form";
import NameForm from "./forms/settings/name-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconButton from "../common/IconButton";
import { useModal } from "@/hooks/use-modal-store";

const ProfileSidebar = ({
  image = "",
  name = "User",
  about = "Sometimes words are more worth taking than actions",
}: {
  image?: string;
  name?: string;
  about?: string;
}) => {
  const { profile, setProfile } = useNavbarAction();
  const { onOpen } = useModal();
  return (
    <div
      className={cn(
        "-translate-x-full transition-all duration-1000",
        profile ? "-translate-x-0" : ""
      )}
    >
      <div className="flex items-end px-6 py-4 h-[106px] bg-mainPrimaryDark">
        <div className="flex gap-x-4 text-slate-300 items-center">
          <span className="cursor-pointer" onClick={() => setProfile(false)}>
            <BiArrowBack size={24} />
          </span>
          <span className="font-medium capitalize text-lg">Profile</span>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton className="border border-white h-48 w-48 rounded-full">
              <UserAvatar
                hoverClass="hover:opacity-70"
                src={image}
                size={100}
                info={"CHANGE PROFILE PHOTO"}
                className="h-48 border-none w-48"
              />
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 ml-60 -mt-12 bg-mainPrimaryDark border-none shadow-2xl p-0 py-4 rounded">
            <DropdownMenuGroup className=" text-white/80">
              <DropdownMenuItem
                onClick={() => onOpen("openPicture")}
                className="px-4 py-3 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark"
              >
                View photo
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onOpen("takePicture")}
                className="px-4 py-3 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark"
              >
                Take photo
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-3 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                Upload photo
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-3 text-white/80 rounded-none cursor-pointer hover:bg-mainSecondaryDark">
                Remove photo
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-6 flex flex-col space-y-8">
        <NameForm name={name} />
        <AboutForm about={about} />
      </div>
    </div>
  );
};

export default ProfileSidebar;
