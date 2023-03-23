import Layout from "@/layout";
import openBlank from "@/layout/openBlank";
const FileManagement = [{
  path: '/fileManagement',
  component: Layout,
  redirect: '/fileManagement',
  name: 'fileManagement',
  meta: {
    title: '档案管理',
    icon: 'icon-zhikongfenxi',
  },
  children: [
    {
      path: '/patientRecords',
      component: Layout,
      component: () => import('@/views/fileManagement/patientRecords/index'),
      meta: {
        title: '结核病患者档案',
        // icon: 'icon-zhikongfenxi',
      }
  },
  
  {
      path: '/transferApplicationManagement',
      component: Layout,
      // children: [{
          path: '/transferApplicationManagement',
          name: '档案转移申请管理',
      component: () => import('@/views/fileManagement/transferApplicationManagement/index'),
          meta:{ title:'档案转移申请管理'
          // ,icon: 'icon-zhikongfenxi',
        }
      // }]
  },
  
  {
      path: '/transferAuditManagement',
      component: Layout,
      // children: [{
          path: '/transferAuditManagement',
          name: 'TransferAuditManagement',
          component: () => import('@/views/fileManagement/transferAuditManagement/index'),
          meta: { title: '档案转移审核档案'
          // ,icon: 'icon-zhikongfenxi', 
        }
      // }]
  },
  ]
}]
export default FileManagement