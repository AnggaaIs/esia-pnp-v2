import { useTranslations } from "next-intl";

export default function DashboardHome() {
  const t = useTranslations("sidebar.menu");
  return t("home");
}
