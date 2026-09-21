/**
 * @file TodoList.tsx
 * @description Container component that filters and renders the list of todos.
 * Handles empty states and provides filter controls (All, Active, Completed).
 */
import React, { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CheckCircle, Circle, Save, Loader2, AlertCircle, ExternalLink, Settings, Folder, RotateCw, FileSpreadsheet } from 'lucide-react';
import { SPREADSHEET_URL } from '../services/googleSheets';

interface TodoListProps {
  onOpenSettings?: () => void;
}

/**
 * TodoList Component.
 * Displays filtered todos and provides a dashboard view of task metrics with Google Drive save support.
 */
export const TodoList: React.FC<TodoListProps> = ({ onOpenSettings }) => {
  const { 
    todos, 
    filter, 
    setFilter, 
    clearCompleted, 
    refreshFromSheet, 
    isSheetLoading,
    syncAllToSheet,
    isSavingToSheet,
    isDriveLoading
  } = useTodoContext();

  const [saveStatus, setSaveStatus] = useState<{
    type: 'success' | 'error';
    message: string;
    fileUrl?: string;
    folderUrl?: string;
    sheetUrl?: string;
  } | null>(null);

  const handleSaveToSheet = async () => {
    const res = await syncAllToSheet();
    if (res.success) {
      setSaveStatus({
        type: 'success',
        message: res.message || `구글 시트(Todos)의 기존 데이터를 삭제하고 현재 ${todos.length}개의 일정을 성공적으로 저장했습니다.`,
        sheetUrl: res.sheetUrl || SPREADSHEET_URL,
      });
      // 9초 후 성공 알림 자동 닫기
      setTimeout(() => {
        setSaveStatus(null);
      }, 9000);
    } else {
      setSaveStatus({
        type: 'error',
        message: res.message || '구글 시트 저장 중 오류가 발생했습니다. Apps Script 설정을 확인해 주세요.',
        sheetUrl: SPREADSHEET_URL,
      });
      // 실패 시 15초 후 닫기
      setTimeout(() => {
        setSaveStatus(null);
      }, 15000);
    }
  };

  const handleReloadFromSheet = async () => {
    const res = await refreshFromSheet();
    if (res.success) {
      setSaveStatus({
        type: 'success',
        message: res.message || `구글 시트(Todos)에서 ${res.count}개의 최신 일정을 성공적으로 불러왔습니다.`,
        sheetUrl: SPREADSHEET_URL,
      });
      // 8초 후 성공 알림 자동 닫기
      setTimeout(() => {
        setSaveStatus(null);
      }, 8000);
    } else {
      setSaveStatus({
        type: 'error',
        message: res.message || '구글 시트 일정을 불러오지 못했습니다. 앱스 스크립트 연결을 확인해 주세요.',
        sheetUrl: SPREADSHEET_URL,
      });
      // 실패 시 12초 후 닫기
      setTimeout(() => {
        setSaveStatus(null);
      }, 12000);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex bg-gray-100/50 p-1 rounded-xl backdrop-blur-sm">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                filter === f
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        
        {todos.some(t => t.completed) && (
          <button
            onClick={clearCompleted}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            Clear Completed
          </button>
        )}
      </div>

      {/* Drive Loading Banner */}
      <AnimatePresence>
        {isDriveLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center space-x-2.5 px-4 py-2.5 bg-blue-50/80 border border-blue-100 text-blue-700 rounded-xl text-xs font-medium backdrop-blur-sm">
              <Loader2 size={15} className="animate-spin text-blue-600 shrink-0" />
              <span>구글 드라이브(todos.csv)에서 최신 일정을 불러오는 중입니다...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-[200px]">
        <AnimatePresence mode="popLayout">
          {filteredTodos.length > 0 ? (
            <motion.ul layout className="space-y-1">
              {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </motion.ul>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-12 text-gray-400"
            >
              <div className="mb-4 rounded-full bg-gray-50 p-6">
                <ClipboardList size={48} strokeWidth={1} />
              </div>
              <p className="text-lg font-medium">
                {filter === 'all' 
                  ? "No tasks yet. Ready to be productive?" 
                  : filter === 'active' 
                    ? "All caught up! Well done." 
                    : "No completed tasks yet."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info & Save Action */}
      <div className="pt-4 border-t border-gray-100/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500 font-medium">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5">
            <Circle size={14} className="text-blue-500" />
            {activeCount} active
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle size={14} className="text-green-500" />
            {todos.length - activeCount} completed
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Reload (Google Sheet) Button */}
          <button
            onClick={handleReloadFromSheet}
            disabled={isSheetLoading || isSavingToSheet}
            title="구글 스프레드시트(Todos)에서 최신 일정을 다시 읽어와 화면에 표시합니다"
            className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200/80 shadow-sm active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
          >
            <RotateCw size={14} className={`text-emerald-700 transition-transform ${isSheetLoading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
            <span>{isSheetLoading ? '시트 불러오는 중...' : 'Reload (구글 시트)'}</span>
          </button>

          {/* Save (Google Sheet) Button */}
          <button
            onClick={handleSaveToSheet}
            disabled={isSavingToSheet || isSheetLoading}
            title="현재 등록된 일정들을 구글 시트(Todos)에 덮어써서 저장합니다 (기존 데이터 모두 삭제 후 저장)"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 font-semibold text-xs border border-blue-200/70 shadow-sm active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
          >
            {isSavingToSheet ? (
              <Loader2 size={14} className="animate-spin text-blue-600" />
            ) : (
              <Save size={14} className="text-blue-600 group-hover:scale-110 transition-transform" />
            )}
            <span>{isSavingToSheet ? '시트에 저장 중...' : 'Save (구글 시트)'}</span>
          </button>
        </div>
      </div>

      {/* Save Feedback Banner */}
      <AnimatePresence>
        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className={`p-3.5 rounded-xl border text-xs font-medium flex items-start justify-between gap-3 shadow-sm ${
              saveStatus.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            <div className="flex items-start space-x-2.5 flex-1 min-w-0">
              {saveStatus.type === 'success' ? (
                <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed break-words">{saveStatus.message}</span>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {saveStatus.type === 'error' && onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  <Settings size={12} />
                  <span>설정 열기</span>
                </button>
              )}
              {saveStatus.fileUrl && (
                <a
                  href={saveStatus.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                >
                  <span>파일 보기</span>
                  <ExternalLink size={12} />
                </a>
              )}
              {saveStatus.folderUrl && (
                <a
                  href={saveStatus.folderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
                  title="구글 드라이브 지정 폴더(1iOCkY5GlDNgul7V-rd3kpVOq0AFGYA-J) 열기"
                >
                  <Folder size={12} />
                  <span>지정 폴더 열기</span>
                  <ExternalLink size={12} />
                </a>
              )}
              {saveStatus.sheetUrl && (
                <a
                  href={saveStatus.sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                  title="구글 스프레드시트 열기"
                >
                  <FileSpreadsheet size={12} />
                  <span>구글 시트 열기</span>
                  <ExternalLink size={12} />
                </a>
              )}
              <button
                onClick={() => setSaveStatus(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-sm leading-none"
                title="닫기"
              >
                &times;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
