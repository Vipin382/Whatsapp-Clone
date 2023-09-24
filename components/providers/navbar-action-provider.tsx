"use client";
import React from "react";

interface INavbarActionProviderContext {
  profile: boolean;
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
  search: boolean;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  chatSettings: boolean;
  setChatSettings: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  contactAside: boolean;
  setContactAside: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarActionContext = React.createContext<INavbarActionProviderContext>({
  profile: false,
  setProfile: function (_value: React.SetStateAction<boolean>): void {},
  search: false,
  setSearch: function (_value: React.SetStateAction<boolean>): void {},
  chatSettings: false,
  setChatSettings: function (_value: React.SetStateAction<boolean>): void {},
  loading: false,
  setLoading: function (_value: React.SetStateAction<boolean>): void {},
  contactAside: false,
  setContactAside: function (_value: React.SetStateAction<boolean>): void {},
});

interface INavbarActionProps {
  children: React.ReactNode;
}

const NavbarActionProvider = ({ children }: INavbarActionProps) => {
  const [profile, setProfile] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<boolean>(false);
  const [chatSettings, setChatSettings] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [contactAside, setContactAside] = React.useState<boolean>(false);

  return (
    <NavbarActionContext.Provider
      value={{
        profile,
        setProfile,
        search,
        setSearch,
        chatSettings,
        setChatSettings,
        loading,
        setLoading,
        contactAside,
        setContactAside,
      }}
    >
      {children}
    </NavbarActionContext.Provider>
  );
};

export default NavbarActionProvider;

export const useNavbarAction = () => React.useContext(NavbarActionContext);
