import { NextResponse } from "next/server";
import { archivePostService, updatePostService } from "@/server/services/post.service";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = getCurrentUser();

    const body = await req.json();

    const post = await updatePostService(params.id, body, user);

    return NextResponse.json(post);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao atualizar post";

    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = getCurrentUser();

    const post = await archivePostService(params.id, user);

    return NextResponse.json(post);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao arquivar post";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}