import React from "react";
import IconButton from "../common/IconButton";
import { cn } from "@/lib/utils";
import { BiArrowBack } from "react-icons/bi";

type Props = {
  setContactAside: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContactNavbar = ({ setContactAside }: Props) => {
  return (
    <nav
      className={cn(
        "left-0 z-[1] right-0 top-0 absolute flex  gap-x-6 px-4 items-center h-[90px] bg-mainPrimaryDark"
      )}
    >
      <IconButton
        onClick={() => {
          setContactAside(false);
        }}
      >
        <BiArrowBack className="text-white/50 cursor-pointer" size={20} />
      </IconButton>
      All Contacts
    </nav>
  );
};

export default ContactNavbar;
