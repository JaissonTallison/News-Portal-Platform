import { registerUser } from "@/server/services/auth.service";
import { registerSchema } from "@/server/validators/auth.validator";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = registerSchema.parse(body);

    const user = await registerUser(
      parsed.name,
      parsed.email,
      parsed.password
    );

    return Response.json({
      success: true,
      data: user,
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
      { status: 400 }
    );
  }
}