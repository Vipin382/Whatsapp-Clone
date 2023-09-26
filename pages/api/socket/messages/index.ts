import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types/conversation";
import { Database } from "@/types/supabase";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const supabase = createPagesServerClient<Database>({ req, res });
    const userdata = (await supabase.auth.getUser()).data.user;

    if (!userdata) {
      return null;
    }

    const user = await db.user.findUnique({
      where: {
        id: userdata.id,
      },
    });
    const { userId, content } = req.body;

    const messageFunction = `chatPlatform`;
    const Message = {
      type: "TEXT",
      content: content,
      url: null,
      userOneId: user?.id,
      useTwoId: userId,
      deleted: false,
      createdAt: new Date().toString(),
    };
    res?.socket?.server?.io?.emit(messageFunction, Message);

    const message = await db.message.create({
      data: {
        content: content,
        type: "TEXT",
        userOne: { connect: { id: user?.id } },
        userTwo: { connect: { id: userId } },
        deleted: false,
      },
    });
    if (!message) {
      return res.status(501).json({ message: "Message Failed" });
    }

    res.status(200).json({ message: "Message Sent" });
  } catch (error) {
    console.log("[DIRECT_MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
