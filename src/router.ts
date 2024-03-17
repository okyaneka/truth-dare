import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
// @ts-ignore
import { setupLayouts } from 'virtual:generated-layouts'
import middlewares from './middlewares'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  for (let index = 0; index < middlewares.length; index++) {
    const guard = middlewares[index]
    const path = await guard(to, from)
    if (typeof path == 'string') return next(path)
  }
  return next()
})

export default router
