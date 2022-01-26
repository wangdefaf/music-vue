import {request} from "../requrst";

// 歌曲详情
export function getSongDet(ids) {
    return request({
        url: '/song/detail',
        params: {
            ids
        }
    })
}

// 歌曲歌词
export function getSongLyric(id) {
    return request({
        url: '/lyric',
        params: {
            id
        }
    })
}

// 相似歌曲
export function getSimiSong(id) {
    return request({
        url: '/simi/song',
        params: {
            id
        }
    })
}

//收藏歌单
export function getPlaylistLike(op, pid, tracks) {
    return request({
        url: '/playlist/tracks',
        params: {
            op,
            pid,
            tracks
        }
    })
}

//音乐url
export function getSongUrl(id) {
    return request({
        url: '/song/url',
        params: {
            id
        }
    })
}

//喜欢音乐
export function getSongLike(id, like) {
    return request({
        url: '/like',
        params: {
            id,
            like
        }
    })
}