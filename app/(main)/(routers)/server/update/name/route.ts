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
    const { name } = await request.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (!name) {
      return new NextResponse("No status provided", { status: 400 });
    }
    const userdata = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: name,
      },
    });

    const contact = await db.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .contacts({
        where: {
          phone: userdata.phone,
          userId: userdata.id,
        },
      });

    if (contact) {
      await db.contact.update({
        where: {
          id: contact[0].id,
          userId: user.id,
          phone: userdata.phone,
        },
        data: {
          name: name,
        },
      });
    }
    return NextResponse.json(userdata);
  } catch (error) {
    console.log("ABOUT_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
