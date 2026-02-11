"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { useTranslations } from "next-intl";
import { Loader2, UserCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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

export default function DashboardPage() {
  const router = useRouter();
  const t = useTranslations("dashboard");
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-sm font-medium">{t("loading")}</span>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-sm border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>{t("error")}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const initials = (user.mahasiswa?.namaLengkap || user.username)
    .charAt(0)
    .toUpperCase();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50/50 p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("welcome")}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24 border-2 border-primary/10">
            <AvatarImage src={user.mahasiswa?.fotoProfil || ""} alt={user.username} />
            <AvatarFallback className="bg-primary/5 text-2xl font-bold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="text-center space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">
              {user.mahasiswa?.namaLengkap || user.username}
            </h1>
            <Badge variant="secondary" className="font-mono uppercase">
              {user.role}
            </Badge>
          </div>

          {user.mahasiswa?.nim && (
            <p className="text-sm text-muted-foreground">
              NIM: {user.mahasiswa.nim}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-6">
          <LogoutButton />
        </CardFooter>
      </Card>
    </main>
  );
}