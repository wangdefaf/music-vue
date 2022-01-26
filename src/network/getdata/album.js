// 专辑获取
import {request} from "../requrst";

//获取语种数字专辑
export function getAlbumList(tag, limit, offset) {
    return request({
        url: '/album/list/style',
        params: {
            area: tag,
            limit,
            offset
        }
    })
}

//获取数字专辑详情
export function getAlbumDet(id) {
    return request({
        url: '/album/detail',
        params: {
            id
        }
    })
}

//获取专辑详情
export function getAlbum(id) {
    return request({
        url: '/album',
        params: {
            id
        }
    })
}

//获取歌手其他专辑
export function getArtistAlbum(id, limit) {
    return request({
        url: '/artist/album',
        params: {
            id,
            limit
        }
    })
}


