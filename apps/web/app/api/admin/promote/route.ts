import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, secret } = body;

    if (secret !== process.env.ADMIN_SECRET) {
      return Response.json(
        { success: false, error: "Não autorizado" },
        { status: 403 }
      );
    }

    if (!email) {
      return Response.json(
        { success: false, error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json(
        { success: false, error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const updated = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });

    return Response.json({
      success: true,
      data: {
        id: updated.id,
        email: updated.email,
        role: updated.role,
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