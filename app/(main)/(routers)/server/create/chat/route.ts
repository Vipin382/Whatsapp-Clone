import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { userId, content } = await request.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    const message = await db.message.create({
      data: {
        content: content,
        type: "TEXT",
        userOne: { connect: { id: user.id } },
        userTwo: { connect: { id: userId } },
        deleted: false,
      },
    });
    return NextResponse.json(message);
  } catch (error) {
    console.log("chatContact_Creation_Error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
