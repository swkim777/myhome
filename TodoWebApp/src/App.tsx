/**
 * @file App.tsx
 * @description Root component of the Todo application with Google Sheets synchronization.
 */
import { useState } from 'react';
import { TodoProvider, useTodo } from './context/TodoContext';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { SyncSettingsModal } from './components/SyncSettingsModal';
import { CheckCircle, Sparkles, Layout, RefreshCw, Settings, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

function TodoAppContent() {
  const { syncStatus, isSyncing, refreshFromSheet, refreshFromDriveCsv } = useTodo();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleRefresh = async () => {
    const res = await refreshFromDriveCsv();
    if (!res.success) {
      await refreshFromSheet();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden py-8 sm:py-12 px-4 selection:bg-blue-100 selection:text-blue-900">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-400/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-purple-400/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative mx-auto max-w-2xl">
        {/* Top Control Bar */}
        <div className="mb-8 flex items-center justify-between">
          <a 
            href="../index.html" 
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>myhome</span>
          </a>

          <div className="flex items-center space-x-2">
            <button 
              onClick={handleRefresh}
              disabled={isSyncing}
              title="구글 드라이브(todos.csv) 및 시트에서 최신 일정 새로고침"
              className="p-2 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/80 text-slate-600 hover:text-blue-600 hover:bg-white transition-all shadow-sm disabled:opacity-50"
            >
              <RefreshCw size={14} className={isSyncing ? 'animate-spin text-blue-600' : ''} />
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              title="연동 상태 확인"
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-white transition-all shadow-sm"
            >
              <span className={`w-2 h-2 rounded-full ${
                syncStatus === 'synced' ? 'bg-emerald-500' :
                syncStatus === 'syncing' ? 'bg-blue-500 animate-pulse' :
                syncStatus === 'error' ? 'bg-rose-500' : 'bg-amber-400'
              }`} />
              <span>{
                syncStatus === 'synced' ? '연동 완료' :
                syncStatus === 'syncing' ? '동기화 중...' :
                syncStatus === 'error' ? '연동 오류' : '로컬 모드'
              }</span>
            </button>

            {/* 명확한 설정 버튼 */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
              title="구글 Apps Script URL 및 동기화 설정 열기"
            >
              <Settings size={13} />
              <span>설정</span>
            </button>
          </div>
        </div>

        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center space-x-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600 shadow-sm">
            <Sparkles size={14} />
            <span>Next-Gen Productivity</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight sm:text-6xl">
            Focus<span className="text-blue-600 underline decoration-blue-200 decoration-8 underline-offset-8">Mode</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 font-medium">
            Eliminate noise. Get things done.
          </p>
        </motion.header>

        {/* Main App Container */}
        <motion.main 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-[2rem] p-6 sm:p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_32px_80px_-16px_rgba(0,0,0,0.15)]"
        >
          <TodoForm />
          <TodoList onOpenSettings={() => setIsSettingsOpen(true)} />
        </motion.main>
        
        {/* Footer Info */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-col items-center justify-center space-y-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle size={14} />
              <span className="text-xs font-bold uppercase tracking-widest">Drive todos.csv Sync</span>
            </div>
            <div className="flex items-center space-x-2">
              <Layout size={14} />
              <span className="text-xs font-bold uppercase tracking-widest">Google Sheets Sync</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            &copy; 2026 FocusMode Application &bull; Drive Folder: 1iOCkY5GlDNgul7V-rd3kpVOq0AFGYA-J &bull; Sheet ID: 1O_ze8NwS2YGQ-7KiX2zWG21WXYSuVQ-f
          </p>
        </motion.footer>

        {/* Sync Settings Modal */}
        <SyncSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <TodoAppContent />
    </TodoProvider>
  );
}

export default App;
