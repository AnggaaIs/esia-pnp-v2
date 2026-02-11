"use client";

import { useTransition } from "react";
import { setLocale } from "@/actions/set-locale";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import ReactCountryFlag from "react-country-flag";

const languages = [
  { code: "id", countryCode: "ID", name: "Indonesia" },
  { code: "en", countryCode: "GB", name: "English" },
] as const;

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentLocale = useLocale();

  const currentLang = languages.find((lang) => lang.code === currentLocale) || languages[0];
  const nextLang = languages.find((lang) => lang.code !== currentLocale) || languages[1];

  const handleToggle = () => {
    startTransition(async () => {
      await setLocale(nextLang.code);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      title={`Switch to ${nextLang.name}`}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-200 transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:ring-zinc-700"
    >
      <ReactCountryFlag
        countryCode={currentLang.countryCode}
        svg
        style={{
          width: "1.5em",
          height: "1.5em",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        aria-label={currentLang.name}
      />
    </button>
  );
}