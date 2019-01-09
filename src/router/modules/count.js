/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const countRouter = {
    path: '/count',
    component: Layout,
    redirect: '/count/channel',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '数据统计',
      icon: 'chart',
      roles: ['1'] // you can set roles in root nav
    },
    children: [
     {
        path: 'channel',
        component: () => import('@/views/count/channel'),
        name: '渠道来源统计',
        meta: {
          title: '渠道来源统计',
          roles: ['1'] // or you can only set roles in sub nav
        }
     },
     {
        path: 'projectH5',
        component: () => import('@/views/count/projectH5'),
        name: '项目统计-H5',
        meta: {
          title: '项目统计-H5',
          roles: ['1'] // or you can only set roles in sub nav
        }
     },
      {
        path: 'screenshot',
        component: () => import('@/views/count/screenshot'),
        name: '截图统计',
        meta: {
          title: '截图统计',
          roles: ['1'] // or you can only set roles in sub nav
        }
     },
    ]
}

export default countRouter
