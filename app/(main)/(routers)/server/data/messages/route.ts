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
    const { userTwoId } = await request.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const userdata = await db.message.findMany({
      where: {
        OR: [
          {
            userOneId: user.id,
            useTwoId: userTwoId,
          },
          {
            userOneId: userTwoId,
            useTwoId: user.id,
          },
        ],
      },
    });
    return NextResponse.json(userdata);
  } catch (error) {
    console.log("All_Data_error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
