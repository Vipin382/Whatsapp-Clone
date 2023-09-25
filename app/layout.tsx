import { cn } from "@/lib/utils";
import "./globals.css";
import ThemeProvider from "@/components/providers/theme-provider";
import NavbarActionProvider from "@/components/providers/navbar-action-provider";
import Faveicon from "../public/favicon.ico";
import { SocketProvider } from "@/components/providers/socket-provider";
import ModalProvider from "@/components/providers/modal-provider";

export const metadata = {
  title: "WhatsApp",
  description: "Created by vipin bhati",
  icons: [{ rel: "icon", url: Faveicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme={"dark"}
          enableSystem={true}
          storageKey="whatsapp-mode"
        >
          <NavbarActionProvider>
            <ModalProvider />
            <SocketProvider>
              <main
                className={cn(
                  "dark:bg-chatPrimary grid grid-cols-1 grid-rows-1 bg-chatPrimaryLight relative",
                  " border bor h-screen der-white min-w-[900px] no-scrollbar overflow-y-scroll"
                )}
              >
                {children}
              </main>
            </SocketProvider>
          </NavbarActionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
