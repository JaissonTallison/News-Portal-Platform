// apps/web/server/services/post.service.ts

import { requirePermission } from "../auth/guards";
import { Permissions } from "../auth/permissions";
import { postRepository } from "../repositories/post.repository";
import { AuthUser } from "../types/auth.types";

interface CreatePostDTO {
  title: string;
  content: string;
}

interface UpdatePostDTO {
  title?: string;
  content?: string;
}

function sanitizeCreatePost(data: CreatePostDTO): CreatePostDTO {
  return {
    title: data.title,
    content: data.content,
  };
}

function sanitizeUpdatePost(data: UpdatePostDTO): UpdatePostDTO {
  return {
    ...(data.title && { title: data.title }),
    ...(data.content && { content: data.content }),
  };
}

export async function createPost(user: AuthUser, data: CreatePostDTO) {
  requirePermission(user, Permissions.CREATE_POST);

  const safeData = sanitizeCreatePost(data);

  return postRepository.create({
    ...safeData,
    authorId: user.id,
  });
}

export async function updatePost(
  user: AuthUser,
  postId: string,
  data: UpdatePostDTO
) {
  const post = await postRepository.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  requirePermission(user, Permissions.UPDATE_POST, {
    authorId: post.authorId,
  });

  const safeData = sanitizeUpdatePost(data);

  return postRepository.update(postId, safeData);
}