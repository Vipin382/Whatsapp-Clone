"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils";

type Props = {};

const SearchbarToggle = (props: Props) => {
  const [active, setActive] = React.useState<boolean>(false);
  return (
    <label htmlFor="search" className="cursor-pointer">
      {active ? (
        <ArrowLeft
          size={18}
          onClick={() => setActive(false)}
          className={cn("text-chatbackground ", active && "animate-onActive")}
        />
      ) : (
        <BiSearch
          className="text-white/50"
          onClick={() => setActive(true)}
          size={18}
        />
      )}
    </label>
  );
};

export default SearchbarToggle;
