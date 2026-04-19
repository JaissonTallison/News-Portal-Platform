// apps/web/server/repositories/post.repository.ts

import { prisma } from "@/lib/prisma";

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreatePostInput {
  title: string;
  content: string;
  authorId: string;
}

interface UpdatePostInput {
  title?: string;
  content?: string;
}

export const postRepository = {
  async create(data: CreatePostInput): Promise<Post> {
    return prisma.post.create({
      data,
    });
  },

  async findById(id: string): Promise<Post | null> {
    return prisma.post.findUnique({
      where: { id },
    });
  },

  async update(id: string, data: UpdatePostInput): Promise<Post> {
    return prisma.post.update({
      where: { id },
      data,
    });
  },

  async delete(id: string): Promise<Post> {
    return prisma.post.delete({
      where: { id },
    });
  },

  async list(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.post.count(),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
};