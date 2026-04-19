"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      //  ORDEM IMPORTANTE
      router.replace("/login"); 
      router.refresh(); // limpa cache do layout protegido
    } catch {
      alert("Erro ao fazer logout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-red-500 text-sm disabled:opacity-50"
    >
      {loading ? "Saindo..." : "Logout"}
    </button>
  );
}