module.exports = {
  router: {
    // 1. 纯单页应用处理页面访问权限可用路由拦截处理, 但同构渲染无法拦截服务端渲染,可使用路由中间件
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除
      routes.splice(0)
      routes.push(
        ...[
          {
            path: '/',
            component: resolve(__dirname, 'layouts/'),
            children: [
              {
                path: '/error',
                name: 'error',
                component: resolve(__dirname, 'pages/error'),
              },
              {
                path: '',
                name: 'home',
                component: resolve(__dirname, 'pages/home/'),
              },
              {
                path: '/login',
                name: 'login',
                component: resolve(__dirname, 'pages/login/'),
              },
              {
                path: '/register',
                name: 'register',
                component: resolve(__dirname, 'pages/login/'),
              },
              {
                path: '/profile/:username',
                name: 'profile',
                component: resolve(__dirname, 'pages/profile'),
              },
              {
                path: '/settings',
                name: 'settings',
                component: resolve(__dirname, 'pages/settings/'),
              },
              {
                path: '/editor',
                name: 'editor',
                component: resolve(__dirname, 'pages/editor/'),
              },
              {
                path: '/article/:slug',
                name: 'article',
                component: resolve(__dirname, 'pages/article/'),
              },
            ],
          },
        ]
      )
    },
  },
  server: {
    // host:'localhost', // 只能本机访问
    host: '0.0.0.0', // 监听所有网卡地址, 生产环境下可通过外网地址访问, 本地环境可通过局域网访问
    port: 3000,
  },
  // 注册插件
  plugins: ['~/plugins/request.js', '~/plugins/dayjs.js'],
}
