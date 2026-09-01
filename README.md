# ⚡ Unified Full-Stack TanStack App

A modern, type-safe full-stack application with **both frontend and backend bundled into a single runtime** using **TanStack Start**, **TanStack Router**, **React 19**, **Vite**, and **Nitro**.

---

## 🌟 Highlights

- **Unified Single-Bundle Architecture**: Build both frontend client assets (`.output/public`) and backend Nitro SSR server (`.output/server`) in a single step.
- **Type-Safe RPC Server Functions**: Use `createServerFn` for seamless, end-to-end type-safe client-server communication without manual API boilerplate or fetch glue.
- **Full-Stack File-Based Routing**: TanStack Router with 100% TypeScript type safety across routes, params, search params, and loaders.
- **Server-Side Rendering (SSR) & Streaming**: Fast initial page load with pre-rendered server state and instant client hydration.
- **Tailwind CSS v4**: Modern, responsive styling with native dark/light theme switching.

---

## 🏗️ Project Architecture

```
tanstack-app/
├── src/
│   ├── routes/              # File-based routes & SSR page loaders
│   │   ├── __root.tsx       # Root document layout & theme scripts
│   │   ├── index.tsx        # Interactive Full-Stack Dashboard
│   │   └── about.tsx        # Architecture & Documentation
│   ├── server/              # Backend server functions (RPC)
│   │   ├── todos.ts         # Todo manager server functions (CRUD)
│   │   └── system.ts        # Server diagnostics & statistics
│   ├── components/          # Reusable React components
│   │   ├── Header.tsx       # Navigation bar & theme switcher
│   │   ├── Footer.tsx       # Footer layout
│   │   └── ThemeToggle.tsx  # Dark / light theme controller
│   ├── types.ts             # Shared type definitions across client & server
│   ├── router.tsx           # Router configuration
│   └── styles.css           # Tailwind v4 styles & theme variables
├── vite.config.ts           # Unified Vite + TanStack Start + Nitro configuration
├── package.json
└── tsconfig.json
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Generate Route Tree
```bash
npm run generate-routes
```

### 4. Production Build (Frontend + Backend Bundled in One)
```bash
npm run build
```
This generates:
- `.output/public`: Client static bundles & hydration code
- `.output/server`: Standalone full-stack Node.js / Nitro SSR server

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📦 Bundled Deployment

To run the unified server in production:
```bash
node .output/server/index.mjs
```

---

## 🛠️ Built With

- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [React 19](https://react.dev)
- [Nitro Server Engine](https://nitro.unjs.io)
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
