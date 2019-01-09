/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const businessRouter = {
    path: '/business',
    component: Layout,
    redirect: '/business/user',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '业务管理',
      icon: 'documentation',
      roles: ['1'] // you can set roles in root nav
    },
    children: [
     {
        path: 'user',
        component: () => import('@/views/business/user'),
        name: '用户管理',
        meta: {
          title: '用户管理',
          roles: ['1'] // or you can only set roles in sub nav
        }
     },
     {
        path: 'order',
        component: () => import('@/views/business/order'),
        name: '订单管理',
        meta: {
          title: '订单管理',
          roles: ['1'] // or you can only set roles in sub nav
        }
     },
    ]
}

export default businessRouter
