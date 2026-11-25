'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppItem, PortfolioItem, BlogPost, RecentWorkItem } from '../types';
import { siteContent } from '../data/content';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;

  // App & Tool CRUD
  appTools: AppItem[];
  addAppTool: (item: Omit<AppItem, 'id'>) => void;
  updateAppTool: (id: string, item: Partial<AppItem>) => void;
  deleteAppTool: (id: string) => void;

  // Portfolio CRUD
  portfolioItems: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;

  // Blog CRUD
  blogPosts: BlogPost[];
  addBlogPost: (item: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, item: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // Recent Works CRUD
  recentWorks: RecentWorkItem[];
  addRecentWork: (item: Omit<RecentWorkItem, 'id'>) => void;
  updateRecentWork: (id: string, item: Partial<RecentWorkItem>) => void;
  deleteRecentWork: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const AUTH_KEY = 'jowon_blog_auth';
const APP_TOOLS_KEY = 'jowon_blog_app_tools';
const PORTFOLIO_KEY = 'jowon_blog_portfolio';
const BLOG_POSTS_KEY = 'jowon_blog_posts';
const RECENT_WORKS_KEY = 'jowon_blog_recent_works';

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [appTools, setAppTools] = useState<AppItem[]>(siteContent.appTools);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(siteContent.portfolioItems);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(siteContent.blogPosts);
  const [recentWorks, setRecentWorks] = useState<RecentWorkItem[]>(siteContent.recentWorks);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const auth = sessionStorage.getItem(AUTH_KEY);
      if (auth === 'true') setIsAuthenticated(true);

      const savedApps = localStorage.getItem(APP_TOOLS_KEY);
      if (savedApps) setAppTools(JSON.parse(savedApps));

      const savedPortfolio = localStorage.getItem(PORTFOLIO_KEY);
      if (savedPortfolio) setPortfolioItems(JSON.parse(savedPortfolio));

      const savedBlog = localStorage.getItem(BLOG_POSTS_KEY);
      if (savedBlog) setBlogPosts(JSON.parse(savedBlog));

      const savedRecent = localStorage.getItem(RECENT_WORKS_KEY);
      if (savedRecent) setRecentWorks(JSON.parse(savedRecent));
    } catch {
      // ignore storage errors
    }
  }, []);

  // Authentication
  const login = (email: string, pass: string): boolean => {
    if (email.trim() === 'swkim777@gmail.com' && pass === 'Kimsw!@007') {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {}
  };

  // App & Tool Actions
  const addAppTool = (item: Omit<AppItem, 'id'>) => {
    const newItem: AppItem = { ...item, id: `app-${Date.now()}` };
    const updated = [newItem, ...appTools];
    setAppTools(updated);
    try {
      localStorage.setItem(APP_TOOLS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const updateAppTool = (id: string, updatedFields: Partial<AppItem>) => {
    const updated = appTools.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
    setAppTools(updated);
    try {
      localStorage.setItem(APP_TOOLS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const deleteAppTool = (id: string) => {
    const updated = appTools.filter((item) => item.id !== id);
    setAppTools(updated);
    try {
      localStorage.setItem(APP_TOOLS_KEY, JSON.stringify(updated));
    } catch {}
  };

  // Portfolio Actions
  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = { ...item, id: `portfolio-${Date.now()}` };
    const updated = [newItem, ...portfolioItems];
    setPortfolioItems(updated);
    try {
      localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(updated));
    } catch {}
  };

  const updatePortfolioItem = (id: string, updatedFields: Partial<PortfolioItem>) => {
    const updated = portfolioItems.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
    setPortfolioItems(updated);
    try {
      localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(updated));
    } catch {}
  };

  const deletePortfolioItem = (id: string) => {
    const updated = portfolioItems.filter((item) => item.id !== id);
    setPortfolioItems(updated);
    try {
      localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(updated));
    } catch {}
  };

  // Blog Actions
  const addBlogPost = (item: Omit<BlogPost, 'id'>) => {
    const newItem: BlogPost = { ...item, id: `post-${Date.now()}` };
    const updated = [newItem, ...blogPosts];
    setBlogPosts(updated);
    try {
      localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const updateBlogPost = (id: string, updatedFields: Partial<BlogPost>) => {
    const updated = blogPosts.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
    setBlogPosts(updated);
    try {
      localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const deleteBlogPost = (id: string) => {
    const updated = blogPosts.filter((item) => item.id !== id);
    setBlogPosts(updated);
    try {
      localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(updated));
    } catch {}
  };

  // Recent Works Actions
  const addRecentWork = (item: Omit<RecentWorkItem, 'id'>) => {
    const newItem: RecentWorkItem = { ...item, id: `rw-${Date.now()}` };
    const updated = [newItem, ...recentWorks];
    setRecentWorks(updated);
    try {
      localStorage.setItem(RECENT_WORKS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const updateRecentWork = (id: string, updatedFields: Partial<RecentWorkItem>) => {
    const updated = recentWorks.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
    setRecentWorks(updated);
    try {
      localStorage.setItem(RECENT_WORKS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const deleteRecentWork = (id: string) => {
    const updated = recentWorks.filter((item) => item.id !== id);
    setRecentWorks(updated);
    try {
      localStorage.setItem(RECENT_WORKS_KEY, JSON.stringify(updated));
    } catch {}
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        appTools,
        addAppTool,
        updateAppTool,
        deleteAppTool,
        portfolioItems,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        recentWorks,
        addRecentWork,
        updateRecentWork,
        deleteRecentWork,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
