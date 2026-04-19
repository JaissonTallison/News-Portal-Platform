"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useActionState } from "react";
import Image from "next/image";

import FormInput from "@/components/form-input";
import FormError from "@/components/form-error";
import SubmitButton from "@/components/submit-button";

type LoginState =
  | { success: true }
  | { success: false; error: string }
  | null;

async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      error: data.error || "Erro ao fazer login",
    };
  }

  return { success: true };
}

export default function LoginPage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    LoginState,
    FormData
  >(loginAction, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/posts");
      router.refresh();
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/funil.jpeg"
            alt="Logo"
            width={64}
            height={64}
            className="rounded mb-2"
            priority
          />

          <h1 className="text-2xl font-bold">
            Login
          </h1>
        </div>

        <form action={formAction} className="flex flex-col gap-3">
          <FormInput
            name="email"
            placeholder="Email"
            type="email"
          />

          <FormInput
            name="password"
            placeholder="Senha"
            type="password"
          />

          <FormError
            message={state?.success === false ? state.error : ""}
          />

          <SubmitButton
            loading={isPending}
            text="Entrar"
            loadingText="Entrando..."
          />
        </form>
      </div>
    </div>
  );
}