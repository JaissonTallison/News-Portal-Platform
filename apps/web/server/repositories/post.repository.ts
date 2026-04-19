import { prisma } from "@/lib/prisma";
import { Prisma, PostStatus } from "@prisma/client";

///////////////////////////
// CREATE POST
///////////////////////////
export async function createPost(data: {
  title: string;
  content: string;
  tags: string[];
  authorId: string;
}) {
  return prisma.post.create({
    data,
  });
}

///////////////////////////
// LIST POSTS (EVOLUÍDO)
///////////////////////////
type ListPostsParams = {
  page: number;
  limit: number;
  status?: PostStatus; // ✅ agora tipado corretamente
  category?: string;
  region?: string;
  search?: string;
};

export async function listPosts(params: ListPostsParams) {
  const { page, limit, status, category, region, search } = params;

  const skip = (page - 1) * limit;

  const where: Prisma.PostWhereInput = {};

  if (status) {
    where.status = status; // ✅ sem any
  }

  if (category) {
    where.category = category;
  }

  if (region) {
    where.region = region;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, total };
}