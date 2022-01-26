import {request} from "../requrst";

// 精品歌单推荐
export function getPlayList(tag, lastTime) {
    return request({
        url: '/top/playlist/highquality',
        params: {
            cat: tag,
            limit: 20,
            before: lastTime
        }
    })
}

//歌单标签
export function getPlayTag() {
    return request({url: '/playlist/highquality/tags',})
}

//歌单详情
export function getPlayListDet(id) {
    return request({
        url: '/playlist/detail',
        params: {
            id
        }
    })
}

//相似歌单
export function getRelatedPlaylist(id) {
    return request({
        url: '/related/playlist',
        params: {
            id
        }
    })
}