"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Post } from "@/types/post";
import { ApiResponse } from "@/types/api";
import { useToast } from "@/lib/use-toast";
import ToastContainer from "@/components/toast-container";
import ConfirmDialog from "@/components/confirm-dialog";

type Props = {
  post: Post;
  role: string; // 🔥 NOVO
};

type ActionType = "review" | "publish" | "archive" | null;

export default function Actions({ post, role }: Props) {
  const router = useRouter();
  const { toasts, success, error } = useToast();

  const [loading, setLoading] = useState<ActionType>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function executeAction(
    action: ActionType,
    url: string
  ) {
    setLoading(action);

    try {
      const res = await fetch(url, {
        method: "POST",
      });

      const data: ApiResponse<Post> = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      success("Ação realizada com sucesso");

      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro inesperado";

      error(message);
    } finally {
      setLoading(null);
    }
  }

  return (
    <>
      <div className="flex gap-2">
        {/* REVIEW → autor pode */}
        {post.status === "DRAFT" && (
          <button
            disabled={loading !== null}
            onClick={() =>
              executeAction(
                "review",
                `/api/posts/${post.id}/review`
              )
            }
            className="px-3 py-1 text-sm rounded bg-yellow-500 text-white disabled:opacity-50"
          >
            {loading === "review"
              ? "Enviando..."
              : "Review"}
          </button>
        )}

        {/* PUBLISH → ADMIN ou EDITOR */}
        {post.status === "REVIEW" &&
          (role === "ADMIN" || role === "EDITOR") && (
            <button
              disabled={loading !== null}
              onClick={() =>
                executeAction(
                  "publish",
                  `/api/posts/${post.id}/publish`
                )
              }
              className="px-3 py-1 text-sm rounded bg-green-600 text-white disabled:opacity-50"
            >
              {loading === "publish"
                ? "Publicando..."
                : "Publicar"}
            </button>
          )}

        {/* ARCHIVE → ADMIN ou autor */}
        {post.status !== "ARCHIVED" &&
          (role === "ADMIN") && (
            <button
              disabled={loading !== null}
              onClick={() => setConfirmOpen(true)}
              className="px-3 py-1 text-sm rounded bg-red-600 text-white disabled:opacity-50"
            >
              {loading === "archive"
                ? "Arquivando..."
                : "Arquivar"}
            </button>
          )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Arquivar post"
        description="Tem certeza que deseja arquivar este post?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          executeAction(
            "archive",
            `/api/posts/${post.id}/archive`
          );
        }}
      />

      <ToastContainer toasts={toasts} />
    </>
  );
}