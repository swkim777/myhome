/**
 * @file TodoContext.tsx
 * @description Manages global state for the Todo application with Google Sheets synchronization.
 * Supports optimistic UI updates, LocalStorage caching, and remote Google Apps Script sync.
 */
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Todo } from '../types/todo';
import { 
  getAppsScriptUrl, 
  fetchTodosFromSheet, 
  fetchTodosFromDriveCsv,
  addTodoToSheet, 
  updateTodoInSheet, 
  deleteTodoFromSheet, 
  clearCompletedFromSheet, 
  syncAllTodosToSheet,
  saveTodosToDriveCsv
} from '../services/googleSheets';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

/**
 * Shape of the TodoContext state and actions.
 */
interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  updateTodo: (id: string, text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  isSyncing: boolean;
  syncStatus: SyncStatus;
  lastSyncedAt: number | null;
  refreshFromSheet: () => Promise<{ success: boolean; count: number; message?: string }>;
  refreshFromDriveCsv: () => Promise<{ success: boolean; count: number; message?: string }>;
  syncAllToSheet: () => Promise<{ success: boolean; message: string; sheetUrl?: string; count?: number }>;
  isSavingToDrive: boolean;
  isSavingToSheet: boolean;
  isDriveLoading: boolean;
  isSheetLoading: boolean;
  saveToDriveCsv: () => Promise<{ success: boolean; message: string; fileUrl?: string; folderUrl?: string; folderName?: string }>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached todos', e);
      }
    }
    return [];
  });
  
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(() => {
    return getAppsScriptUrl() ? 'synced' : 'idle';
  });
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [isSavingToDrive, setIsSavingToDrive] = useState<boolean>(false);
  const [isSavingToSheet, setIsSavingToSheet] = useState<boolean>(false);
  const [isDriveLoading, setIsDriveLoading] = useState<boolean>(true);
  const [isSheetLoading, setIsSheetLoading] = useState<boolean>(false);

  // Save to LocalStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  /**
   * 구글 시트로부터 최신 일정을 불러옵니다.
   */
  const refreshFromSheet = useCallback(async (): Promise<{ success: boolean; count: number; message?: string }> => {
    const url = getAppsScriptUrl();
    if (!url) {
      setSyncStatus('idle');
      return { success: false, count: 0, message: 'Apps Script URL 미설정' };
    }

    setIsSyncing(true);
    setIsSheetLoading(true);
    setSyncStatus('syncing');

    try {
      const res = await fetchTodosFromSheet();
      if (res.success && Array.isArray(res.data)) {
        setTodos(res.data);
        setSyncStatus('synced');
        setLastSyncedAt(Date.now());
        return { success: true, count: res.count, message: res.message };
      } else {
        setSyncStatus('error');
        return { success: false, count: 0, message: res.message || '데이터를 불러오지 못했습니다.' };
      }
    } catch (err: any) {
      console.error('Refresh from sheet failed:', err);
      setSyncStatus('error');
      return { success: false, count: 0, message: err?.message || '구글 시트 연동 실패' };
    } finally {
      setIsSyncing(false);
      setIsSheetLoading(false);
    }
  }, []);

  /**
   * 구글 드라이브 지정 폴더(1iOCkY5GlDNgul7V-rd3kpVOq0AFGYA-J)의 todos.csv 파일로부터 최신 일정을 불러옵니다.
   */
  const refreshFromDriveCsv = useCallback(async (): Promise<{ success: boolean; count: number; message?: string }> => {
    const url = getAppsScriptUrl();
    if (!url) {
      setSyncStatus('idle');
      setIsDriveLoading(false);
      return { success: false, count: 0, message: 'Apps Script URL 미설정' };
    }

    setIsSyncing(true);
    setIsDriveLoading(true);
    setSyncStatus('syncing');

    try {
      const res = await fetchTodosFromDriveCsv();
      if (res.success && Array.isArray(res.data)) {
        // 구글 드라이브 todos.csv 파일의 내용을 화면에 즉시 동기화 반영
        setTodos(res.data);
        setSyncStatus('synced');
        setLastSyncedAt(Date.now());
        return { success: true, count: res.data.length, message: res.message };
      } else {
        setSyncStatus('error');
        return { success: false, count: 0, message: res.message };
      }
    } catch (err: any) {
      console.error('Refresh from Drive todos.csv failed:', err);
      setSyncStatus('error');
      return { success: false, count: 0, message: err.message };
    } finally {
      setIsSyncing(false);
      setIsDriveLoading(false);
    }
  }, []);

  /**
   * 앱이 처음 실행될 때 구글 드라이브 지정 폴더의 todos.csv 파일을 우선 로드하여 화면에 표시합니다.
   * 드라이브 로드 실패 시 구글 시트 데이터로 fallback합니다.
   */
  useEffect(() => {
    if (getAppsScriptUrl()) {
      refreshFromDriveCsv().then((res) => {
        if (!res.success) {
          refreshFromSheet();
        }
      });
    } else {
      setIsDriveLoading(false);
    }
  }, [refreshFromDriveCsv, refreshFromSheet]);

  /**
   * 새 일정 추가 (낙관적 UI + 구글 시트 비동기 저장)
   */
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };

    // 1. 화면 및 로컬 즉시 반영
    setTodos((prev) => [...prev, newTodo]);

    // 2. 구글 시트 비동기 동기화
    if (getAppsScriptUrl()) {
      setIsSyncing(true);
      setSyncStatus('syncing');
      addTodoToSheet(newTodo)
        .then((ok) => {
          setSyncStatus(ok ? 'synced' : 'error');
          if (ok) setLastSyncedAt(Date.now());
        })
        .catch(() => setSyncStatus('error'))
        .finally(() => setIsSyncing(false));
    }
  };

  /**
   * 일정 내용 수정
   */
  const updateTodo = (id: string, text: string) => {
    let updatedTodo: Todo | undefined;

    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          updatedTodo = { ...todo, text };
          return updatedTodo;
        }
        return todo;
      })
    );

    if (updatedTodo && getAppsScriptUrl()) {
      setIsSyncing(true);
      setSyncStatus('syncing');
      updateTodoInSheet(updatedTodo)
        .then((ok) => {
          setSyncStatus(ok ? 'synced' : 'error');
          if (ok) setLastSyncedAt(Date.now());
        })
        .catch(() => setSyncStatus('error'))
        .finally(() => setIsSyncing(false));
    }
  };

  /**
   * 완료 여부 토글
   */
  const toggleTodo = (id: string) => {
    let updatedTodo: Todo | undefined;

    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          updatedTodo = { ...todo, completed: !todo.completed };
          return updatedTodo;
        }
        return todo;
      })
    );

    if (updatedTodo && getAppsScriptUrl()) {
      setIsSyncing(true);
      setSyncStatus('syncing');
      updateTodoInSheet(updatedTodo)
        .then((ok) => {
          setSyncStatus(ok ? 'synced' : 'error');
          if (ok) setLastSyncedAt(Date.now());
        })
        .catch(() => setSyncStatus('error'))
        .finally(() => setIsSyncing(false));
    }
  };

  /**
   * 일정 삭제
   */
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    if (getAppsScriptUrl()) {
      setIsSyncing(true);
      setSyncStatus('syncing');
      deleteTodoFromSheet(id)
        .then((ok) => {
          setSyncStatus(ok ? 'synced' : 'error');
          if (ok) setLastSyncedAt(Date.now());
        })
        .catch(() => setSyncStatus('error'))
        .finally(() => setIsSyncing(false));
    }
  };

  /**
   * 완료된 일정 일괄 삭제
   */
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));

    if (getAppsScriptUrl()) {
      setIsSyncing(true);
      setSyncStatus('syncing');
      clearCompletedFromSheet()
        .then((ok) => {
          setSyncStatus(ok ? 'synced' : 'error');
          if (ok) setLastSyncedAt(Date.now());
        })
        .catch(() => setSyncStatus('error'))
        .finally(() => setIsSyncing(false));
    }
  };

  /**
   * 현재 전체 일정을 구글 시트로 강제 덮어쓰기 저장 (기존 데이터 삭제 후 신규 저장)
   */
  const syncAllToSheet = async (): Promise<{ success: boolean; message: string; sheetUrl?: string; count?: number }> => {
    if (!getAppsScriptUrl()) {
      return { success: false, message: 'Google Apps Script URL이 설정되지 않았습니다. 상단 설정에서 등록해 주세요.' };
    }
    setIsSyncing(true);
    setIsSavingToSheet(true);
    setSyncStatus('syncing');
    try {
      const res = await syncAllTodosToSheet(todos);
      setSyncStatus(res.success ? 'synced' : 'error');
      if (res.success) setLastSyncedAt(Date.now());
      return res;
    } catch (err: any) {
      setSyncStatus('error');
      return { success: false, message: err?.message || '구글 시트 저장 실패' };
    } finally {
      setIsSyncing(false);
      setIsSavingToSheet(false);
    }
  };

  /**
   * 구글 드라이브에 todos.csv 파일로 일정을 저장/반영합니다.
   */
  const saveToDriveCsv = async (): Promise<{ success: boolean; message: string; fileUrl?: string; folderUrl?: string; folderName?: string }> => {
    setIsSavingToDrive(true);
    try {
      const res = await saveTodosToDriveCsv(todos);
      return res;
    } finally {
      setIsSavingToDrive(false);
    }
  };

  return (
    <TodoContext.Provider 
      value={{ 
        todos, 
        addTodo, 
        updateTodo, 
        toggleTodo, 
        deleteTodo, 
        clearCompleted, 
        filter, 
        setFilter,
        isSyncing,
        syncStatus,
        lastSyncedAt,
        refreshFromSheet,
        refreshFromDriveCsv,
        syncAllToSheet,
        isSavingToDrive,
        isSavingToSheet,
        isDriveLoading,
        isSheetLoading,
        saveToDriveCsv,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export const useTodoContext = useTodo;
