import axios from 'axios'
// 创建请求对象
export const request = axios.create({
  // baseURL: 'https://api.realworld.io',
  baseURL: 'http://realworld.api.fed.lagounews.com',
})
// 通过插件机制获取上下文对象(query,params,req,res,app,store...)
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 请求拦截

  request.interceptors.request.use(
    function (config) {
      const { user } = store.state
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`
      }

      return config
    },
    function (error) {
      // 处理发出前失败的请求
      return Promise.reject(error)
    }
  )

  // 响应拦截
}
