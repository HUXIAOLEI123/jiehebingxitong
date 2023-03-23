import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/living','/indexControl','/indexControlDemo','/redirect','/signOut'] //白名单重定向

router.beforeEach(async(to, from, next) => {
  
  //开始进度条
  NProgress.start()

  //设置页面标题
  document.title = getPageTitle(to.meta.title)

  //确定用户是否已登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      //如果已登录，请重定向到主页
      next({ path: '/' })
      NProgress.done() 
    } else {
      //确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面将重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
      // next()
    }
  }
})

router.afterEach(() => {
  //完成进度条
  NProgress.done()
})
