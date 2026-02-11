"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Eye, EyeOff, InfoIcon } from "lucide-react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const t = useTranslations("login");
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const turnstileRef = useRef<TurnstileInstance>(null);

  const loginSchema = z.object({
    username: z.string().min(1, t("validation.usernameRequired")),
    password: z.string().min(6, t("validation.passwordMinLength")),
    remember_me: z.boolean(),
    turnstile_token: z.string().min(1, t("validation.turnstileRequired")),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      remember_me: false,
      turnstile_token: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok) {
        toast.success(t(`api.${resData.message}`));
        setIsLoading(false);
        setTimeout(() => {
          router.push("/dashboard");
          toast.dismiss();
        }, 1000);
      } else {
        toast.error(t(`api.${resData.message}`) || t("common.error"));

        turnstileRef.current?.reset();
        setValue("turnstile_token", "");

        if (res.status === 401) {
          setValue("password", "");
        }
      }
    } catch (error) {
      toast.error(t("api.connection_error"));
      turnstileRef.current?.reset();
      setValue("turnstile_token", "");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* image banner */}
      <div
        className="hidden lg:flex w-[65%] bg-cover bg-center relative"
        style={{ backgroundImage: "url('images/banner/banner.png')" }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* login form */}
      <div className="w-full lg:w-[35%] flex flex-col justify-center relative p-8">
        {/* logo */}
        <div className="absolute top-10 left-8 right-8 flex justify-between items-center ">
          <img
            src="/images/logo/logo-pnp.png"
            alt="PNP Logo"
            className="w-12 h-auto"
          />

          <LanguageSwitcher />
        </div>

        {/* alert username pass */}
        {process.env.NODE_ENV === "development" && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>{t("devInfo.title")}</AlertTitle>
            <AlertDescription>
              <p className="text-xs font-mono">{t("devInfo.admin")}</p>
              <p className="text-xs font-mono">{t("devInfo.mahasiswa")}</p>
            </AlertDescription>
          </Alert>
        )}

        {/* form */}
        <div className="w-full space-y-2">
          <div className="flex flex-col mb-6">
            <h1 className="text-4xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground">{t("welcome")}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fieldgroup-username">
                  {t("username")}
                </FieldLabel>

                <div className="flex flex-col">
                  <Input
                    id="fieldgroup-username"
                    placeholder={t("usernamePlaceholder")}
                    autoComplete="username"
                    {...register("username")}
                    className={
                      errors.username
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </Field>

              <Field className="-mt-3">
                <FieldLabel htmlFor="fieldgroup-password">
                  {t("password")}
                </FieldLabel>
                <div className="flex flex-col">
                  <div className="relative">
                    <Input
                      id="fieldgroup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("passwordPlaceholder")}
                      autoComplete="current-password"
                      {...register("password")}
                      className={
                        errors.password
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword
                          ? t("passwordVisibility.hide")
                          : t("passwordVisibility.show")}
                      </span>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </Field>

              <div className="flex items-center justify-between -mt-3">
                <div className="flex items-center space-x-2">
                  <Controller
                    control={control}
                    name="remember_me"
                    render={({ field }) => (
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {t("rememberMe")}
                  </label>
                </div>

                {/* modal lupa pass */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="text-sm font-medium text-primary hover:underline cursor-pointer bg-transparent border-none p-0"
                    >
                      {t("forgotPassword")}
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="text-left">
                      <DialogTitle>
                        {t("forgotPasswordDialog.title")}
                      </DialogTitle>
                      <DialogDescription className="pt-2">
                        {t("forgotPasswordDialog.description")}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>

              <Field>
                <div className="flex flex-col">
                  {TURNSTILE_SITE_KEY ? (
                    <Controller
                      control={control}
                      name="turnstile_token"
                      render={({ field: { onChange, value } }) => (
                        <Turnstile
                          ref={turnstileRef}
                          siteKey={TURNSTILE_SITE_KEY}
                          onSuccess={(token) => {
                            onChange(token);
                          }}
                          onExpire={() => {
                            onChange("");
                          }}
                        />
                      )}
                    />
                  ) : (
                    <div className="p-4 bg-red-100 text-red-600">
                      {t("siteKeyError")}
                    </div>
                  )}

                  {errors.turnstile_token && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.turnstile_token.message}
                    </p>
                  )}
                </div>
              </Field>

              <Field>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                  {isLoading ? t("submitting") : t("submit")}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}
