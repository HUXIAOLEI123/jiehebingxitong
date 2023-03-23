import Layout from "@/layout";
//一级菜单？？
const StandardStatistical=[
  {
    path: '/standardStatistical',
    component: Layout,
        path: '/standardStatistical',
        name: 'StandardStatistical',
        component: () => import('@/views/standardStatistical/index'),
        meta: { title: '结核病规范统计' }
},

  
]
export default StandardStatistical