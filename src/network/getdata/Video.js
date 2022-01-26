import {request} from "../requrst";

// 视频详情
export function getVideoDet(id) {
    return request({
        url: '/video/detail',
        params: {
            id
        }
    })
}

//视频播放URL
export function getVideoUrl(id) {
    return request({
        url: '/video/url',
        params: {
            id,
        }
    })
}

//相关视频列表
export function getVideoRelated(id) {
    return request({
        url: '/related/allvideo',
        params: {
            id
        }
    })
}

//视频点赞评论数据
export function getVideoDetInfo(vid) {
    return request({
        url: '/video/detail/info',
        params: {
            vid
        }
    })
}