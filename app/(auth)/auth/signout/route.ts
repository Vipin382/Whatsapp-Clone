import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    await supabase.auth.signOut();
    return NextResponse.redirect(req.url + "/signin");
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong", status: 404 });
  }
}
