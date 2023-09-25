import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { db } from "./db";
import { cookies } from "next/headers";

export const initialProfile = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }
  const profile = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (profile) {
    const exist = await db.contact.findFirst({
      where: {
        userId: user.id,
        originalId: user.id,
      },
    });
    if (!exist) {
      const contact = await db.contact.create({
        data: {
          userId: user.id,
          originalId: user.id,
          phone: user.user_metadata.phone,
          about: "",
          name: user.user_metadata.name,
          profile: user.user_metadata.image,
        },
      });
    }

    return profile;
  }

  const newProfile = await db.user.create({
    data: {
      id: user.id,
      phone: user.user_metadata.phone as string,
      email: user.email as string,
      profile: user.user_metadata.image,
      name: user.user_metadata.name,
    },
  });

  const contact = await db.contact.create({
    data: {
      userId: user.id,
      originalId: user.id,
      phone: newProfile.phone,
      about: newProfile.about ?? "",
      name: newProfile?.name ?? "",
      profile: newProfile?.profile,
    },
  });

  return newProfile;
};
