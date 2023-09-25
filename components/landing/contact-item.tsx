import React from "react";
import UserAvatar from "../common/user-avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { createUserChatContact } from "@/app/api/createUserData";

type Props = {
  name?: string;
  about?: string;
  image?: string;
  phone?: string;
  OriginalId?: string;
};

const ContactItem = ({
  name = "user",
  about = "available",
  image = "",
  phone = "",
  OriginalId = "",
}: Props) => {
  const { getChatContacts } = useModal();

  const HandleCreateContact = async () => {
    try {
      await createUserChatContact({ name: name, phone: phone });
      getChatContacts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex hover:bg-mainPrimaryDark/70 text-white cursor-pointer w-full px-3 space-x-3 items-center">
        <UserAvatar src={image} hover={false} className="h-12 w-12" />
        <div className="border-b flex items-start flex-col w-full leading-4 py-4 h-full">
          <h1 className=" capitalize">{name}</h1>
          <span className="text-xs h-4  text-start w-full  text-gray-400">
            {about}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none ml-[450px] mt-[-20px] rounded-sm px-0  py-3 bg-chatForeground">
        <DropdownMenuItem className="hover:bg-chatPrimary rounded-none cursor-pointer px-2">
          Info
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={HandleCreateContact}
          className="hover:bg-chatPrimary rounded-none cursor-pointer px-2"
        >
          Message
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ContactItem;
