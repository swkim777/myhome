/**
 * @file todo.ts
 * @description Core type definitions for the Todo application.
 */

/**
 * Interface representing a single Todo item.
 */
export interface Todo {
  /** Unique identifier (UUID) */
  id: string;
  /** The text content of the task */
  text: string;
  /** Whether the task is completed */
  completed: boolean;
  /** Timestamp when the task was created */
  createdAt: number;
}
