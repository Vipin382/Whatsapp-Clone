import axios from "axios";

type ContactInfo = {
  name: string;
  phone: string;
};

export async function createUserContact(values: ContactInfo) {
  try {
    const response = await axios.post(
      "/server/create/contact",
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

export async function createUserChatContact(values: ContactInfo) {
  try {
    const response = await axios.post(
      "/server/create/chatcontact",
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

type IUserChat = {
  userId: string;
  content: string;
};

export async function createUserTextChat(values: IUserChat) {
  try {
    const Socketresponse = await axios.post(
      "/api/socket/messages",
      JSON.stringify(values),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (Socketresponse.status === 200 || 201) {
      console.log("done");
      return Socketresponse.data;
    }
  } catch (error) {
    console.log(error);
  }
}
