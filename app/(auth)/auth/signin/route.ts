import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const requestUrl = new URL(req.url);
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      return NextResponse.json({
        message: error.message,
        status: error.status,
      });
    }
    return NextResponse.redirect(requestUrl.origin, {
      status: 301,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something wrong",
      success: false,
    });
  }
}
