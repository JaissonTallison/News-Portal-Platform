// apps/web/app/api/posts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/server/auth/guards";
import { createPost } from "@/server/services/post.service";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const body = await req.json();

    const post = await createPost(user, body);

    return NextResponse.json(post);
  } catch (error: unknown) {
    if (error instanceof Error) {
      let status = 400;

      if (error.message === "Unauthorized") status = 401;
      else if (error.message === "Forbidden") status = 403;

      return NextResponse.json(
        { message: error.message },
        { status }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}