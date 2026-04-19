import { redirect } from "next/navigation";
import Link from "next/link";

import { getCurrentUserServer } from "@/lib/auth-server";
import { getDashboardMetricsService } from "@/server/services/dashboard.service";
import PostsChart from "@/components/posts-chart";

export default async function DashboardPage() {
  const user = await getCurrentUserServer();

  // 🔒 proteção
  if (!user) {
    redirect("/login");
  }

  let metrics;

  try {
    metrics = await getDashboardMetricsService();
  } catch {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 mb-4">
          Erro ao carregar dashboard.
        </p>

        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tentar novamente
        </Link>
      </div>
    );
  }

  const isEmpty = metrics.totalPosts === 0;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Visão geral do sistema
          </p>
        </div>

        <Link
          href="/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Novo Post
        </Link>
      </div>

      {/* EMPTY STATE */}
      {isEmpty && (
        <div className="bg-white p-8 rounded shadow text-center">
          <p className="text-gray-600 mb-2">
            Você ainda não criou nenhum conteúdo.
          </p>

          <p className="text-sm text-gray-400 mb-4">
            Comece criando seu primeiro post.
          </p>

          <Link
            href="/posts/new"
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Criar primeiro post
          </Link>
        </div>
      )}

      {/* CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card
          title="Total"
          value={metrics.totalPosts}
          href="/posts"
        />

        <Card
          title="Drafts"
          value={metrics.draftPosts}
          color="yellow"
          href="/posts?status=draft"
        />

        <Card
          title="Review"
          value={metrics.reviewPosts}
          color="blue"
          href="/posts?status=review"
        />

        <Card
          title="Publicados"
          value={metrics.publishedPosts}
          color="green"
          href="/posts?status=published"
        />

        <Card
          title="Arquivados"
          value={metrics.archivedPosts}
          color="gray"
          href="/posts?status=archived"
        />
      </div>

      {/* GRÁFICO */}
      {!isEmpty && (
        <>
          {metrics.postsPerMonth.length <= 1 ? (
            <div className="bg-white p-6 rounded shadow text-center text-gray-400">
              Dados insuficientes para gerar gráfico.
            </div>
          ) : (
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-4">
                Posts por mês
              </h2>

              <PostsChart data={metrics.postsPerMonth} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ========================= */
/* CARD COMPONENT */
/* ========================= */

function Card({
  title,
  value,
  color = "default",
  href,
}: {
  title: string;
  value: number;
  color?: string;
  href?: string;
}) {
  const colors: Record<string, string> = {
    yellow: "bg-yellow-100 text-yellow-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    gray: "bg-gray-100 text-gray-700",
    default: "bg-white text-gray-900",
  };

  const content = (
    <div
      className={`p-4 rounded shadow hover:scale-[1.02] transition cursor-pointer ${colors[color]}`}
    >
      <p className="text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}