import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/lib/auth-server";
import LogoutButton from "@/components/logout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserServer();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between">
        {/* LOGO */}
        <div>
          <div className="p-4 border-b border-gray-800 flex items-center gap-3">
            <Image
              src="/images/funil.jpeg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded"
              priority
            />

            <h2 className="text-lg font-bold">
              News Admin
            </h2>
          </div>

          {/* NAV */}
          <nav className="flex flex-col gap-1 p-3">
            <Link
              href="/dashboard"
              className="px-3 py-2 rounded hover:bg-gray-800 transition"
            >
              📊 Dashboard
            </Link>

            <Link
              href="/posts"
              className="px-3 py-2 rounded hover:bg-gray-800 transition"
            >
              📰 Posts
            </Link>

            <Link
              href="/posts/new"
              className="px-3 py-2 rounded hover:bg-gray-800 transition"
            >
              ➕ Novo Post
            </Link>
          </nav>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-gray-800 text-sm text-gray-400">
          Sistema interno
        </div>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="bg-white border-b px-6 py-3 flex justify-between items-center shadow-sm">
          <div>
            <h1 className="text-lg font-semibold">
              Dashboard
            </h1>
            <p className="text-xs text-gray-500">
              Gerencie seus conteúdos
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* USER INFO */}
            <div className="text-right">
              <p className="text-sm font-medium">
                {user.role}
              </p>
              <p className="text-xs text-gray-500">
                usuário logado
              </p>
            </div>

            {/* AVATAR */}
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
              {user.role?.[0]}
            </div>

            {/* LOGOUT */}
            <LogoutButton />
          </div>
        </header>

        {/* MAIN */}
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}