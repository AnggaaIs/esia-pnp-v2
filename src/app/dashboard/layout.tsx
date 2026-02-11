import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { AppSidebar } from "./components/app-sidebar";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Dashboard - ESIA",
  description: "Dashboard page for ESIA",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("common");
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen">
        <div className="flex h-14 items-center gap-2 border-b bg-background px-4 md:hidden">
          <SidebarTrigger />
          <span className="font-semibold">{t("brandName")}</span>
        </div>

        <div className="p-4 md:p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
