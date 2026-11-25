'use client';

import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AuthModal } from '../modals/AuthModal';
import { CardEditModal } from '../modals/CardEditModal';
import { AppItem } from '../../types';
import { AppWindow, Cpu, Film, Plus, Edit2, Trash2 } from 'lucide-react';

export function AppTool() {
  const { isAuthenticated, appTools, addAppTool, updateAppTool, deleteAppTool } = useAdmin();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AppItem | undefined>(undefined);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const getIcon = (category: string) => {
    switch (category) {
      case '일반앱':
        return <AppWindow className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case '업무':
        return <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case '미디어':
      default:
        return <Film className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
    }
  };

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

  const handleOpenEdit = (item: AppItem) => {
    handleActionWithAuth(() => {
      setEditingItem(item);
      setEditModalOpen(true);
    });
  };

  const handleDelete = (id: string) => {
    handleActionWithAuth(() => {
      if (confirm('정말로 이 카드를 삭제하시겠습니까?')) {
        deleteAppTool(id);
      }
    });
  };

  const handleSave = (payload: any) => {
    if (editingItem) {
      updateAppTool(editingItem.id, payload);
    } else {
      addAppTool(payload);
    }
  };

  return (
    <section id="app-tool" className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                02 // APP & TOOL
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              웹 애플리케이션 & 제작 도구
            </h2>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all hover:-translate-y-0.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>카드 추가</span>
          </button>
        </div>

        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mb-12">
          일상과 업무의 생산성을 혁신하고, 생성형 AI 미디어를 프로덕션 레벨로 다루는 웹앱 도구 컬렉션입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {appTools.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:-translate-y-1 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-slate-700 flex items-center justify-center">
                    {getIcon(item.category)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60">
                      {item.status}
                    </span>

                    {/* Edit & Delete Action Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        title="카드 수정"
                        className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        title="카드 삭제"
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
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
        section="app-tool"
        initialData={editingItem}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
        onDelete={(id) => deleteAppTool(id)}
      />
    </section>
  );
}
