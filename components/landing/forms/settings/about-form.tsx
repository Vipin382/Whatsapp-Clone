"use client";
import IconButton from "@/components/common/IconButton";
import React from "react";
import { BiSolidPencil } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { useForm } from "react-hook-form";
import FormInput from "@/components/common/form/formInput";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserAbout } from "@/app/api/updateUser";
import { Loader2Icon } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

const aboutSchema = z.object({
  about: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const AboutForm = ({ about }: { about: string }) => {
  const [activeabout, setAbout] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { getUser, getContacts } = useModal();
  const aboutform = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      about: "",
    },
  });

  async function aboutOnSubmit(values: z.infer<typeof aboutSchema>) {
    setLoading(true);
    try {
      await updateUserAbout(values);
      getUser();
      getContacts();
      setAbout(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={aboutform.handleSubmit(aboutOnSubmit)}>
      <label className="text-chatbackground font-light text-sm">About</label>
      {activeabout ? (
        loading ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <div className="flex items-center gap-2 h-10 active:border-chatbackground focus-within:border-chatbackground border-b-2 border-b-white/60">
            <FormInput
              className="rounded-none text-lg p-0 border-none   focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent outline-none"
              max={25}
              {...aboutform.register("about")}
            />

            <IconButton
              // onClick={() => setAbout(false)}
              type="submit"
              className="text-white/60"
            >
              <TiTick size={20} />
            </IconButton>
          </div>
        )
      ) : (
        <div className="flex mt-2 justify-between items-center">
          <h1>{about}</h1>
          <IconButton onClick={() => setAbout(true)} className="text-white/60">
            <BiSolidPencil size={20} />
          </IconButton>
        </div>
      )}
    </form>
  );
};

export default AboutForm;
