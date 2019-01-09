/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const projectRouter = {
    path: '/project',
    component: Layout,
    redirect: '/project/hotpro',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '项目管理',
      icon: 'tab',
      roles: ['1'] // you can set roles in root nav
    },
    children: [
     {
        path: 'hotpro',
        component: () => import('@/views/project/hotpro'),
        name: '热门产品',
        meta: {
          title: '热门产品',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
     {
        path: 'addHot',
        name: '热门产品添加',
        component: () => import('@/views/project/addHot'),
        hidden: true,
        meta: {
          title: '热门产品添加',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'cpro',
        component: () => import('@/views/project/cpro'),
        name: 'C位产品',
        meta: {
          title: 'C位产品',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'addCpro',
        name: 'C位产品添加',
        component: () => import('@/views/project/addCpro'),
        hidden: true,
        meta: {
          title: 'C位产品添加',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
    ]
}

export default projectRouter
