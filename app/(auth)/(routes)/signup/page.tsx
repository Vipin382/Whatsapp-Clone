"use client";
import PageContainer from "@/components/common/page-contsiner";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import FormInput from "@/components/common/form/formInput";
import { formSchema } from "@/utils/validations/signupSchema";
import UserAvatar from "@/components/common/user-avatar";
import Link from "next/link";
import FormCustomButton from "@/components/common/form/formCustomButton";
import { SignupUser } from "@/app/api/signup";
import { useRouter } from "next/navigation";

const Signup = () => {
  const imageRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [image, setImage] = React.useState<File>();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: "",
      email: "",
      password: "",
      image: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (image) {
      await SignupUser({ ...values, image: image });
      router.refresh();
    }
  }

  return (
    <div className="absolute bottom-0 min-h-screen top-0 left-0 right-0 grid sm:grid-cols-12">
      <div className="rounded sm:col-start-2 md:col-start-3 sm:col-end-12 md:col-end-11">
        <div className="flex px-8 text-white font-medium sm:px-0 space-x-3 uppercase py-10 items-center">
          <Image
            src={"/chat.svg"}
            className="cursor-pointer"
            alt="loading..."
            height={40}
            width={40}
          />
          <h1>Whatsapp web</h1>
        </div>
        <div className="bg-white overflow-hidden mb-[100px] shadow-lg w-full rounded-md">
          <PageContainer className="space-y-10 text-black h-full">
            <div className="flex p-2 lg:p-5 h-[100px] space-x-3 justify-between border border-neutral-300 rounded-md">
              <Image
                src={"/download.png"}
                width={100}
                height={20}
                className="h-auto w-auto"
                alt="loading..."
              />
              <div className="flex flex-col items-center w-full lg:flex-row space-x-2 lg:justify-between lg:items-center">
                <div className="flex flex-col mt-2">
                  <h1 className="text-slate-700 text-xs lg:text-base">
                    Download WhatsApp for Windows
                  </h1>
                  <p className="text-slate-600 hidden lg:block text-sm">
                    Get calling, screen sharing and a faster experience with the
                    new Windows app .
                  </p>
                </div>
                <FormCustomButton className="bg-chatbackground hover:bg-chatbackground/80 mt-1 text-[8px] sm:text-xs lg:text-base lg:mt-0 inline-flex whitespace-nowrap rounded-full text-white font-medium cursor-pointer">
                  Get the app
                </FormCustomButton>
              </div>
            </div>
            <section>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                  <div className="grid grid-cols-1 grid-rows-1  lg:grid-cols-6 ">
                    <div className="lg:col-start-6 flex justify-center items-center lg:block mb-6 lg:mb-0 h-full">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FormInput
                                type={"file"}
                                onChange={(e) => {
                                  if (e.currentTarget.files?.[0]) {
                                    field.onChange(e.currentTarget.value);
                                    setImage(e.currentTarget.files[0]);
                                  }
                                }}
                                value={field.value}
                                ref={imageRef}
                                className="hidden"
                                accept={"image/*"}
                              />
                            </FormControl>
                            <FormMessage className="text-[10px] text-red-500 capitalize font-thin" />
                            <UserAvatar
                              src={
                                image !== undefined
                                  ? URL.createObjectURL(image)
                                  : ""
                              }
                              onClick={() => imageRef.current.click()}
                              className="h-28 text-white cursor-pointer border-[3px] border-chatbackground w-28"
                            />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="lg:col-span-4 lg:row-start-1 lg:col-start-1 lg:col-end-5 h-full">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Username</FormLabel>
                            <FormControl>
                              <FormInput placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px] text-red-500 capitalize font-thin" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Phone</FormLabel>
                            <FormControl>
                              <FormInput placeholder="Phone" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px] text-red-500 capitalize font-thin" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Email</FormLabel>
                            <FormControl>
                              <FormInput placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px] text-red-500 capitalize font-thin" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Password</FormLabel>
                            <FormControl>
                              <FormInput placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px] text-red-500 capitalize font-thin" />
                          </FormItem>
                        )}
                      />

                      <FormCustomButton
                        className=" h-7 mt-4 hover:bg-chatbackground/80 text-[10px] cursor-pointer bg-chatbackground text-white"
                        type="submit"
                      >
                        Submit
                      </FormCustomButton>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </section>
          </PageContainer>
          <div className="h-[400px] flex flex-col items-center py-3 space-y-2 bg-chatbackground/10 mt-4">
            <h1 className="text-3xl text-neutral-500 font-light">Tutorial</h1>
            <Link
              href={"/#"}
              className="hover:underline text-chatbackground text-xs"
            >
              Need help to get started?
            </Link>
            <Image
              src={"/footer.png"}
              width={400}
              height={600}
              className="h-auto w-auto"
              alt="loading..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
