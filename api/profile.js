import { request } from '@/plugins/request'
// 获取个人资料
export const getProfile = (username) => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`,
  })
}
// 关注用户
export const addFollow = (username) => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`,
  })
}
// 取消关注用户
export const deleteFollow = (username) => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`,
  })
}
