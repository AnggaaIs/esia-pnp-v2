import { useTranslations } from "next-intl";

export default function DashboardKRS() {
  const t = useTranslations("sidebar.menu");
  return t("krs");
}
