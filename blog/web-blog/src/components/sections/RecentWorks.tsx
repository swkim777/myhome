'use client';

import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AuthModal } from '../modals/AuthModal';
import { CardEditModal } from '../modals/CardEditModal';
import { RecentWorkItem } from '../../types';
import { Clock, CheckCircle2, Plus, Edit2, Trash2 } from 'lucide-react';

export function RecentWorks() {
  const {
    isAuthenticated,
    recentWorks,
    addRecentWork,
    updateRecentWork,
    deleteRecentWork,
  } = useAdmin();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RecentWorkItem | undefined>(undefined);
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

  const handleOpenEdit = (item: RecentWorkItem) => {
    handleActionWithAuth(() => {
      setEditingItem(item);
      setEditModalOpen(true);
    });
  };

  const handleDelete = (id: string) => {
    handleActionWithAuth(() => {
      if (confirm('정말로 이 작업 카드를 삭제하시겠습니까?')) {
        deleteRecentWork(id);
      }
    });
  };

  const handleSave = (payload: any) => {
    if (editingItem) {
      updateRecentWork(editingItem.id, payload);
    } else {
      addRecentWork(payload);
    }
  };

  return (
    <section id="recent-works" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                05 // RECENT WORKS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              최신 작업 & 릴리스 타임라인
            </h2>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all hover:-translate-y-0.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>작업 추가</span>
          </button>
        </div>

        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mb-12">
          현재 활발하게 개발 중이거나 최근 배포를 완료한 최신 프로젝트 작업 현황입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentWorks.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-7 flex flex-col justify-between hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:-translate-y-1 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {item.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                      {item.badge.includes('Release') ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      )}
                      {item.badge}
                    </span>

                    {/* Edit & Delete Actions */}
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        title="작업 수정"
                        className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        title="작업 삭제"
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>타임스탬프: {item.date}</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">Live System</span>
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
        section="recent-works"
        initialData={editingItem}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
        onDelete={(id) => deleteRecentWork(id)}
      />
    </section>
  );
}
