import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/*布局 */
import Layout from '@/views/layout/Layout'

/* Router Modules 路由模块*/
import operateRouter from './modules/operate'
import systemRouter from './modules/system'
import businessRouter from './modules/business'
import versionRouter from './modules/version'
import projectRouter from './modules/project'
import countRouter from './modules/count'
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
 
 /** When your routing table is too long, you can split it into small modules**/
systemRouter,
versionRouter,
businessRouter,
operateRouter,
projectRouter,
countRouter

//componentsRouter,
//chartsRouter,
//nestedRouter,
//tableRouter,
//{ path: '*', redirect: '/404', hidden: true }
]
