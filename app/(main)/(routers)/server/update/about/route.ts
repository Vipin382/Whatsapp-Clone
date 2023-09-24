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
    const { about } = await request.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (!about) {
      return new NextResponse("No status provided", { status: 400 });
    }
    const userdata = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        about: about,
      },
    });
    const updateContact = await db.contact.updateMany({
      where: {
        phone: userdata.phone,
      },
      data: {
        about: about,
      },
    });
    return NextResponse.json(userdata);
  } catch (error) {
    console.log("ABOUT_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
