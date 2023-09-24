"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/common/form/formInput";
import IconButton from "@/components/common/IconButton";
import { TiTick } from "react-icons/ti";
import { BiSolidPencil } from "react-icons/bi";
import { useModal } from "@/hooks/use-modal-store";
import { updateUserName } from "@/app/api/updateUser";
import { Loader2Icon } from "lucide-react";

const nameSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const NameForm = ({ name }: { name: string }) => {
  const [seename, setName] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { getUser } = useModal();
  const nameform = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      username: name,
    },
  });

  // 2. Define a submit handler.
  async function nameOnSubmit(values: z.infer<typeof nameSchema>) {
    setLoading(true);
    try {
      await updateUserName({ name: values.username });
      getUser();
      setName(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <label className="text-chatbackground font-light text-sm">
        Your name
      </label>
      {seename ? (
        loading ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <form onSubmit={nameform.handleSubmit(nameOnSubmit)}>
            <div className="flex items-center gap-2 h-10 active:border-chatbackground focus-within:border-chatbackground border-b-2 border-b-white/60">
              <FormInput
                className="rounded-none text-lg p-0 border-none   focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent outline-none"
                max={25}
                {...nameform.register("username")}
              />

              <IconButton type="submit" className="text-white/60">
                <TiTick size={20} />
              </IconButton>
            </div>
          </form>
        )
      ) : (
        <div className="flex justify-between items-center">
          <h1>{name}</h1>
          <IconButton onClick={() => setName(true)} className="text-white/60">
            <BiSolidPencil size={20} />
          </IconButton>
        </div>
      )}
      <p className="text-slate-200/80 text-sm font-extralight mt-4">
        This is not your username or pin. This name will be visible to your
        WhatsApp contacts.
      </p>
    </div>
  );
};

export default NameForm;
