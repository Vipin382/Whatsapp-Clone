"use client";
import PageContainer from "@/components/common/page-contsiner";
import { Button } from "@/components/ui/button";
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
import { signinSchema } from "@/utils/validations/signinSchema";
import Link from "next/link";
import { SigninUser } from "@/app/api/signin";
import { useRouter } from "next/navigation";
import FormCustomButton from "@/components/common/form/formCustomButton";

const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signinSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setLoading(true);
      await SigninUser(values);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      router.refresh();
      setLoading(false);
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
                <Button className="bg-chatbackground hover:bg-chatbackground/80 mt-1 text-[8px] sm:text-xs lg:text-base lg:mt-0 inline-flex whitespace-nowrap rounded-full text-white font-medium cursor-pointer">
                  Get the app
                </Button>
              </div>
            </div>
            <section>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                  <div className="grid grid-cols-1 grid-rows-1  lg:grid-cols-6 ">
                    <div className="lg:block hidden lg:col-start-6">
                      <Image
                        src={"/scanner.png"}
                        width={400}
                        height={200}
                        alt="loading..."
                      />
                    </div>
                    <div className="lg:col-span-4 lg:row-start-1 lg:col-start-1 lg:col-end-5 h-full">
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
                        loading={loading}
                        className=" h-7 mt-4 text-[10px] cursor-pointer bg-chatbackground hover:bg-chatbackground/80 text-white"
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

export default Signin;
