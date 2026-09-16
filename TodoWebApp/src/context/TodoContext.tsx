/**
 * @file TodoContext.tsx
 * @description Manages the global state for the Todo application using React Context API.
 * Handles CRUD operations, persistence via LocalStorage, and filtering logic.
 */
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Todo } from '../types/todo';

/**
 * Shape of the TodoContext state and actions.
 */
interface TodoContextType {
  /** Array of all todo items */
  todos: Todo[];
  /** Function to add a new todo */
  addTodo: (text: string) => void;
  /** Function to update an existing todo's text */
  updateTodo: (id: string, text: string) => void;
  /** Function to toggle the completion status of a todo */
  toggleTodo: (id: string) => void;
  /** Function to delete a todo by ID */
  deleteTodo: (id: string) => void;
  /** Current active filter for the list */
  filter: 'all' | 'active' | 'completed';
  /** Function to set the current filter */
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  /** Function to remove all completed todos */
  clearCompleted: () => void;
}

/**
 * Context object for the Todo application.
 * Initialized with undefined to enforce proper provider usage.
 */
const TodoContext = createContext<TodoContextType | undefined>(undefined);

/**
 * TodoProvider component that wraps the application part requiring access to Todo state.
 * @param children React children nodes to be wrapped
 */
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from local storage if available
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });
  
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Save to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Adds a new todo to the list
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // Updates an existing todo's text
  const updateTodo = (id: string, text: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  // Toggles the completion status of a todo
  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Deletes a todo from the list
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Clears all completed todos
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  return (
    <TodoContext.Provider 
      value={{ 
        todos, 
        addTodo, 
        updateTodo, 
        toggleTodo, 
        deleteTodo, 
        filter, 
        setFilter, 
        clearCompleted 
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

/**
 * Custom hook to consume the TodoContext.
 * Throws an error if used outside of a TodoProvider.
 * @returns {TodoContextType} The current todo context state and actions
 */
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
