/**
 * @file TodoList.tsx
 * @description Container component that filters and renders the list of todos.
 * Handles empty states and provides filter controls (All, Active, Completed).
 */
import { useTodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CheckCircle, Circle } from 'lucide-react';

/**
 * TodoList Component.
 * Displays filtered todos and provides a dashboard view of task metrics.
 */
export const TodoList = () => {
  const { todos, filter, setFilter, clearCompleted } = useTodoContext();

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

      {todos.length > 0 && (
        <div className="flex items-center justify-between pt-4 text-sm text-gray-500 font-medium">
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
        </div>
      )}
    </div>
  );
};
