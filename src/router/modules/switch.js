/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const operateRouter = {
    path: '/operate',
    component: Layout,
    redirect: '/operate/question',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '运营管理',
      icon: 'component',
      roles: ['1'] // you can set roles in root nav
    },
    children: [
     {
        path: 'editQuestion',
        name: '新增常见问题类型',
        component: () => import('@/views/operate/editQuestion'),
        hidden: true,
        meta: {
          title: '新增常见问题类型',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'question',
        component: () => import('@/views/operate/question'),
        name: '常见问题',
        meta: {
          title: '常见问题',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'addQuestion',
        name: '编辑常见问题',
        component: () => import('@/views/operate/addQuestion'),
        hidden: true,
        meta: {
          title: '编辑常见问题',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'questionType',
        name: '常见问题类型配置',
        component: () => import('@/views/operate/questionType'),
        meta: {
          title: '常见问题类型配置',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
       {
        path: 'adpos',
        component: () => import('@/views/operate/adpos'),
        name: '广告位置配置',
        meta: {
          title: '广告位置配置'
        }
      },
       {
        path: 'addPos',
        name: '编辑广告位置',
        component: () => import('@/views/operate/addPos'),
        hidden: true,
        meta: {
          title: '编辑广告位置',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
       {
        path: 'adver',
        component: () => import('@/views/operate/adver'),
        name: '广告管理',
        meta: {
          title: '广告管理'
        }
      },
       {
        path: 'addAdver',
        name: '广告编辑',
        component: () => import('@/views/operate/addAdver'),
        hidden: true,
        meta: {
          title: '广告编辑',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'notice',
        component: () => import('@/views/operate/notice'),
        name: '公告管理',
        meta: {
          title: '公告管理'
        }
      },
      {
        path: 'editNotice',
        component: () => import('@/views/operate/editNotice'),
        name: '公告编辑',
        hidden: true,
        meta: {
          title: '公告编辑'
        }
      },
      {
        path: 'info',
        component: () => import('@/views/operate/info'),
        name: '消息管理',
        meta: {
          title: '消息管理'
        }
      },
      {
        path: 'editInfo',
        component: () => import('@/views/operate/editInfo'),
        hidden: true,
        name: '消息编辑',
        meta: {
          title: '消息编辑'
        }
      },
    ]
}

export default operateRouter
