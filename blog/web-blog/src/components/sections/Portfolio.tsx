'use client';

import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AuthModal } from '../modals/AuthModal';
import { CardEditModal } from '../modals/CardEditModal';
import { PortfolioItem } from '../../types';
import { FolderGit2, Plus, Edit2, Trash2 } from 'lucide-react';

export function Portfolio() {
  const {
    isAuthenticated,
    portfolioItems,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
  } = useAdmin();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | undefined>(undefined);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

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

  const handleOpenEdit = (item: PortfolioItem) => {
    handleActionWithAuth(() => {
      setEditingItem(item);
      setEditModalOpen(true);
    });
  };

  const handleDelete = (id: string) => {
    handleActionWithAuth(() => {
      if (confirm('정말로 이 프로젝트 카드를 삭제하시겠습니까?')) {
        deletePortfolioItem(id);
      }
    });
  };

  const handleSave = (payload: any) => {
    if (editingItem) {
      updatePortfolioItem(editingItem.id, payload);
    } else {
      addPortfolioItem(payload);
    }
  };

  return (
    <section id="portfolio" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                03 // PORTFOLIO
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              대표 프로젝트 & 포트폴리오
            </h2>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all hover:-translate-y-0.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>프로젝트 추가</span>
          </button>
        </div>

        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mb-12">
          AI 에이전트 아키텍처, 클라우드 개발 및 미디어 프로덕션 분야에서 일궈낸 핵심 작업들을 선보입니다.
        </p>

        <div className="space-y-6">
          {portfolioItems.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-lg hover:shadow-blue-500/5 group"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                    {item.year}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                {/* Edit & Delete Buttons */}
                <div className="flex items-center gap-1.5 mr-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    title="프로젝트 수정"
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    title="프로젝트 삭제"
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700/70 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <FolderGit2 className="w-6 h-6" />
                </div>
              </div>
            </div>
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
        section="portfolio"
        initialData={editingItem}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
        onDelete={(id) => deletePortfolioItem(id)}
      />
    </section>
  );
}
