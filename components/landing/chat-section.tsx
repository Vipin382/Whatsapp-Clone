"use client";
import dynamic from "next/dynamic";
import { Loader2Icon } from "lucide-react";
import { format, compareAsc } from "date-fns";
import React from "react";
const ChatSectionNavbar = dynamic(
  () => import("./chatSection/chat-section-navbar"),
  {
    loading: () => <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />,
  }
);
const ChatSectionFooter = dynamic(
  () => import("./chatSection/chat-section-footer"),
  {
    loading: () => <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />,
  }
);
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { AiOutlineClose } from "react-icons/ai";
import { useNavbarAction } from "../providers/navbar-action-provider";
import IconButton from "../common/IconButton";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import ChatMessage from "./messages/chat-message";
import PageContainer from "../common/page-contsiner";
import { TypeOfMessage, useSocket } from "../providers/socket-provider";
import AudioMessage from "./messages/audio-message";

const ChatSection = () => {
  const { search, setSearch, chatSettings, setChatSettings } =
    useNavbarAction();
  const divRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const { chat, setChat } = useSocket();

  React.useEffect(() => {
    const scrollToBottom = () => {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [chat]);
  return (
    <div className="grid h-full grid-cols-3">
      <section
        className={cn(
          "relative transition-all col-span-3 bg-mainSecondaryDark w-full h-full",
          search ? "col-span-2" : "",
          chatSettings ? "col-span-2" : ""
        )}
      >
        <ChatSectionNavbar />
        <ContextMenu>
          <ContextMenuTrigger className="flex w-full  h-full items-center  justify-center rounded-md text-sm">
            <div className="absolute bg-background3 contain  bg-contain mix-blend-overlay inset-0"></div>
            <ScrollArea className="w-full isloate h-[608px]">
              <PageContainer>
                {chat?.map((item, index) => {
                  if (item?.type === TypeOfMessage.TEXT) {
                    return (
                      <ChatMessage
                        message={item.message}
                        time={item.time}
                        friend={item.frined}
                      />
                    );
                  } else if (item?.type === TypeOfMessage.AUDIO) {
                    return (
                      <AudioMessage
                        audio={item.message}
                        time={item.time}
                        friend={item.frined}
                      />
                    );
                  }
                })}
                <div ref={divRef}></div>
              </PageContainer>
            </ScrollArea>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64 px-0 py-4 rounded-sm bg-chatForeground border-none">
            <ContextMenuItem
              className="px-5 py-2 text-white/80  hover:bg-mainSecondaryDark cursor-pointer rounded-none"
              inset
            >
              Group info
            </ContextMenuItem>
            <ContextMenuItem
              className="px-5 py-2 text-white/80  hover:bg-mainSecondaryDark cursor-pointer rounded-none"
              inset
            >
              Select messages
            </ContextMenuItem>
            <ContextMenuItem
              className="px-5 py-2 text-white/80 hover:bg-mainSecondaryDark cursor-pointer rounded-none"
              inset
            >
              Mute notifications
            </ContextMenuItem>
            <ContextMenuItem
              className="px-5 py-2 text-white/80  hover:bg-mainSecondaryDark cursor-pointer rounded-none"
              inset
            >
              Clear chats
            </ContextMenuItem>
            <ContextMenuItem
              className="px-5 py-2 text-white/80  hover:bg-mainSecondaryDark cursor-pointer rounded-none"
              inset
            >
              Exit group
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        <ChatSectionFooter />
      </section>
      <div
        className={cn(
          "border-l border-gray-400/20 relative hidden transition-all bg-mainSecondaryDark",
          search ? "col-span-1 block" : "",
          chatSettings ? "col-span-1 block" : ""
        )}
      >
        {search ? (
          <nav
            className={cn(
              "left-0 z-[1] right-0 top-0 absolute  gap-x-6 px-4 items-center h-[57.5px] bg-mainPrimaryDark",
              search ? "col-span-1 flex" : "hidden"
            )}
          >
            <IconButton>
              <AiOutlineClose
                className="text-white/50 cursor-pointer"
                onClick={() => {
                  setSearch(false);
                }}
                size={20}
              />
            </IconButton>
            Search Messages
          </nav>
        ) : (
          ""
        )}
        {chatSettings ? (
          <nav
            className={cn(
              "left-0 z-[1] right-0 top-0 absolute gap-x-6 px-4 items-center h-[57.5px] bg-mainPrimaryDark",
              chatSettings ? "col-span-1 flex" : "hidden"
            )}
          >
            <IconButton>
              <AiOutlineClose
                className="text-white/50 cursor-pointer"
                onClick={() => setChatSettings(false)}
                size={20}
              />
            </IconButton>
            Contact info
          </nav>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ChatSection;
