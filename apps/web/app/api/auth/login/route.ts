import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // MOCK TEMPORÁRIO (REMOVE COMPLEXIDADE)
  if (email !== "admin@email.com" || password !== "123") {
    return Response.json(
      { success: false, error: "Credenciais inválidas" },
      { status: 401 }
    );
  }

  const token = signToken({
    id: "1",
    role: "ADMIN",
  });

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return Response.json({ success: true });
}