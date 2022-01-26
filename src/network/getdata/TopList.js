import {request} from "../requrst";

// 排行榜Id
export function topListId() {
    return request({url: '/toplist',})
}

// 排行榜详情
export function topList(id) {
    return request({
        url: '/playlist/detail',
        params: {
            id
        }
    })
}