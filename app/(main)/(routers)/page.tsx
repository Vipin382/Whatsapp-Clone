"use client";
import dynamic from "next/dynamic";
import FormCustomButton from "@/components/common/form/formCustomButton";
import PageContainer from "@/components/common/page-contsiner";
import { Loader2Icon, Lock } from "lucide-react";
import Image from "next/image";
import React from "react";
import ListItem from "@/components/landing/list-item";
const PrimaryNavbar = dynamic(
  () => import("@/components/landing/primaryNavbar"),
  {
    loading: () => <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />,
  }
);
import { useNavbarAction } from "@/components/providers/navbar-action-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSidebar from "@/components/landing/profilesidebar";
import { useModal } from "@/hooks/use-modal-store";
import ContactNavbar from "@/components/landing/contact-navbar";
import ContactItem from "@/components/landing/contact-item";
const ChatSection = dynamic(() => import("@/components/landing/chat-section"), {
  loading: () => <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />,
});

const LandingPage = () => {
  const { profile, contactAside, setContactAside } = useNavbarAction();
  const { user, contacts, getUser, getContacts } = useModal();

  /**
   *
   */
  React.useEffect(() => {
    getUser();
    getContacts();
  }, []);

  /**
   *
   */
  if (user !== null) {
    return (
      <Tabs defaultValue="landing" className="w-full flex h-full">
        <aside className=" w-full overflow-hidden min-w-[450px] max-w-[450px]  relative bg-mainSecondaryDark h-full">
          {profile ? (
            <ProfileSidebar
              image={user?.profile!}
              name={user?.name!}
              about={user?.about!}
            />
          ) : (
            <>
              {contactAside ? (
                <>
                  <ContactNavbar setContactAside={setContactAside} />
                  <ScrollArea className="mt-[90px] h-[633px] flex flex-col">
                    {contacts.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className="h-16 px-3 text-chatbackground flex">
                            <span className="flex uppercase text-lg items-center justify-center w-12">
                              {item.alphabet}
                            </span>
                            <div className="w-full h-full border-b"></div>
                          </div>
                          {item.array.map((item, index) => {
                            return (
                              <ContactItem
                                key={index}
                                name={item.name}
                                about={item.about}
                                image={item.profile!}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </ScrollArea>
                </>
              ) : (
                <>
                  (<PrimaryNavbar image={user?.profile!} />
                  <section className="overflow-hidden mt-[104px]">
                    <TabsList className="w-full relative p-0 h-full bg-transparent">
                      <ScrollArea className="flex xl:h-[619px] w-full flex-col">
                        <TabsTrigger className="hidden" value="landing">
                          default
                        </TabsTrigger>
                        {[
                          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        ].map((item, index) => {
                          return (
                            <TabsTrigger
                              className="flex cursor-pointer w-full items-center active:border-b hover:bg-mainPrimaryDark group h-[72px] gap-x-4 data-[state=active]:bg-mainPrimaryDark bg-transparent px-5"
                              key={index}
                              value={index.toString()}
                            >
                              <ListItem />
                            </TabsTrigger>
                          );
                        })}
                      </ScrollArea>
                    </TabsList>
                  </section>
                  )
                </>
              )}
            </>
          )}
        </aside>
        <section className="w-full border-l border-gray-400/20 flex justify-center items-end bg-mainPrimaryDark h-full">
          <TabsContent value="landing">
            <PageContainer>
              <div className="flex mb-10 flex-col">
                <div className="flex flex-col space-y-6 items-center">
                  <Image
                    src={"/landing.png"}
                    width={300}
                    height={300}
                    alt="loading..."
                  />
                  <div className="flex flex-col gap-y-4">
                    <h1 className="text-center text-4xl font-light text-white/80">
                      Download WhatsApp for Windows
                    </h1>
                    <p className="max-w-[600px] text-white/70 font-light text-sm text-center">
                      Make calls, share your screen and get a faster experience
                      when you download the windows app.
                    </p>
                  </div>
                  <FormCustomButton className="rounded-full inline-flex bg-chatbackground hover:bg-chatbackground/80">
                    Get the app
                  </FormCustomButton>
                </div>
                <p className="inline-flex gap-x-1 text-sm font-light text-white/30 items-center justify-center text-center mt-[130px] w-full">
                  <Lock size={15} /> End-to-end encrypted
                </p>
              </div>
            </PageContainer>
          </TabsContent>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            (item, index) => {
              return (
                <TabsContent
                  key={index}
                  className="w-full h-full"
                  value={index.toString()}
                >
                  <ChatSection />
                </TabsContent>
              );
            }
          )}
        </section>
      </Tabs>
    );
  }
  return <div>Hello World</div>;
};

export default LandingPage;
