import { getCurrentUserServer } from "@/lib/auth-server";

export async function GET() {
  try {
    const user = await getCurrentUserServer();

    //  proteção
    if (!user) {
      return Response.json(
        { success: false, error: "Não autenticado" },
        { status: 401 }
      );
    }

    if (user.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Acesso negado" },
        { status: 403 }
      );
    }

    return Response.json({
      success: true,
      data: {
        message: "Bem-vindo admin",
        user: {
          id: user.id,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Admin route error:", error);

    return Response.json(
      { success: false, error: "Erro interno" },
      { status: 500 }
    );
  }
}