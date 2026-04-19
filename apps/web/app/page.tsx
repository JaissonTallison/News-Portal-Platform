import Link from "next/link";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <Logo size={60} />

      <h1 className="text-3xl font-bold mt-6">
        News Portal
      </h1>

      <p className="text-gray-600 mt-2 max-w-md">
        Plataforma interna para gerenciamento de conteúdos,
        publicação e fluxo editorial.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Ir para Dashboard
        </Link>

        <Link
          href="/login"
          className="border px-6 py-2 rounded hover:bg-gray-200 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}