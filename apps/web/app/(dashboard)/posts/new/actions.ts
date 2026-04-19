"use server";

import { revalidatePath } from "next/cache";

export async function createPostAction(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return { error: "Preencha todos os campos" };
  }

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Erro ao criar post" };
    }

    revalidatePath("/posts");
    revalidatePath("/dashboard");

    return { success: true };
  } catch {
    return { error: "Erro inesperado" };
  }
}