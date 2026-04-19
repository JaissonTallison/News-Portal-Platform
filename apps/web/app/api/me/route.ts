import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { success: false, error: "Não autenticado" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return Response.json(
        { success: false, error: "Token inválido" },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      data: {
        user: {
          id: decoded.id,
          role: decoded.role,
        },
      },
    });
  } catch (error: unknown) {
    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro interno",
      },
      { status: 500 }
    );
  }
}