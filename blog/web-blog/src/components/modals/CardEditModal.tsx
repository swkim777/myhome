'use client';

import React, { useState, useEffect } from 'react';
import { X, Trash2, CheckCircle2 } from 'lucide-react';

export type SectionType = 'app-tool' | 'portfolio' | 'blog' | 'recent-works';

interface CardEditModalProps {
  isOpen: boolean;
  section: SectionType;
  initialData?: any;
  onClose: () => void;
  onSave: (data: any) => void;
  onDelete?: (id: string) => void;
}

export const CardEditModal: React.FC<CardEditModalProps> = ({
  isOpen,
  section,
  initialData,
  onClose,
  onSave,
  onDelete,
}) => {
  const isEdit = Boolean(initialData?.id);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<'게시됨' | '작성 중' | '추후 작성'>('작성 중');
  const [tags, setTags] = useState('');
  const [yearOrDate, setYearOrDate] = useState('2026.11');
  const [badge, setBadge] = useState('Release v1.0');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setCategory(initialData.category || '');
      setSummary(initialData.summary || initialData.description || '');
      setStatus(initialData.status || '작성 중');
      setTags(Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '');
      setYearOrDate(initialData.publishedAt || initialData.year || initialData.date || '2026.11');
      setBadge(initialData.badge || 'Release v1.0');
    } else {
      // Default reset
      setTitle('');
      setCategory(
        section === 'app-tool' ? '일반앱' : section === 'blog' ? 'AI' : 'Web Platform'
      );
      setSummary('');
      setStatus('작성 중');
      setTags('AI, Web');
      setYearOrDate('2026.11');
      setBadge('Release v1.0');
    }
  }, [initialData, section, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tagArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    let payload: any = {
      title,
      category,
    };

    if (section === 'app-tool') {
      payload = {
        ...payload,
        summary,
        status,
        tags: tagArray,
      };
    } else if (section === 'portfolio') {
      payload = {
        ...payload,
        description: summary,
        year: yearOrDate,
        tags: tagArray,
      };
    } else if (section === 'blog') {
      payload = {
        ...payload,
        summary,
        status,
        publishedAt: yearOrDate,
        slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || `post-${Date.now()}`,
      };
    } else if (section === 'recent-works') {
      payload = {
        ...payload,
        description: summary,
        badge,
        date: yearOrDate,
      };
    }

    if (isEdit) {
      payload.id = initialData.id;
    }

    onSave(payload);
    onClose();
  };

  const handleDelete = () => {
    if (initialData?.id && onDelete) {
      if (confirm('정말로 이 카드를 삭제하시겠습니까?')) {
        onDelete(initialData.id);
        onClose();
      }
    }
  };

  const getSectionTitle = () => {
    switch (section) {
      case 'app-tool':
        return 'App & Tool';
      case 'portfolio':
        return 'Portfolio';
      case 'blog':
        return 'Blog';
      case 'recent-works':
        return 'Recent Works';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
            {getSectionTitle()} // {isEdit ? '카드 수정' : '신규 카드 추가'}
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {isEdit ? '카드 내용 수정 및 관리' : '새로운 카드 항목 작성'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
              카테고리 (Category)
            </label>
            {section === 'blog' ? (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              >
                {['AI', 'IT', '소설', '여행', '영화', '재테크', '책', '기타', '일반앱', '업무', '미디어'].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            ) : section === 'app-tool' ? (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              >
                <option value="일반앱">일반앱</option>
                <option value="업무">업무</option>
                <option value="미디어">미디어</option>
                <option value="기타">기타</option>
              </select>
            ) : (
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="예: Web Platform, Education, AI Agent 등"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              />
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
              제목 (Title)
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
            />
          </div>

          {/* Summary / Description */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
              설명 / 요약문 (Description)
            </label>
            <textarea
              required
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="내용에 대한 핵심 요약 또는 설명을 작성하세요"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
            />
          </div>

          {/* Status (for app-tool & blog) */}
          {(section === 'app-tool' || section === 'blog') && (
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                상태 (Status)
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              >
                <option value="게시됨">게시됨</option>
                <option value="작성 중">작성 중</option>
                <option value="추후 작성">추후 작성</option>
              </select>
            </div>
          )}

          {/* Badge (for recent-works) */}
          {section === 'recent-works' && (
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                배지 텍스트 (Badge)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="예: Release v1.0, In Progress, Completed"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              />
            </div>
          )}

          {/* Year / Date */}
          {(section === 'portfolio' || section === 'blog' || section === 'recent-works') && (
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                연도 / 날짜 (Date / Year)
              </label>
              <input
                type="text"
                value={yearOrDate}
                onChange={(e) => setYearOrDate(e.target.value)}
                placeholder="예: 2026.11 또는 2026"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              />
            </div>
          )}

          {/* Tags (for app-tool & portfolio) */}
          {(section === 'app-tool' || section === 'portfolio') && (
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                태그 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="예: Next.js, AI, Automation"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            {isEdit && onDelete ? (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-red-300 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 text-sm font-semibold transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>삭제하기</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEdit ? '수정 완료' : '추가하기'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
