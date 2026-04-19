import { publishPostService } from "@/server/services/post.service";
import { getCurrentUser } from "@/lib/auth";
import { withErrorHandler } from "@/lib/error-handler";
import { successResponse } from "@/lib/response";
import { postRateLimit } from "@/lib/rate-limit-config";

export const POST = withErrorHandler(
  async (req: Request, { params }: { params: { id: string } }) => {
    // pega IP
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "anonymous";

    const limit = postRateLimit(ip);

    if (!limit.success) {
      throw new Error("Muitas requisições. Tente novamente mais tarde.");
    }

    const user = getCurrentUser();

    const post = await publishPostService(params.id, user);

    return successResponse(post);
  }
);