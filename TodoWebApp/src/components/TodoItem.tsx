/**
 * @file TodoItem.tsx
 * @description Renders an individual todo item with editing and completion toggling features.
 * Uses Framer Motion for smooth animations and Lucide-React for iconography.
 */
import { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/todo';
import { useTodoContext } from '../context/TodoContext';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Individual Todo Item Component.
 * Supports inline editing on double-click and completion status toggling.
 */
export const TodoItem = ({ todo }: { todo: Todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleUpdate = () => {
    if (editText.trim() && editText !== todo.text) {
      updateTodo(todo.id, editText.trim());
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleUpdate();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="group relative flex items-center justify-between rounded-xl border border-white/20 bg-white/70 p-4 shadow-sm backdrop-blur-md transition-all hover:shadow-lg mb-3 overflow-hidden"
    >
      {/* Dynamic side accent */}
      <div 
        className={`absolute left-0 top-0 h-full w-1 transition-all duration-300 ${
          todo.completed ? 'bg-green-400' : 'bg-blue-500'
        }`} 
      />

      <div className="flex flex-1 items-center space-x-4">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`group flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300 ${
            todo.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-blue-400 text-transparent hover:text-blue-400/50'
          }`}
          aria-label="Toggle completion"
        >
          <Check size={14} strokeWidth={3} />
        </button>

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-lg border-none bg-blue-50/50 px-2 py-1 text-lg text-gray-800 focus:outline-none focus:ring-0"
          />
        ) : (
          <span
            className={`text-lg transition-all duration-500 cursor-pointer ${
              todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {!todo.completed && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-500 transition-all"
            aria-label="Edit todo"
          >
            <Edit2 size={18} />
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
          aria-label="Delete todo"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.li>
  );
};
