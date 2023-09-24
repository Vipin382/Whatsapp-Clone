import React from "react";
import { Input } from "../ui/input";
import SearchbarToggle from "./searchbarToggle";

const SearchBar = () => {
  return (
    <div className="bg-mainPrimaryDark w-full text-sm flex justify-center px-3 h-8 rounded-md items-center">
      <SearchbarToggle />
      <Input
        type={"text"}
        id="search"
        className="border-none pl-10 border h-8 focus:border-none focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 bg-mainPrimaryDark"
        placeholder="Search or start new chat"
      />
    </div>
  );
};

export default SearchBar;
