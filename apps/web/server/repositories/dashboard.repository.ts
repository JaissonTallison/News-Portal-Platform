import { prisma } from "@/lib/prisma";

export async function getDashboardMetrics() {
  const [total, draft, review, published, archived] =
    await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.post.count({ where: { status: "REVIEW" } }),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.post.count({ where: { status: "ARCHIVED" } }),
    ]);

  return {
    total,
    draft,
    review,
    published,
    archived,
  };
}

export async function getPostsPerMonth() {
  const posts = await prisma.post.findMany({
    select: {
      createdAt: true,
    },
  });

  const map = new Map<string, number>();

  posts.forEach((post) => {
    const date = new Date(post.createdAt);

    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

    map.set(key, (map.get(key) || 0) + 1);
  });

  return Array.from(map.entries()).map(([month, count]) => ({
    month,
    count,
  }));
}