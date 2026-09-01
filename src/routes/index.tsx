import { useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { getTodos, addTodo, toggleTodo, deleteTodo } from '../server/todos'
import { getServerStats } from '../server/system'
import type { Todo, SystemStats } from '../types'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [todos, stats] = await Promise.all([getTodos(), getServerStats()])
    return { initialTodos: todos, stats }
  },
  component: App,
})

function App() {
  const { initialTodos, stats: initialStats } = Route.useLoaderData()
  const router = useRouter()

  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [stats, setStats] = useState<SystemStats>(initialStats)
  const [newTitle, setNewTitle] = useState('')
  const [category, setCategory] = useState<'frontend' | 'backend' | 'fullstack'>('fullstack')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRefreshingStats, setIsRefreshingStats] = useState(false)

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    setIsSubmitting(true)
    try {
      const created = await addTodo({
        data: {
          title: newTitle.trim(),
          category,
        },
      })
      setTodos((prev) => [created, ...prev])
      setNewTitle('')
      router.invalidate()
    } catch (err) {
      console.error('Failed to add todo:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggle = async (id: string) => {
    // Optimistic UI update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
    try {
      await toggleTodo({ data: { id } })
      router.invalidate()
    } catch (err) {
      console.error('Failed to toggle todo:', err)
    }
  }

  const handleDelete = async (id: string) => {
    // Optimistic UI update
    setTodos((prev) => prev.filter((t) => t.id !== id))
    try {
      await deleteTodo({ data: { id } })
      router.invalidate()
    } catch (err) {
      console.error('Failed to delete todo:', err)
    }
  }

  const handleRefreshStats = async () => {
    setIsRefreshingStats(true)
    try {
      const updatedStats = await getServerStats()
      setStats(updatedStats)
    } catch (err) {
      console.error('Failed to refresh stats:', err)
    } finally {
      setIsRefreshingStats(false)
    }
  }

  const categoryBadgeColors = {
    fullstack: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    backend: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
    frontend: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
  }

  return (
    <main className="page-wrap px-4 pb-16 pt-10">
      {/* Hero Section */}
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--lagoon-deep)]">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          Bundled Full-Stack Architecture
        </div>

        <h1 className="display-title mt-4 mb-4 max-w-3xl text-3xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          Unified TanStack App
        </h1>
        
        <p className="max-w-2xl text-base leading-relaxed text-[var(--sea-ink-soft)] sm:text-lg">
          Both frontend React UI and backend Server Functions are bundled into a single high-performance Nitro runtime. Powered by TanStack Start, TanStack Router, and Vite.
        </p>

        {/* Live Server Stats Card */}
        <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-5 backdrop-blur-md shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <h3 className="m-0 text-sm font-bold uppercase tracking-wider text-[var(--sea-ink)]">
                Bundled Server Runtime
              </h3>
            </div>
            <button
              onClick={handleRefreshStats}
              disabled={isRefreshingStats}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--chip-bg)] px-3 py-1 text-xs font-medium text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)] disabled:opacity-50"
            >
              {isRefreshingStats ? 'Refreshing...' : '🔄 Refresh Server Stats'}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
              <span className="block text-xs font-medium text-[var(--sea-ink-soft)]">Node Runtime</span>
              <span className="text-sm font-bold text-[var(--sea-ink)]">{stats.nodeVersion}</span>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
              <span className="block text-xs font-medium text-[var(--sea-ink-soft)]">Platform & Arch</span>
              <span className="text-sm font-bold text-[var(--sea-ink)]">{stats.platform} ({stats.arch})</span>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
              <span className="block text-xs font-medium text-[var(--sea-ink-soft)]">Server Memory</span>
              <span className="text-sm font-bold text-[var(--sea-ink)]">{stats.memoryUsageMB} MB heap</span>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
              <span className="block text-xs font-medium text-[var(--sea-ink-soft)]">Server Uptime</span>
              <span className="text-sm font-bold text-[var(--sea-ink)]">{stats.uptimeSeconds}s</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Full-Stack Demo Section */}
      <section className="mt-10 grid gap-8 lg:grid-cols-12">
        {/* Task Manager Component */}
        <div className="island-shell rounded-2xl p-6 sm:p-8 lg:col-span-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--sea-ink)]">Full-Stack Server Functions (RPC)</h2>
              <p className="text-sm text-[var(--sea-ink-soft)]">
                Direct type-safe client-to-server RPC without manual fetch endpoints.
              </p>
            </div>
            <span className="rounded-full bg-[var(--chip-bg)] border border-[var(--chip-line)] px-3 py-1 text-xs font-semibold text-[var(--sea-ink)]">
              {todos.filter((t) => t.completed).length} / {todos.length} Done
            </span>
          </div>

          {/* Add Todo Form */}
          <form onSubmit={handleAddTodo} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Add a new task or server operation..."
              className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2.5 text-sm text-[var(--sea-ink)] placeholder-[var(--sea-ink-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--lagoon)]"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as 'frontend' | 'backend' | 'fullstack')}
              className="rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--sea-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--lagoon)]"
            >
              <option value="fullstack">Fullstack</option>
              <option value="backend">Backend</option>
              <option value="frontend">Frontend</option>
            </select>
            <button
              type="submit"
              disabled={isSubmitting || !newTitle.trim()}
              className="rounded-xl bg-[var(--lagoon-deep)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 sm:w-auto"
            >
              {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
          </form>

          {/* Todo List */}
          <div className="mt-6 space-y-2.5">
            {todos.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--sea-ink-soft)]">
                No items yet. Add your first task above!
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between rounded-xl border border-[var(--line)] p-3.5 transition ${
                    todo.completed ? 'bg-[var(--surface)] opacity-75' : 'bg-[var(--surface-strong)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                      className="h-4 w-4 cursor-pointer rounded border-[var(--line)] text-[var(--lagoon-deep)] focus:ring-[var(--lagoon)]"
                    />
                    <div>
                      <p
                        className={`m-0 text-sm font-medium text-[var(--sea-ink)] ${
                          todo.completed ? 'line-through text-[var(--sea-ink-soft)]' : ''
                        }`}
                      >
                        {todo.title}
                      </p>
                      <span className="text-[11px] text-[var(--sea-ink-soft)]">
                        {new Date(todo.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${
                        categoryBadgeColors[todo.category]
                      }`}
                    >
                      {todo.category}
                    </span>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="rounded-lg p-1.5 text-[var(--sea-ink-soft)] transition hover:bg-rose-500/10 hover:text-rose-600"
                      title="Delete task"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Full-Stack Bundle Features */}
        <div className="space-y-4 lg:col-span-5">
          <div className="island-shell rounded-2xl p-6">
            <h3 className="text-base font-bold text-[var(--sea-ink)]">📦 Single Bundle Architecture</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
              This application builds both client SPA bundles and Nitro SSR server bundles in one step via <code>vite build</code>.
            </p>
            <div className="mt-4 rounded-xl bg-[var(--surface)] p-3 font-mono text-xs text-[var(--sea-ink)] space-y-1">
              <div>📁 <b>.output/public</b> → Client Hydration & Assets</div>
              <div>📁 <b>.output/server</b> → Nitro Node Server & RPC Handlers</div>
            </div>
          </div>

          <div className="island-shell rounded-2xl p-6">
            <h3 className="text-base font-bold text-[var(--sea-ink)]">⚡ Key Highlights</h3>
            <ul className="mt-3 space-y-2 pl-4 text-sm text-[var(--sea-ink-soft)] list-disc">
              <li><b>createServerFn</b>: Call backend code with full TypeScript type safety.</li>
              <li><b>Zero API Glue</b>: No manual route handlers or fetch serializer boilerplate.</li>
              <li><b>SSR + Hydration</b>: Pages render instantly on the server and hydrate cleanly.</li>
              <li><b>Unified Config</b>: Managed through a single <code>vite.config.ts</code>.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
