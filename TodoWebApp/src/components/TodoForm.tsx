/**
 * @file TodoForm.tsx
 * @description Input component for creating new todo items.
 * Includes validation to prevent empty submissions and a premium look.
 */
import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { PlusCircle } from 'lucide-react';

/**
 * TodoForm Component.
 * Provides a modern input field for task creation.
 */
export const TodoForm = () => {
  const [text, setText] = useState('');
  const { addTodo } = useTodoContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    addTodo(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-8">
      <div className="group relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind today?"
          className="w-full rounded-2xl border-none bg-white/50 px-6 py-4 pr-16 text-lg text-gray-800 shadow-inner backdrop-blur-md outline-none ring-2 ring-transparent transition-all focus:bg-white focus:ring-blue-400/30 placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="absolute right-2 rounded-xl bg-blue-600 p-3 text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:bg-gray-400"
          aria-label="Add Todo"
        >
          <PlusCircle size={24} />
        </button>
      </div>
      {/* Decorative focus line */}
      <div className="absolute -bottom-1 left-4 right-4 h-0.5 scale-x-0 bg-blue-400 transition-transform duration-500 group-focus-within:scale-x-100" />
    </form>
  );
};
