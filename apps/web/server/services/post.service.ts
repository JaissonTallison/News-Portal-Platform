import { createPost, listPosts } from "../repositories/post.repository";
import { CreatePostInput } from "../validators/post.validator";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { PostStatus } from "@prisma/client";

// ERROS
import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";

type AuthUser = {
  userId: string;
  role: string;
};

export async function createPostService(
  data: CreatePostInput,
  user: AuthUser
) {
  if (user.role !== "ADMIN") {
    throw new ForbiddenError("Apenas ADMIN pode criar posts");
  }

  const post = await createPost({
    title: data.title,
    content: data.content,
    tags: data.tags ?? [],
    authorId: user.userId,
  });

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    tags: post.tags,
    status: post.status,
    createdAt: post.createdAt,
  };
}

/* ============================
   LIST POSTS (EVOLUÍDO)
============================ */

function parseStatus(status?: string): PostStatus | undefined {
  if (!status) return undefined;

  const validStatus = Object.values(PostStatus);

  if (validStatus.includes(status as PostStatus)) {
    return status as PostStatus;
  }

  throw new ValidationError("Status inválido");
}

export async function listPostsService(
  page: number,
  limit: number,
  filters?: {
    status?: string;
    category?: string;
    region?: string;
    search?: string;
  },
  user?: AuthUser
) {
  const isPrivileged =
    user && (user.role === "ADMIN" || user.role === "EDITOR");

  const parsedStatus = parseStatus(filters?.status);

  const status = isPrivileged
    ? parsedStatus
    : PostStatus.PUBLISHED;

  const { posts, total } = await listPosts({
    page,
    limit,
    status,
    category: filters?.category,
    region: filters?.region,
    search: filters?.search,
  });

  return {
    data: posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      tags: post.tags,
      status: post.status,
      category: post.category,
      region: post.region,
      createdAt: post.createdAt,
    })),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/* ============================
   NOVAS FUNÇÕES
============================ */

export async function submitPostForReviewService(
  postId: string,
  user: AuthUser
) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new NotFoundError("Post não encontrado");
  }

  if (post.authorId !== user.userId) {
    throw new ForbiddenError("Você não pode enviar este post");
  }

  if (post.status !== "DRAFT") {
    throw new ValidationError("Post não está em DRAFT");
  }

  return prisma.post.update({
    where: { id: postId },
    data: {
      status: "REVIEW",
    },
  });
}

export async function publishPostService(
  postId: string,
  user: AuthUser
) {
  if (user.role !== "ADMIN" && user.role !== "EDITOR") {
    throw new ForbiddenError("Sem permissão para publicar");
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new NotFoundError("Post não encontrado");
  }

  if (post.status !== "REVIEW") {
    throw new ValidationError("Post precisa estar em REVIEW");
  }

  return prisma.post.update({
    where: { id: postId },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });
}

/* ============================
   UPDATE
============================ */

const updatePostSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  tags: z.array(z.string()).optional(),
});

export async function updatePostService(
  postId: string,
  data: unknown,
  user: AuthUser
) {
  const parsed = updatePostSchema.parse(data);

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new NotFoundError("Post não encontrado");
  }

  if (post.authorId !== user.userId && user.role !== "ADMIN") {
    throw new ForbiddenError("Sem permissão para editar este post");
  }

  if (post.status === "PUBLISHED" || post.status === "ARCHIVED") {
    throw new ValidationError(
      "Não é possível editar posts publicados ou arquivados"
    );
  }

  return prisma.post.update({
    where: { id: postId },
    data: parsed,
  });
}

/* ============================
   DELETE (ARCHIVE)
============================ */

export async function archivePostService(
  postId: string,
  user: AuthUser
) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new NotFoundError("Post não encontrado");
  }

  if (post.authorId !== user.userId && user.role !== "ADMIN") {
    throw new ForbiddenError("Sem permissão para arquivar este post");
  }

  if (post.status === "ARCHIVED") {
    throw new ValidationError("Post já está arquivado");
  }

  return prisma.post.update({
    where: { id: postId },
    data: {
      status: "ARCHIVED",
    },
  });
}