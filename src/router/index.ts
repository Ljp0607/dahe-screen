import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: "login" }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/ECharts/List/index.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('../components/video.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../components/ErrorMessage/404.vue')
    },
    {
      // 找不到路由重定向到404页面
      path: "/:pathMatch(.*)",
      redirect: { name: "404" }
    }
  ]
})

export default router
