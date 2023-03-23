// patientManagement
import Layout from "@/layout";

const PatientManagement = [{
  path: '/patientManagement',
  component: Layout,
  redirect: '/patientManagement',
  name: 'PatientManagement',
  meta: {
    title: '患者管理',
    icon: 'icon-zhikongfenxi',
  },
  children: [


    {
      path: '/patientManagement',
      component: Layout,

      path: '/patientManagement',
      name: 'PatientManagement',
      component: () => import('@/views/patientManagement/patientManagement/index'),
      meta: { title: '结核病患者管理', affix: true }
    },



    {
      path: '/closurePatientManagement',
      component: Layout,
      path: '/closurePatientManagement',
      name: 'ClosurePatientManagement',
      component: () => import('@/views/patientManagement/closurePatientManagement/index'),
      meta: { title: '结案患者管理' }

    },
    {
      path: '/closurePatientManagement',
      component: Layout,
      path: '/unassignedrecord',
      name: 'Unassignedrecord',
      component: () => import('@/views/patientManagement/unassignedrecord/index'),
      meta: { title: '患者病案公共池管理' }

    },
    // {
    //   path: '/closecontactmanagement',
    //   component: Layout,
    //   path: '/closecontactmanagement',
    //   name: 'Closecontactmanagement',
    //   component: () => import('@/views/patientManagement/closecontactmanagement/index'),
    //   meta: { title: '密切接触者管理' }

    // }


  ]
}]
export default PatientManagement