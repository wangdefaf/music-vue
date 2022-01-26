import {request} from "../requrst";

//热搜列表
export function getSearchHot() {
    return request({
        url: 'search/hot/detail',
    })
}

//搜索建议
export function getSearchSug(keywords) {
    return request({
        url: 'search/suggest',
        params: {
            keywords
        }
    })
}

//搜索接口
export function getSearch(keywords, type, limit) {
    return request({
        url: '/cloudsearch',
        params: {
            keywords,
            type,
            limit
        }
    })
}