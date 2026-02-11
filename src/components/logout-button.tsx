// components/logout-button.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const t = useTranslations("logout");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        toast.success(t(`${data.message}`));
        setTimeout(() => {
          router.refresh();
          router.push("/login");
          toast.dismiss();
        }, 1000);
      } else {
        toast.error(t(`${data.message}`));
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="destructive" onClick={handleLogout} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      {isLoading ? t("loading") : t("button")}
    </Button>
  );
}
