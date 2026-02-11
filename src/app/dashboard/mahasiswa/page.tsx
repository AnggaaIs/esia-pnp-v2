import { useTranslations } from "next-intl";

export default function DashboardMahasiswa() {
  const t = useTranslations("sidebar.menu");
  return t("students");
}
