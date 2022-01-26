import {request} from "../requrst";

// 精品歌单推荐
export function getNewSong(tag, limit, offset) {
    return request({
        url: '/album/new',
        params: {
            area: tag,
            limit,
            offset
        }
    })
}

// 热搜列表
export function getSearchHot() {
    return request({
        url: '/search/hot/detail'
    })
}

//banner图
export function getBanner() {
    return request({url: '/banner?type=0'})
}