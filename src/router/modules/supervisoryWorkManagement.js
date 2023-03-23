import Layout from "@/layout";

// supervisoryWorkManagement
const SupervisoryWorkManagement = [{
  path: '/supervisoryWorkManagement',
  component: Layout,
  redirect: '/supervisoryWorkManagement',
  name: 'supervisoryWorkManagement',
  meta: {
    title: '督导工作管理',
    icon: 'icon-zhikongfenxi',
  },
  children: [
    {
      path: '/pulmonaryMedicine',
      component: Layout,

      path: '/pulmonaryMedicine',
      name: 'PulmonaryMedicine',
      component: () => import('@/views/supervisoryWorkManagement/pulmonaryMedicine/index'),
      meta: { title: '服药管理' }

    },

    {
      path: '/follow-upManagement',
      component: Layout,
      path: '/follow-upManagement',
      name: '随访管理',
      component: () => import('@/views/supervisoryWorkManagement/follow-upManagement/index'),
      meta: { title: '随访管理' }

    },
    {
      path: '/checkManagement',
      component: Layout,

      path: '/checkManagement',
      name: '检查管理',
      component: () => import('@/views/supervisoryWorkManagement/checkManagement/index'),
      meta: { title: '检查管理' }

    },

    {
      path: '/interruptTreatmentManagement',
      component: Layout,

      path: '/interruptTreatmentManagement',
      name: '中断服药管理',
      component: () => import('@/views/supervisoryWorkManagement/interruptTreatmentManagement/index'),
      meta: { title: '中断服药管理' }

    },

    {
      path: '/adverseReactionManagement',
      component: Layout,

      path: '/adverseReactionManagement',
      name: 'AdverseReactionManagement',
      component: () => import('@/views/supervisoryWorkManagement/adverseReactionManagement/index'),
      meta: { title: '不良反应管理' }

    },
  ]

}]
export default SupervisoryWorkManagement