import { createPostSchema } from "@/server/validators/post.validator";
import {
  createPostService,
  listPostsService,
} from "@/server/services/post.service";
import { getCurrentUserServer } from "@/lib/auth-server"; //  CORRETO

export async function POST(req: Request) {
  try {
    //  autenticação
    const user = await getCurrentUserServer();

    if (!user) {
      return Response.json(
        { success: false, error: "Não autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = createPostSchema.parse(body);

    const post = await createPostService(parsed, user);

    return Response.json({
      success: true,
      data: post,
    });
  } catch (error: unknown) {
    console.error("POST /api/posts error:", error);

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro interno",
      },
      { status: 400 } //  400 aqui faz mais sentido que 401
    );
  }
}

export async function GET(req: Request) {
  try {
    //  protege rota
    const user = await getCurrentUserServer();

    if (!user) {
      return Response.json(
        { success: false, error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");

    const result = await listPostsService(page, limit);

    return Response.json({
      success: true,
      ...result,
    });
  } catch (error: unknown) {
    console.error("GET /api/posts error:", error);

    return Response.json(
      {
        success: false,
        error: "Erro ao listar posts",
      },
      { status: 400 }
    );
  }
}