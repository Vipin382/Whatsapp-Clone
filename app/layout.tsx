import { cn } from "@/lib/utils";
import "./globals.css";
import ThemeProvider from "@/components/providers/theme-provider";
import NavbarActionProvider from "@/components/providers/navbar-action-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import ModalProvider from "@/components/providers/modal-provider";

export const metadata = {
  title: "WhatsApp",
  description: "Created by vipin bhati",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
                  "dark:bg-chatPrimary bg-chatPrimaryLight relative",
                  "h-[754px] min-h-[754px] min-w-[900px] no-scrollbar max-h-[754px] overflow-y-scroll"
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
