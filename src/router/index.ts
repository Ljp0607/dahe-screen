import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: "login" }
    },
    //登录页面
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    //非全屏页面
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      children: [
        {
          path: 'list',
          name: 'list',
          component: () => import('@/views/ECharts/List/index.vue')
        }, {
          path: 'Download',
          name: 'Download',
          component: () => import('@/views/ECharts/Download/index.vue')
        }, {
          path: 'Reporter',
          name: 'Reporter',
          component: () => import('@/views/ECharts/Reporter/index.vue')
        }, {
          path: 'Information',
          name: 'Information',
          component: () => import('@/views/ECharts/Information/index.vue')
        }, {
          path: 'Picker',
          name: 'Picker',
          component: () => import('@/views/ECharts/Picker/index.vue')
        }
      ]
    },
    //全屏页面
    {
      path: '/fullScreen',
      name: 'fullScreen',
      component: () => import('@/views/ECharts/index.vue'),

      children: [
        {
          path: 'list',
          name: 'listView',
          component: () => import('@/views/ECharts/List/index.vue')
        }, {
          path: 'Download',
          name: 'DownloadView',
          component: () => import('@/views/ECharts/Download/index.vue')
        }, {
          path: 'Reporter',
          name: 'ReporterView',
          component: () => import('@/views/ECharts/Reporter/index.vue')
        }, {
          path: 'Information',
          name: 'InformationView',
          component: () => import('@/views/ECharts/Information/index.vue')
        }, {
          path: 'Picker',
          name: 'PickerView',
          component: () => import('@/views/ECharts/Picker/index.vue')
        },
        {
          path: '/Scrollbar',
          name: 'ScrollbarView',
          component: () => import('../components/Scrollbar.vue')
        },
      ]
    },






    // //404页面
    // {
    //   path: '/404',
    //   name: '404',
    //   component: () => import('../components/ErrorMessage/404.vue')
    // },
    // {
    //   // 找不到路由重定向到404页面
    //   path: "/:pathMatch(.*)",
    //   redirect: { name: "404" }
    // }
  ]
})

export default router
