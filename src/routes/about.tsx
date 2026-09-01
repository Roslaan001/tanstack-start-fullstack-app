import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({ component: About })

function About() {
  return (
    <main className="page-wrap px-4 pb-16 pt-12">
      <section className="island-shell rounded-[2rem] p-8 sm:p-12">
        <p className="island-kicker mb-2">Architecture & Overview</p>
        <h1 className="display-title mb-6 text-3xl font-extrabold text-[var(--sea-ink)] sm:text-4xl">
          Unified Full-Stack TanStack App
        </h1>
        
        <div className="prose max-w-none text-[var(--sea-ink-soft)] space-y-6">
          <p className="text-base sm:text-lg leading-relaxed">
            This project is built using <b>TanStack Start</b>, the full-stack React framework powered by TanStack Router and Nitro. Both the frontend client application and backend server logic are packaged, bundled, and run together in one cohesive workspace.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 mt-6 not-prose">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-6">
              <h3 className="text-lg font-bold text-[var(--sea-ink)] mb-2">🌐 Frontend Layer</h3>
              <ul className="space-y-2 text-sm text-[var(--sea-ink-soft)] list-disc pl-5">
                <li>React 19 with Server-Side Rendering (SSR) and Client Hydration.</li>
                <li>TanStack Router for 100% type-safe file-based routing.</li>
                <li>Tailwind CSS v4 for modern responsive styles and theme support.</li>
                <li>Optimistic client-side UI mutations.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-6">
              <h3 className="text-lg font-bold text-[var(--sea-ink)] mb-2">⚙️ Backend Layer</h3>
              <ul className="space-y-2 text-sm text-[var(--sea-ink-soft)] list-disc pl-5">
                <li>Nitro high-performance unified server engine.</li>
                <li>Type-safe RPC Server Functions via <code>createServerFn()</code>.</li>
                <li>Direct database/storage access securely isolated from client bundles.</li>
                <li>Automated request routing and validation.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 mt-6 not-prose">
            <h3 className="text-base font-bold text-[var(--sea-ink)] mb-3">🛠️ Development & Production Commands</h3>
            <div className="space-y-2 font-mono text-xs text-[var(--sea-ink)]">
              <div className="p-2.5 rounded-lg bg-[var(--surface-strong)] border border-[var(--line)]">
                <b>npm run dev</b> — Starts Vite development server with Hot Module Replacement
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--surface-strong)] border border-[var(--line)]">
                <b>npm run build</b> — Bundles both frontend (<code>.output/public</code>) and backend (<code>.output/server</code>)
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--surface-strong)] border border-[var(--line)]">
                <b>npm run preview</b> — Previews the production bundled server locally
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
