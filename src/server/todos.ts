import { createServerFn } from '@tanstack/react-start'
import type { Todo } from '../types'

let todos: Todo[] = [
  {
    id: '1',
    title: 'Configure unified TanStack Start client + server bundle',
    category: 'fullstack',
    completed: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    title: 'Implement type-safe RPC via createServerFn()',
    category: 'backend',
    completed: true,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '3',
    title: 'Render SSR-hydrated interactive React UI with Tailwind CSS',
    category: 'frontend',
    completed: false,
    createdAt: new Date().toISOString(),
  },
]

export const getTodos = createServerFn({ method: 'GET' }).handler(async (): Promise<Todo[]> => {
  return todos
})

export const addTodo = createServerFn({ method: 'POST' })
  .validator((data: { title: string; category: 'frontend' | 'backend' | 'fullstack' }) => data)
  .handler(async ({ data }): Promise<Todo> => {
    const title = data.title?.trim()
    if (!title) {
      throw new Error('Title cannot be empty')
    }
    const newTodo: Todo = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      category: data.category || 'fullstack',
      completed: false,
      createdAt: new Date().toISOString(),
    }
    todos.unshift(newTodo)
    return newTodo
  })

export const toggleTodo = createServerFn({ method: 'POST' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<Todo | undefined> => {
    const todo = todos.find((t) => t.id === data.id)
    if (todo) {
      todo.completed = !todo.completed
    }
    return todo
  })

export const deleteTodo = createServerFn({ method: 'POST' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<{ success: boolean }> => {
    todos = todos.filter((t) => t.id !== data.id)
    return { success: true }
  })
