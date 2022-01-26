import {request} from "../requrst";

// 歌手分类列表
export function getArtist(limit, offset, initial, type, area,) {
    return request({
        url: '/artist/list',
        params: {
            limit,
            offset,
            initial,
            type,
            area
        }
    })
}

//歌手热门歌曲
export function getHotSong(id) {
    return request({
        url: '/artist/top/song',
        params: {id}
    })
}

//歌手详情
export function getArtistDet(id) {
    return request({
        url: '/artist/detail',
        params: {id}
    })
}

//歌手专辑
export function getArtistAlbum(id, limit, offset) {
    return request({
        url: '/artist/album',
        params: {
            id,
            limit,
            offset
        }
    })
}

//歌手MV
export function getArtistMV(id) {
    return request({
        url: '/artist/mv',
        params: {
            id
        }
    })
}

export function getArtistSimi(id) {
    return request({
        url: '/simi/artist',
        params: {
            id
        }
    })
}