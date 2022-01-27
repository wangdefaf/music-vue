import {request} from "../requrst";

// 用户详情
export function getUserDet(uid, cookie) {
    return request({
        url: '/user/detail',
        params: {
            uid,
            cookie
        }
    })
}

//账户信息
export function getUesrAccount(cookie) {
    return request({
        url: 'user/account',
        withCredentials: true,
        cookie
    })
}

// 用户信息
export function getUserInfo(cookie) {
    return request({
        url: '/user/subcount',
        params: {
            cookie
        }
    })
}

//用户歌单
export function getUserPlaylist(uid, cookie) {
    return request({
        url: '/user/playlist',
        params: {
            uid, cookie
        }
    })
}

//用户MV列表
export function getMvSublist(cookie) {
    return request({
        url: '/mv/sublist',
        params: {
            cookie
        }
    })
}

//用户专辑列表
export function getAlbumList(cookie) {
    return request({
        url: '/digitalAlbum/purchased',
        params: {
            cookie
        }
    })
}

//获取用户关注列表
export function getUserFollows(uid, cookie) {
    return request({
        url: '/user/follows',
        params: {
            uid, cookie
        }
    })
}

//获取用户歌手收藏列表
export function getArtistSublist(cookie) {
    return request({
        url: '/artist/sublist',
        params: {
            cookie
        }
    })
}

//用户粉丝列表
export function getUserFolloweds(uid, cookie) {
    return request({
        url: '/user/followeds',
        params: {
            uid,
            cookie,
            limit: 999
        }
    })
}

//取消用户关注
export function getFollow(id, t, cookie) {
    return request({
        url: '/follow',
        params: {
            id,
            t,
            cookie
        }
    })
}