import type { RouteLocationNormalized } from 'vue-router'

export interface Middleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized):
    | void
    | string
    | Promise<string | void>
}

export default [sampleMiddleware] as Middleware[]
