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
    const { name, phone } = await request.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone number is not provided", { status: 400 });
    }
    const contactdata = await db.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .contacts({
        where: {
          phone: phone,
        },
      });

    if (!contactdata)
      return new NextResponse("No Such user found", { status: 400 });

    const chatContact = await db.chatContact.create({
      data: {
        phone: phone,
        about: contactdata[0].about,
        originalId: contactdata[0].originalId,
        name: name,
        profile: contactdata[0].profile,
        user: { connect: { id: user.id } },
      },
    });
    return NextResponse.json(chatContact);
  } catch (error) {
    console.log("chatContact_Creation_Error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
