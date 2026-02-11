"use client";

import { useTransition } from "react";
import { setLocale } from "@/actions/set-locale";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import ReactCountryFlag from "react-country-flag";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const languages = [
  { code: "id", countryCode: "ID", name: "Indonesia" },
  { code: "en", countryCode: "GB", name: "English" },
] as const;

interface LanguageSwitcherProps {
  variant?: "icon" | "sidebar";
}

export function LanguageSwitcher({ variant = "icon" }: LanguageSwitcherProps) {
  const t = useTranslations("common");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleSwitch = (locale: string) => {
    if (locale === currentLocale) return;
    startTransition(async () => {
      await setLocale(locale);
      router.refresh();
    });
  };

  const currentLang = languages.find((lang) => lang.code === currentLocale) || languages[0];
  const nextLang = languages.find((lang) => lang.code !== currentLocale) || languages[1];

  if (variant === "sidebar") {
    return (
      <div className="relative flex w-full items-center rounded-md border border-input bg-background p-1">
        {languages.map((lang) => {
          const isActive = currentLocale === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => handleSwitch(lang.code)}
              disabled={isPending}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                isActive ? "text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
              title={t("switchLanguage", { language: lang.name })}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill-sidebar"
                  className="absolute inset-0 rounded-sm bg-muted"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                <ReactCountryFlag
                  countryCode={lang.countryCode}
                  svg
                  className="h-3.5 w-3.5 rounded-full object-cover"
                  aria-label={lang.name}
                />
                <span className="sr-only sm:not-sr-only sm:inline-block">
                  {lang.code.toUpperCase()}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    );
  }

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
      title={t("switchLanguage", { language: nextLang.name })}
      className="flex size-11 items-center justify-center rounded-full border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentLocale}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center"
        >
          <ReactCountryFlag
            countryCode={currentLang.countryCode}
            svg
            style={{
              width: "1.5rem",
              height: "1.5rem",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            aria-label={currentLang.name}
          />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}