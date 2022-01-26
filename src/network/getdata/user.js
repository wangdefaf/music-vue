import {request} from "../requrst";

// 用户详情
export function getUserDet(uid) {
    return request({
        url: '/user/detail',
        params: {
            uid
        }
    })
}

//账户信息
export function getUesrAccount() {
    return request({
        url: 'user/account',
        withCredentials: true,
    })
}

// 用户信息
export function getUserInfo() {
    return request({
        url: '/user/subcount',
    })
}

//用户关注列表
export function getUserFoll(uid) {
    return request({
        url: '/user/follows',
        params: {
            uid,
            limit: 999
        }
    })
}

//用户粉丝列表
export function getUserFolloweds(uid) {
    return request({
        url: '/user/followeds',
        params: {
            uid,
            limit: 999
        }
    })
}

//用户歌单
export function getUserPlaylist(uid) {
    return request({
        url: '/user/playlist',
        params: {
            uid
        }
    })
}

//用户MV列表
export function getMvSublist() {
    return request({
        url: '/mv/sublist'
    })
}

//用户专辑列表
export function getAlbumList() {
    return request({
        url: '/digitalAlbum/purchased'
    })
}

//获取用户关注列表
export function getUserFollows(uid) {
    return request({
        url: '/user/follows',
        params: {
            uid
        }
    })
}

//获取用户歌手收藏列表
export function getArtistSublist() {
    return request({
        url: '/artist/sublist'
    })
}

//取消用户关注
export function getFollow(id, t) {
    return request({
        url: '/follow',
        params: {
            id,
            t
        }
    })
}