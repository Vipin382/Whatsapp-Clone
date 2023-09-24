import { getUserContact, getUserData } from "@/app/api/getUserData";
import { IObjectComponent, arrayToObjectArray } from "@/lib/arrayToObject";
import { Database } from "@/types/supabase";
import { create } from "zustand";

type userType = Database["public"]["Tables"]["User"]["Row"];
type conversationType = Database["public"]["Tables"]["Contact"]["Row"];
type messagesType = Database["public"]["Tables"]["Message"]["Row"];
export type ModalType = "openPicture" | "takePicture" | "createContact";
type contactType = Database["public"]["Tables"]["Contact"]["Row"];

interface ModalData {
  user: userType | null;
  type: ModalType | null;
  conversation: conversationType[] | [];
  contacts: IObjectComponent[] | [];
  loading: boolean;
  messages: messagesType[] | [];
  isOpen: boolean;
  onClose: () => void;
  getUser: () => void;
  onOpen: (type: ModalType) => void;
  getContacts: () => void;
}

export const useModal = create<ModalData>((set) => ({
  user: null,
  conversation: [],
  contacts: [],
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
  onOpen: (type) => set({ isOpen: true, type: type }),
  isOpen: false,
  onClose: () => set({ isOpen: false, type: null }),
}));
