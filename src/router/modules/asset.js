import Layout from '@/layout'

const router = {
  path: '/asset',
  component: Layout,
  name: 'Asset',
  meta: {
    title: '资产管理',
    icon: 'el-icon-money',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/asset/index'),
      name: 'Asset',
      meta: { title: '资产管理', noCache: true, icon: 'el-icon-mobile', sign: 'asset' }
    }
  ]
}

export default router
