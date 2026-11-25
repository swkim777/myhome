export interface ProfileData {
  name: string;
  role: string;
  headline: string;
  bio: string;
  detailedBio: string[];
  avatarSrc: string;
  keywords: string[];
}

export interface AppItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  status: '게시됨' | '작성 중' | '추후 작성';
  link?: string;
  tags: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  summary: string;
  status: '게시됨' | '작성 중' | '추후 작성';
  publishedAt: string;
  slug: string;
  link?: string;
}

export interface RecentWorkItem {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  badge: string;
  link?: string;
}

export interface ExternalLink {
  name: string;
  url: string;
  label: string;
}

export interface SiteContent {
  title: string;
  headline: string;
  primaryCtaText: string;
  profile: ProfileData;
  appTools: AppItem[];
  portfolioItems: PortfolioItem[];
  blogCategories: string[];
  blogPosts: BlogPost[];
  recentWorks: RecentWorkItem[];
  externalLinks: ExternalLink[];
}
