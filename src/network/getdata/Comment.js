// 精品歌单推荐
import {request} from "../requrst";

//获取评论
export function getPlayListComment(id, pageNo, type, sortType, pageSize) {
    return request({
        url: '/comment/new',
        params: {
            id,//id
            pageNo,//分页参数
            type,//类型
            sortType,//排序类型
            pageSize//返回数据数量
        }
    })
}

// 评论回复
export function getReplyComment(id, parentCommentId, type, limit, time, cookie) {
    return request({
        url: '/comment/floor',
        params: {
            id, parentCommentId, type, limit, time, cookie
        }
    })
}

//发表评论
export function getIssueComment(id, content, t, type, cid, cookie) {
    return request({
        url: '/comment',
        params: {
            id, cid, content, t, type, cookie
        }
    })
}

// 评论点赞
export function getPlayListCommentLike(id, cid, t, type, cookie) {
    return request({
        url: '/comment/like',
        params: {
            id, cid, t, type, cookie
        }
    })
}