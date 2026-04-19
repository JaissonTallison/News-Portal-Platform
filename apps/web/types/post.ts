export type Post = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  status: string;
  category?: string;
  region?: string;
  createdAt: string;
};