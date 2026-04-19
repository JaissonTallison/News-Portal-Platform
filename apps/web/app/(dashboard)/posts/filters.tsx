"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );
  const [status, setStatus] = useState(
    searchParams.get("status") ?? ""
  );

  // debounce + transição suave
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (status) params.set("status", status);

      startTransition(() => {
        router.replace(`/posts?${params.toString()}`);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, status, router]);

  return (
    <div className="flex gap-2 items-center">
      <input
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-2 py-1 rounded"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">Todos</option>
        <option value="DRAFT">Draft</option>
        <option value="REVIEW">Review</option>
        <option value="PUBLISHED">Published</option>
        <option value="ARCHIVED">Archived</option>
      </select>

      {/* LOADING STATE */}
      {isPending && (
        <span className="text-sm text-gray-400">
          Buscando...
        </span>
      )}
    </div>
  );
}