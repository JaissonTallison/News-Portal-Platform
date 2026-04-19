import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/lib/auth-server";
import { headers } from "next/headers";

import { ApiResponse } from "@/types/api";
import { Post } from "@/types/post";
import Actions from "./post-actions";
import Filters from "./filters";
import StatusBadge from "@/components/status-badge";
import Pagination from "./pagination";
import EmptyState from "@/components/empty-state";

type Props = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
};

async function getPosts(params: {
  search?: string;
  status?: string;
  page?: string;
}): Promise<ApiResponse<Post[]>> {
  const query = new URLSearchParams();

  if (params.search) query.set("search", params.search);
  if (params.status) query.set("status", params.status);
  if (params.page) query.set("page", params.page);

  // ✅ IMPORTANTE: headers() é async no Next atual
  const headersList = await headers();

  const host = headersList.get("host") || "localhost:3000";
  const cookie = headersList.get("cookie") || "";

  const url = `http://${host}/api/posts?${query.toString()}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      cookie,
    },
  });

  return res.json();
}

export default async function PostsPage({ searchParams }: Props) {
  // 🔒 PROTEÇÃO
  const user = await getCurrentUserServer();

  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;

  const response = await getPosts(params);

  if (!response.success) {
    return (
      <p className="text-red-500">
        {response.error}
      </p>
    );
  }

  const posts = response.data;
  const meta = response.meta;

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>

        {user.role === "ADMIN" && (
          <a
            href="/posts/new"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Novo Post
          </a>
        )}
      </div>

      {/* FILTROS */}
      <Filters />

      {/* LISTA */}
      <div className="grid gap-4 mt-6">
        {posts.length === 0 ? (
          <EmptyState
            title="Nenhum post encontrado"
            description="Você ainda não criou nenhum post ou não há resultados para este filtro."
            actionLabel="Criar primeiro post"
            actionHref="/posts/new"
          />
        ) : (
          posts.map((post: Post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">
                  {post.title}
                </h2>

                <StatusBadge status={post.status} />
              </div>

              <div className="mt-3">
                <Actions post={post} role={user.role} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINAÇÃO */}
      {meta && meta.totalPages > 1 && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
        />
      )}
    </div>
  );
}