import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request, res: Response) {
  const formdata = await req.formData();
  const image = formdata.get("image") as File;
  const phone = formdata.get("phone");
  const email = formdata.get("email");
  const password = formdata.get("password");
  const username = formdata.get("username");
  const supabase = createRouteHandlerClient({ cookies });
  //create user
  if (image && phone && email && password && username) {
    const imageId = randomUUID();
    try {
      const { error: ImageError } = await supabase.storage
        .from("profile")
        .upload(imageId, image);

      if (ImageError) return NextResponse.json({ message: ImageError.message });

      const { data } = supabase.storage.from("profile").getPublicUrl(imageId);

      const { error } = await supabase.auth.signUp({
        email: email.toString(),
        password: password.toString(),
        phone: phone.toString(),
        options: {
          data: {
            name: username,
            phone: phone,
            image: data.publicUrl,
          },
        },
      });

      if (error) {
        return NextResponse.json({
          message: error.message,
          status: error.status,
        });
      }
      return NextResponse.redirect("http://localhost:3000/signin");
    } catch (error) {
      console.log(error);
    }
  }
  return NextResponse.json({
    message: "All Fields are required",
    success: false,
  });
}

export interface IUPLOAD_IMAGE {
  image: File;
}

export interface IGet_Public_Url {
  name: string;
}
