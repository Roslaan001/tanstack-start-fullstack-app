import { createServerFn } from '@tanstack/react-start'
import type { SystemStats } from '../types'

export const getServerStats = createServerFn({ method: 'GET' }).handler(async (): Promise<SystemStats> => {
  return {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    uptimeSeconds: Math.floor(process.uptime()),
    memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    serverTimestamp: new Date().toISOString(),
    bundleArchitecture: 'Unified Client + Nitro Server Bundle (TanStack Start)',
  }
})
