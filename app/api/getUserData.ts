import axios from "axios";
import { Database } from "@/types/supabase";

type user = Database["public"]["Tables"]["User"]["Row"];

export async function getUserData() {
  try {
    const response = await axios.post<user>("/server/data/full", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || 201) {
      console.log("done");
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

type contacts = Database["public"]["Tables"]["Contact"]["Row"];

export async function getUserContact() {
  try {
    const response = await axios.post<contacts[]>("/server/data/contacts", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || 201) {
      console.log("done");
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

type chatContacts = Database["public"]["Tables"]["ChatContact"]["Row"];

export async function getChatUserContact() {
  try {
    const response = await axios.post<chatContacts[]>(
      "/server/data/chatContacts",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || 201) {
      console.log("done");
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

type allMessages = Omit<
  Database["public"]["Tables"]["Message"]["Row"],
  "updatedAt"
>;

export async function getUserMessages(values: { userTwoId: string }) {
  try {
    const response = await axios.post<allMessages[]>(
      "/server/data/messages",
      JSON.stringify(values),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || 201) {
      console.log("done");
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
