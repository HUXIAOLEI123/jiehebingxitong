import Layout from '@/layout';
import openBlank from '@/layout/openBlank';
const SystemManagement = [
  {
    path: '/systemManagement',
    component: Layout,
    redirect: '/systemManagement',
    name: 'SystemManagement',
    meta: {
      title: '系统管理',
      icon: 'icon-zhikongfenxi',
    },
    children: [
      {
        path: '/treatmentplantemplates',
        component: Layout,
        name: 'treatmentplantemplates',
        component: () => import('@/views/systemManagement/treatmentplantemplates/treatmentplantemplates'),
        meta: { title: '治疗方案管理' },
      },
      {
        path: '/organizationManagement',
        component: Layout,
        path: '/organizationManagement',
        name: 'OrganizationManagement',
        component: () => import('@/views/systemManagement/organizationManagement/index'),
        meta: { title: '机构管理' },
      },
      {
        path: '/userManagement',
        component: Layout,
        path: '/userManagement',
        name: 'UserManagement',
        component: () => import('@/views/systemManagement/userManagement/index'),
        meta: { title: '用户管理' },
      },
      {
        path: '/roleManagement',
        component: Layout,
        path: '/roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/systemManagement/roleManagement/index'),
        meta: { title: '角色管理' },
      },
      {
        path: '/dictionaryManagement',
        component: Layout,
        path: '/dictionaryManagement',
        name: 'DictionaryManagement',
        component: () => import('@/views/systemManagement/dictionaryManagement/index'),
        meta: { title: '字典管理' },
      },
      {
        path: '/announcementManagement',
        component: Layout,
        path: '/announcementManagement',
        name: 'AnnouncementManagement',
        component: () => import('@/views/systemManagement/announcementManagement/index'),
        meta: { title: '公告管理' },
      },
      {
        path: '/healthPushManagement',
        component: Layout,
        path: '/healthPushManagement',
        name: 'HealthPushManagement',
        component: () => import('@/views/systemManagement/healthPushManagement/index'),
        meta: { title: '健康宣教推送管理' },
      },
    ],
  },
];
export default SystemManagement;
