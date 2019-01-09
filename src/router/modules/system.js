/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const systemRouter = {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '系统管理',
      icon: 'nested',
      roles: ['1'] // you can set roles in root nav
    },
    children: [
     {
        path: 'user',
        name: '账号管理',
        component: () => import('@/views/system/user'),
        meta: {
          title: '账号管理',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'addUser',
        component: () => import('@/views/system/addUser'),
        hidden: true,
        name: '添加账号',
        meta: {
          title: '添加账号',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/system/role'),
        meta: {
          title: '角色管理',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'addRole',
        component: () => import('@/views/system/addRole'),
        hidden: true,
        name: '添加角色',
        meta: {
          title: '添加角色',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
    ]
}

export default systemRouter