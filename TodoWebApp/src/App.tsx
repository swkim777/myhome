/**
 * @file App.tsx
 * @description Root component of the Todo application. Sets up providers and layout.
 */
import { TodoProvider } from './context/TodoContext';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { CheckCircle, Sparkles, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Main Application Component.
 * Integrates all sub-components and global state into a premium UI.
 */
function App() {
  return (
    <TodoProvider>
      <div className="relative min-h-screen overflow-hidden py-12 px-4 selection:bg-blue-100 selection:text-blue-900">
        {/* Animated Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-400/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-purple-400/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative mx-auto max-w-2xl">
          {/* Header Section */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
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
            className="glass rounded-[2rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_32px_80px_-16px_rgba(0,0,0,0.15)]"
          >
            <TodoForm />
            <TodoList />
          </motion.main>
          
          {/* Footer Info */}
          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-col items-center justify-center space-y-4"
          >
            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle size={14} />
                <span className="text-xs font-bold uppercase tracking-widest">TS Robust</span>
              </div>
              <div className="flex items-center space-x-2">
                <Layout size={14} />
                <span className="text-xs font-bold uppercase tracking-widest">Context Flow</span>
              </div>
            </div>
            <p className="text-xs text-gray-300">
              &copy; 2026 FocusMode Application. Designed for clarity.
            </p>
          </motion.footer>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
