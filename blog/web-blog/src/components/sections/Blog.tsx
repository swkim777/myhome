'use client';

import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AuthModal } from '../modals/AuthModal';
import { CardEditModal } from '../modals/CardEditModal';
import { BlogPost } from '../../types';
import { BookOpen, Calendar, Plus, Edit2, Trash2 } from 'lucide-react';

interface BlogProps {
  categories: string[];
}

export function Blog({ categories }: BlogProps) {
  const { isAuthenticated, blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdmin();

  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogPost | undefined>(undefined);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const filteredPosts =
    selectedCategory === '전체'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const handleActionWithAuth = (action: () => void) => {
    if (!isAuthenticated) {
      setPendingAction(() => action);
      setAuthModalOpen(true);
    } else {
      action();
    }
  };

  const handleOpenAdd = () => {
    handleActionWithAuth(() => {
      setEditingItem(undefined);
      setEditModalOpen(true);
    });
  };

  const handleOpenEdit = (item: BlogPost) => {
    handleActionWithAuth(() => {
      setEditingItem(item);
      setEditModalOpen(true);
    });
  };

  const handleDelete = (id: string) => {
    handleActionWithAuth(() => {
      if (confirm('정말로 이 글 카드를 삭제하시겠습니까?')) {
        deleteBlogPost(id);
      }
    });
  };

  const handleSave = (payload: any) => {
    if (editingItem) {
      updateBlogPost(editingItem.id, payload);
    } else {
      addBlogPost(payload);
    }
  };

  return (
    <section id="blog" className="py-20 bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                04 // BLOG
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              블로그 아카이브 & 대표 글
            </h2>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all hover:-translate-y-0.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>글 추가</span>
          </button>
        </div>

        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mb-8">
          AI와 IT 전문 기술부터 소설, 영화, 여행, 재테크, 독서까지 삶과 기술의 다채로운 사유를 기록합니다.
        </p>

        {/* 8대 카테고리 필터 탭 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar" aria-label="카테고리 필터">
          <button
            type="button"
            onClick={() => setSelectedCategory('전체')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === '전체'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-400'
            }`}
          >
            전체 보기
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 대표 글 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:-translate-y-1 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-slate-600">
                    {post.category}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60">
                      {post.status}
                    </span>

                    {/* Edit & Delete Actions */}
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(post)}
                        title="글 카드 수정"
                        className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        title="글 카드 삭제"
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-6">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.publishedAt}
                </span>
                <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  상세 보기
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Auth & Edit Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setAuthModalOpen(false);
          if (pendingAction) {
            pendingAction();
            setPendingAction(null);
          }
        }}
      />

      <CardEditModal
        isOpen={editModalOpen}
        section="blog"
        initialData={editingItem}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
        onDelete={(id) => deleteBlogPost(id)}
      />
    </section>
  );
}
