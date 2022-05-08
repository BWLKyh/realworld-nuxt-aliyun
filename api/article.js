import { request } from '@/plugins/request'
// 获取文章列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params,
  })
}
// 获取关注的文章列表
export const getFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    // headers: {
    //   Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzRjODc3M2QxOWFmYjNhYmI3OTg1YyIsInVzZXJuYW1lIjoibGt5aCIsImV4cCI6MTY1NzAwNDY2MywiaWF0IjoxNjUxODIwNjYzfQ.PqpyphFbNemvJqXDI9FnTb7gP_mvFLIOMiznigFCOJo`,
    // },
  })
}
// 文章详情
export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}
// 创建文章
export const addArticle = (data) => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data,
  })
}
// 更新文章
export const updateArticle = (data) => {
  const { slug, article } = data
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data: { article },
  })
}
// 删除文章
export const deleteArticle = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`,
  })
}
// 发布评论
export const addComment = (data) => {
  const { slug, comment } = data
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: { comment },
  })
}
// 获取文章评论
export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}
// 删除评论
export const deleteComment = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/:slug/comments/${slug}`,
  })
}
// 点赞
export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}
// 取消点赞
export const deleteFavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}
