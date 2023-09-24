import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bg-chatbackground w-full  min-h-[220px] overflow-hidden"></div>
      {children}
    </>
  );
};

export default AuthLayout;
