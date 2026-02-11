import { useTranslations } from "next-intl";

export default function DashboardKHS() {
  const t = useTranslations("sidebar.menu");
  return t("khs");
}
