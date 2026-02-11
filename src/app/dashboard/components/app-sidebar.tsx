"use client";

import {
  Home,
  Users,
  FileText,
  CreditCard,
  FileCheck,
  ChevronUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { LanguageSwitcher } from "@/components/language-switcher";
import Link from "next/link";

interface UserData {
  id: string;
  username: string;
  role: string;
  createdAt: string;
  mahasiswa?: {
    id: string;
    nim: string;
    namaLengkap: string;
    fotoProfil: string | null;
    statusMahasiswa: string;
  };
}

export function AppSidebar() {
  const t = useTranslations("sidebar");
  const tLogout = useTranslations("logout");
  const [user, setUser] = useState<UserData | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { title: t("menu.home"), url: "/dashboard/home", icon: Home },
    { title: t("menu.students"), url: "/dashboard/mahasiswa", icon: Users },
    { title: t("menu.krs"), url: "/dashboard/krs", icon: FileText },
    { title: t("menu.khs"), url: "/dashboard/khs", icon: FileCheck },
    { title: t("menu.invoices"), url: "/dashboard/tagihan", icon: CreditCard },
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();

        if (res.ok) {
          setUser(data.data);
        } else if (res.status === 401) {
          router.push("/login");
        } else {
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        toast.success(tLogout("success"));
        setTimeout(() => {
          toast.dismiss();
          window.location.href = "/login";
        }, 1000);
      }
    } catch (err) {
      toast.error(tLogout("error"));
      console.error("Sign out error:", err);
    }
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <img
                  src="/images/logo/logo-pnp.png"
                  alt="ESIA PNP"
                  className="size-8"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold">ESIA PNP</span>
                  <span className="truncate text-xs">
                    Politeknik Negeri Padang
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <div className="mt-2 px-2">
            <div className="rounded-md border bg-muted/50 px-2 py-1.5 text-center text-xs font-medium text-muted-foreground">
              TA 2025/2026 - Ganjil
            </div>
          </div>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="my-2" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("sections.academic")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      <Link prefetch={true} href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-center p-2">
              <LanguageSwitcher variant="sidebar" />
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {loading ? (
              <div className="flex items-center gap-3 p-2">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="flex flex-1 flex-col gap-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2 w-16" />
                </div>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user?.mahasiswa?.fotoProfil || ""}
                        alt={user?.mahasiswa?.namaLengkap}
                      />
                      <AvatarFallback className="rounded-lg">
                        {user?.mahasiswa?.namaLengkap
                          ?.substring(0, 2)
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.mahasiswa?.namaLengkap || user?.username}
                      </span>
                      <span className="truncate text-xs">
                        {user?.mahasiswa?.nim || t("user.noNim")}
                      </span>
                    </div>
                    <ChevronUp className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                    onSelect={handleSignOut}
                  >
                    <span>{t("user.signOut")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
