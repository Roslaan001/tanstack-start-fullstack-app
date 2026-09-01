export type Todo = {
  id: string
  title: string
  category: 'frontend' | 'backend' | 'fullstack'
  completed: boolean
  createdAt: string
}

export type SystemStats = {
  nodeVersion: string
  platform: string
  arch: string
  uptimeSeconds: number
  memoryUsageMB: number
  serverTimestamp: string
  bundleArchitecture: string
}
