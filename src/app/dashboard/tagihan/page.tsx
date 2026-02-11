import { useTranslations } from "next-intl";

export default function DashboardTagihan() {
  const t = useTranslations("sidebar.menu");
  return t("invoices");
}
