import {
  getChatUserContact,
  getUserContact,
  getUserData,
  getUserMessages,
} from "@/app/api/getUserData";
import { IObjectComponent, arrayToObjectArray } from "@/lib/arrayToObject";
import { Database } from "@/types/supabase";
import { create } from "zustand";

type userType = Database["public"]["Tables"]["User"]["Row"];
type conversationType = Database["public"]["Tables"]["Contact"]["Row"];
type messagesType = Database["public"]["Tables"]["Message"]["Row"];
export type ModalType = "openPicture" | "takePicture" | "createContact";
type chatContacts = Database["public"]["Tables"]["ChatContact"]["Row"];

interface ModalData {
  user: userType | null;
  type: ModalType | null;
  conversation: conversationType[] | [];
  chatContacts: chatContacts[] | [];
  contacts: IObjectComponent[] | [];
  loading: boolean;
  messages: messagesType[] | [];
  chats: messagesType[] | null;
  isOpen: boolean;
  onClose: () => void;
  getUser: () => void;
  onOpen: (type: ModalType) => void;
  getContacts: () => void;
  getChatContacts: () => void;
  getChats: (id: string) => void;
}

export const useModal = create<ModalData>((set) => ({
  user: null,
  conversation: [],
  chatContacts: [],
  contacts: [],
  chats: [],
  type: null,
  loading: false,
  messages: [],
  getUser: async () => {
    set({ loading: true });
    try {
      const userdata = await getUserData();
      set({ user: userdata });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  getContacts: async () => {
    set({ loading: true });
    try {
      const contactData = await getUserContact();
      set({ contacts: arrayToObjectArray(contactData!) });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  getChatContacts: async () => {
    set({ loading: true });
    try {
      const contactData = await getChatUserContact();
      set({ chatContacts: contactData });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  onOpen: (type) => set({ isOpen: true, type: type }),
  isOpen: false,
  onClose: () => set({ isOpen: false, type: null }),
  getChats: async (id) => {
    set({ loading: true });
    try {
      const contactData = await getUserMessages({ userTwoId: id });
      set({ chats: contactData });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
