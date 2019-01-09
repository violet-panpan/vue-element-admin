/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const operateRouter = {
    path: '/operate',
    component: Layout,
    redirect: '/operate/questionType',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '运营管理',
      icon: 'component',
      roles: ['1'] // you can set roles in root nav
    },
    children: [
     {
        path: 'questionType',
        name: '常见问题',
        component: () => import('@/views/operate/questionType'),
        meta: {
          title: '常见问题',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
     {
        path: 'editQuestion',
        name: '新增问题类型',
        component: () => import('@/views/operate/editQuestion'),
        hidden: true,
        meta: {
          title: '新增问题类型',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'question',
        component: () => import('@/views/operate/question'),
        name: '问题详情',
        hidden: true,
        meta: {
          title: '问题详情',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'addQuestion',
        name: '新增问题详情',
        component: () => import('@/views/operate/addQuestion'),
        hidden: true,
        meta: {
          title: '新增问题详情',
          roles: ['1'] // or you can only set roles in sub nav
        }
      },
       {
        path: 'adpos',
        component: () => import('@/views/operate/adpos'),
        name: '广告管理',
        meta: {
          title: '广告管理'
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
        hidden: true,
        name: '广告详情',
        meta: {
          title: '广告详情'
        }
      },
       {
        path: 'addAdver',
        name: '新增广告详情',
        component: () => import('@/views/operate/addAdver'),
        hidden: true,
        meta: {
          title: '新增广告详情',
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
        path: 'appList',
        component: () => import('@/views/operate/appList'),
        name: 'APP管理列表',
        meta: {
          title: 'APP管理列表'
        }
      },
      {
        path: 'addApp',
        component: () => import('@/views/operate/addApp'),
        name: '新增APP',
        hidden: true,
        meta: {
          title: '新增APP'
        }
      },
      {
        path: 'oldList',
        component: () => import('@/views/operate/oldList'),
        name: '迭代版本',
        hidden: true,
        meta: {
          title: '迭代版本'
        }
      },
      {
        path: 'addOld',
        component: () => import('@/views/operate/addOld'),
        name: '新增版本',
        hidden: true,
        meta: {
          title: '新增版本'
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
       {
        path: 'features',
        component: () => import('@/views/operate/features'),
        name: '特征配置',
        meta: {
          title: '特征配置'
        }
      },
      {
        path: 'addFeature',
        component: () => import('@/views/operate/addFeature'),
        hidden: true,
        name: '新增特征',
        meta: {
          title: '新增特征'
        }
      },
       {
        path: 'featureDetail',
        component: () => import('@/views/operate/featureDetail'),
        hidden: true,
        name: '特征详情列表',
        meta: {
          title: '特征详情列表'
        }
      },
      {
        path: 'addFeatureDetail',
        component: () => import('@/views/operate/addFeatureDetail'),
        hidden: true,
        name: '新增特征详情',
        meta: {
          title: '新增特征详情'
        }
      },
    ]
}

export default operateRouter
