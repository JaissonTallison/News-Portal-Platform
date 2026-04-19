"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useActionState } from "react";

import FormInput from "@/components/form-input";
import FormTextarea from "@/components/form-textarea";
import FormError from "@/components/form-error";
import SubmitButton from "@/components/submit-button";

type CreatePostState =
  | { success: true }
  | { success: false; error: string }
  | null;

async function createPostAction(
  prevState: CreatePostState,
  formData: FormData
): Promise<CreatePostState> {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const res = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      error: data.error || "Erro ao criar post",
    };
  }

  return { success: true };
}

export default function NewPostPage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    CreatePostState,
    FormData
  >(createPostAction, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/posts");
      router.refresh();
    }
  }, [state, router]);

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">
        Novo Post
      </h1>

      <form action={formAction} className="flex flex-col gap-3">
        <FormInput name="title" placeholder="Título" />

        <FormTextarea name="content" placeholder="Conteúdo" />

        <FormError message={state?.success === false ? state.error : ""} />

        <SubmitButton
          loading={isPending}
          text="Criar Post"
          loadingText="Criando..."
        />
      </form>
    </div>
  );
}