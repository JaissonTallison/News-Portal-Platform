import { submitPostForReviewService } from "@/server/services/post.service";
import { getCurrentUser } from "@/lib/auth";
import { withErrorHandler } from "@/lib/error-handler";
import { successResponse } from "@/lib/response";

export const POST = withErrorHandler(
  async (
    req: Request,
    { params }: { params: { id: string } }
  ) => {
    const user = getCurrentUser();

    const post = await submitPostForReviewService(params.id, user);

    return successResponse(post);
  }
);