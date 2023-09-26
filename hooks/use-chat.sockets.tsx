import { useSocket } from "@/components/providers/socket-provider";
import React from "react";
import { messagesType, useModal } from "./use-modal-store";

export const useChatSocket = ({
  chatKey,
  to,
}: {
  chatKey: string;
  to: string;
}) => {
  const { socket } = useSocket();
  const { setAllChats, chats } = useModal();
  React.useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(chatKey, (message: messagesType) => {
      setAllChats(chats!, message);
    });
    return () => {
      socket.off("chatPlatform");
    };
  }, [socket, chats]);
};
