import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - ESIA",
  description: "Dashboard page for ESIA",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
