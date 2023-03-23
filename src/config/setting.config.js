const setting = {
  // 开发以及部署时的URL
  publicPath: '/',
  // 生产环境构建文件的目录名
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: '国卫后台系统模板',
  //开发环境端口号
  devPort: '8888',
  //是否显示页面底部自定义版权信息
  footerCopyright: false,
  //是否显示顶部进度条
  progressBar: true,
  // 路由模式，可选值为 history 或 hash
  routerMode: 'history',
  //不经过token校验的路由
  whiteList: ['/login', '/auth-redirect', '/bind', '/register', '/indexControl', '/indexControlDemo'],
  //加载时显示文字
  loadingText: '正在处理中...',
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 6000,
  //token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  //是否开启登录RSA加密
  loginRSA: false,
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
};
module.exports = setting;
