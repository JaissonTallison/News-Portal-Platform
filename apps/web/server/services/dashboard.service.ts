import { 
  getDashboardMetrics,   
  getPostsPerMonth 
} from "../repositories/dashboard.repository";

export async function getDashboardMetricsService() {
  const metrics = await getDashboardMetrics();
  const postsPerMonth = await getPostsPerMonth();

  return {
    totalPosts: metrics.total,
    draftPosts: metrics.draft,
    reviewPosts: metrics.review,
    publishedPosts: metrics.published,
    archivedPosts: metrics.archived,
    postsPerMonth,
  };
}