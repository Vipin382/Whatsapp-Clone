import { initialProfile } from "@/lib/initial-profile";
import React from "react";

interface IMainLayout {
  children: React.ReactNode;
}

export const dynamic = "force-dynamic";

const MainPageLayout = async ({ children }: IMainLayout) => {
  const userData = await initialProfile();
  if (userData) {
    return (
      <div className="h-full  row-span-1 col-span-1  no-scrollbar xl:py-4 xl:px-5 overflow-hidden">
        {children}
      </div>
    );
  }
  return <div>loading...</div>;
};

export default MainPageLayout;
