/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const versionRouter = {
    path: '/version',
    component: Layout,
    redirect: '/version/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '版本管理',
      icon: 'list',
      roles: ['1'] // you can set roles in root nav
    },
    children: [
     {
        path: 'index',
        name: '版本配置',
        component: () => import('@/views/version/index'),
        meta: {
          title: '版本配置',
          roles: ['1'] // or you can only set roles in sub nav
        }
     },
    ]
}

export default versionRouter