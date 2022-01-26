import {request} from "../requrst";

// MV推荐
export function getMV(area, limit, type, offset) {
  return request({
    url: '/mv/all',
    params: {
      area,
      limit,
      type,
      offset
    }
  })
}

//全部MV
export function getAllMV(area, order, limit, offset) {
  return request({
    url: '/mv/all',
    params: {
      area,
      order,
      limit,
      offset
    }
  })
}

//相似MV
export function getMvSimi(mvid) {
  return request({
    url: '/simi/mv',
    params: {
      mvid
    }
  })
}

//MV详情
export function getMvDet(mvid) {
  return request({
    url: '/mv/detail',
    params: {
      mvid
    }
  })
}

//MV播放地址
export function getMvUrl(id, r) {
  return request({
    url: '/mv/url',
    params: {
      id,
      r
    }
  })
}

//MV点赞
export function getMvLike(id, t, type) {
  return request({
    url: '/resource/like',
    params: {
      id,
      t,
      type
    }
  })
}

