const cookieparser = process.server ? require('cookieparser') : undefined
// nuxt.js 会自动加载到容器中, 这里只需要导出配置
// 在服务端渲染期间运行都是同一个实例,为了防止数据冲突,state 必须为函数,返回数据对象
export const state = () => {
  return {
    // 当前登录状态
    user: null,
  }
}
export const mutations = {
  setUser(state, data) {
    state.user = data
  },
}
export const actions = {
  // 仅在服务端渲染期间自动调用的特殊 action, 用于初始化容器数据,传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  },
}
