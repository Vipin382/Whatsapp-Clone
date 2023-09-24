import React from "react";
import UserAvatar from "../common/user-avatar";

type Props = {
  name?: string;
  about?: string;
  image?: string;
};

const ContactItem = ({
  name = "user",
  about = "available",
  image = "",
}: Props) => {
  return (
    <div className="flex hover:bg-mainPrimaryDark/70 text-white cursor-pointer px-3 space-x-3 items-center">
      <UserAvatar src={image} hover={false} className="h-12 w-12" />
      <div className="border-b w-full leading-4 py-4 h-full">
        <h1 className=" capitalize">{name}</h1>
        <span className="text-xs min-h-10 w-full  text-gray-400">{about}</span>
      </div>
    </div>
  );
};

export default ContactItem;
