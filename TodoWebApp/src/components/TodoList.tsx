/**
 * @file TodoList.tsx
 * @description Container component that filters and renders the list of todos.
 * Handles empty states and provides filter controls (All, Active, Completed).
 */
import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CheckCircle, Circle, Save, Loader2, AlertCircle, ExternalLink } from 'lucide-react';

/**
 * TodoList Component.
 * Displays filtered todos and provides a dashboard view of task metrics with Google Drive save support.
 */
export const TodoList = () => {
  const { todos, filter, setFilter, clearCompleted, isSavingToDrive, saveToDriveCsv } = useTodoContext();
  const [saveStatus, setSaveStatus] = useState<{
    type: 'success' | 'error';
    message: string;
    fileUrl?: string;
  } | null>(null);

  const handleSaveToDrive = async () => {
    const res = await saveToDriveCsv();
    if (res.success) {
      setSaveStatus({
        type: 'success',
        message: res.message || 'todos.csv 파일로 구글 드라이브에 저장되었습니다.',
        fileUrl: res.fileUrl,
      });
      // 8초 후 성공 알림 자동 닫기
      setTimeout(() => {
        setSaveStatus(null);
      }, 8000);
    } else {
      setSaveStatus({
        type: 'error',
        message: res.message || '구글 드라이브 저장 중 오류가 발생했습니다.',
      });
      // 실패 시 15초 후 닫기
      setTimeout(() => {
        setSaveStatus(null);
      }, 15000);
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

        <button
          onClick={handleSaveToDrive}
          disabled={isSavingToDrive}
          title="구글 드라이브 폴더(1iOCkY5GlDNgul7V-rd3kpVOq0AFGYA-J)의 todos.csv 파일에 저장"
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 font-semibold text-xs border border-blue-200/70 shadow-sm active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
        >
          {isSavingToDrive ? (
            <Loader2 size={15} className="animate-spin text-blue-600" />
          ) : (
            <Save size={15} className="text-blue-600 group-hover:scale-110 transition-transform" />
          )}
          <span>{isSavingToDrive ? '드라이브 저장 중...' : 'Save (todos.csv)'}</span>
        </button>
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
              {saveStatus.fileUrl && (
                <a
                  href={saveStatus.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                >
                  <span>드라이브 파일 보기</span>
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
