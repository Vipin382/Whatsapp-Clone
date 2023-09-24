import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decode } from "base64-arraybuffer";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request, res: Response) {
  const { image } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  //create user
  if (!user) return new NextResponse("Unauthorized", { status: 400 });
  if (!image) return new NextResponse("No Image provided", { status: 400 });

  if (image && user) {
    const imageId = randomUUID();
    try {
      const { error: ImageError } = await supabase.storage
        .from("profile")
        .upload(imageId, decode(image.split("base64,")[1] as string), {
          contentType: "image/png",
        });

      if (ImageError) return NextResponse.json({ message: ImageError.message });

      const { data } = await supabase.storage
        .from("profile")
        .getPublicUrl(imageId);
      const userdata = await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          profile: data.publicUrl,
        },
      });

      const updateContact = await db.contact.updateMany({
        where: {
          phone: userdata.phone,
        },
        data: {
          profile: data.publicUrl,
        },
      });
      return NextResponse.json(userdata);
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
