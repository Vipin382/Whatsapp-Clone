"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
import { io as ClientIo } from "socket.io-client";

export enum TypeOfMessage {
  TEXT = "TEXT",
  AUDIO = "AUDIO",
}

export type Ichat = {
  id: string;
  time: string;
  type: TypeOfMessage;
  message: string;
  recieverId: string;
  frined: boolean;
};
export type IAudio = {
  id: string;
  type: TypeOfMessage;
  time: string;
  message: string;
  recieverId: string;
  frined: boolean;
};

type IMessageArray = Ichat | IAudio | null;
type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  chat: IMessageArray[];
  setChat: React.Dispatch<React.SetStateAction<IMessageArray[]>>;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  chat: [],
  setChat: function (value: React.SetStateAction<IMessageArray[]>): void {
    throw new Error("Function not implemented.");
  },
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chat, setChat] = useState<IMessageArray[]>([]);

  useEffect(() => {
    const socketInstance = new (ClientIo as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      }
    );

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, chat, setChat }}>
      {children}
    </SocketContext.Provider>
  );
};
