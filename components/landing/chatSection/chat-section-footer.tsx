"use client";
import IconButton from "@/components/common/IconButton";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillAudio } from "react-icons/ai";
import { IoSendSharp } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { HiMiniCamera } from "react-icons/hi2";
import { BsFillPersonFill } from "react-icons/bs";
import { BarChart2 } from "lucide-react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { BsEmojiLaughing } from "react-icons/bs";
import ChatInput from "./chat-input";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { format, compareAsc } from "date-fns";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MdDelete } from "react-icons/md";
import { AiOutlinePauseCircle } from "react-icons/ai";
import {
  IAudio,
  Ichat,
  TypeOfMessage,
  useSocket,
} from "@/components/providers/socket-provider";
import { createUserTextChat } from "@/app/api/createUserData";
import { useModal } from "@/hooks/use-modal-store";

function secondsToMinutesAndSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

const chatSchema = z.object({
  chatMessage: z.string().min(2, {
    message: "message must be required",
  }),
});

const ChatSectionFooter = ({ userId }: { userId: string }) => {
  const inputref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [focus, setFocus] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [mount, setMount] = React.useState<boolean>(false);
  const [record, setRecord] = React.useState<boolean>(false);
  const [audio, setAudio] = React.useState<string | undefined>();
  const { getChats } = useModal();
  const { setChat } = useSocket();

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  React.useEffect(() => {
    if (recordingBlob) {
      setMount(true);
      setAudio(URL.createObjectURL(recordingBlob));
    }
    if (!recordingBlob) return;
  }, [recordingBlob]);

  // 1. Define your form.
  const chatform = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      chatMessage: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof chatSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    await createUserTextChat({
      userId: userId,
      content: values.chatMessage,
    });
    setFocus(true);
    getChats(userId);
    chatform.reset();
  }

  function onAudioSubmit(values: string | undefined) {
    stopRecording();
    if (audio !== undefined) {
      const audioMessage: IAudio = {
        id: "",
        type: TypeOfMessage.AUDIO,
        time: format(new Date().getTime(), "HH:mm"),
        message: audio,
        recieverId: "",
        frined: false,
      };
      setChat((prev) => [...prev, audioMessage]);
    }
    setRecord(false);
  }

  React.useEffect(() => {
    if (inputref.current) {
      inputref.current.addEventListener("focus", () => {
        setFocus(false);
      });
    }
  }, [inputref.current]);

  return (
    <footer className="left-0 gap-4  flex items-center justify-between right-0 bottom-0 px-4 py-2 absolute h-[62px] bg-mainPrimaryDark">
      {record ? (
        <div className="w-full h-full flex justify-end">
          <div className=" flex justify-center items-center gap-x-2">
            <IconButton
              onClick={() => {
                setAudio(undefined);
                setRecord(false);
                stopRecording();
              }}
              className="cursor-pointer"
            >
              <MdDelete size={30} className="text-gray-400" />
            </IconButton>
            {isRecording && secondsToMinutesAndSeconds(recordingTime)}
            {!isRecording && mount && (
              <audio
                src={audio}
                onLoad={(e) => e.currentTarget.play()}
                controls
                className="border h-[50px]"
              />
            )}
            {isRecording ? (
              <IconButton className="cursor-pointer">
                <AiOutlinePauseCircle
                  size={30}
                  className="text-red-500"
                  onClick={() => {
                    stopRecording();
                  }}
                />
              </IconButton>
            ) : (
              <IconButton className="cursor-pointer">
                <AiFillAudio
                  size={24}
                  className="text-red-500"
                  onClick={() => {
                    startRecording();
                  }}
                />
              </IconButton>
            )}
            <IconButton
              onClick={() => onAudioSubmit(audio)}
              className=" bg-chatbackground cursor-pointer hover:bg-chatbackground/80 rounded-full w-10 h-10 flex justify-center items-center"
            >
              <IoSendSharp size={20} className="text-white cursor-pointer" />
            </IconButton>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <DropdownMenu onOpenChange={() => setOpen(!open)} open={open}>
            <DropdownMenuTrigger asChild>
              <IconButton
                className={cn(
                  "h-10 w-10 rounded-full",
                  open ? "bg-chatForeground rounded-full" : ""
                )}
              >
                <AiOutlinePlus
                  size={24}
                  className={cn(
                    "text-gray-400 font-bold transition-all",
                    open ? "rotate-[48deg]" : "rotate-0"
                  )}
                />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" border-none rounded-xl py-4 w-52 px-2 ml-44 mb-1 bg-mainPrimaryDark">
              <DropdownMenuItem className="flex gap-x-2 cursor-pointer rounded-md hover:bg-mainSecondaryDark text-md font-thin">
                <IoDocumentText size={26} className="text-[#7f66ff]" />
                Document
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-x-2 cursor-pointer rounded-md hover:bg-mainSecondaryDark text-md font-thin">
                <IoMdPhotos size={26} className="text-[#007bfc]" />
                Photos & Videos
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-x-2 cursor-pointer rounded-md hover:bg-mainSecondaryDark text-md font-thin">
                <HiMiniCamera size={26} className="text-[#ff2e74]" />
                Camera
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-x-2 cursor-pointer rounded-md hover:bg-mainSecondaryDark text-md font-thin">
                <BsFillPersonFill size={26} className="text-[#009de2]" />
                Contact
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-x-2 cursor-pointer rounded-md hover:bg-mainSecondaryDark text-md font-thin">
                <BarChart2 size={26} className="text-[#ffbc38] rotate-90" />
                Poll
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-x-2 cursor-pointer rounded-md hover:bg-mainSecondaryDark text-md font-thin">
                <MdAddPhotoAlternate size={26} className="text-[#02a698]" />
                New Sticker
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/**chat input */}
          <Form {...chatform}>
            <form
              onSubmit={chatform.handleSubmit(onSubmit)}
              className="flex w-full gap-4"
            >
              <FormField
                control={chatform.control}
                name="chatMessage"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <ChatInput
                        className="text-sm"
                        {...field}
                        Icon={
                          <Popover>
                            <PopoverTrigger>
                              <BsEmojiLaughing
                                size={22}
                                className="text-gray-400"
                              />
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 border-0 rounded-xl">
                              <Picker data={data} onEmojiSelect={console.log} />
                            </PopoverContent>
                          </Popover>
                        }
                        ref={inputref}
                        placeholder="Type of message"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {focus ? (
                <div>
                  <IconButton
                    onClick={() => {
                      startRecording();
                      setRecord(true);
                    }}
                  >
                    <AiFillAudio size={24} className="text-gray-400" />
                  </IconButton>
                </div>
              ) : (
                <IconButton type={"submit"}>
                  <IoSendSharp size={24} className="text-gray-400" />
                </IconButton>
              )}
            </form>
          </Form>
        </>
      )}
    </footer>
  );
};

export default ChatSectionFooter;
