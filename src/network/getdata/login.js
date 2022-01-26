import {request} from "../requrst";

// 登录状态
export function getLoginStu() {
    return request({
        url: '/login/status',
    })
}

//手机号登录
export function getLoginPhone(phone, password) {
    return request({
        url: '/login/cellphone',
        params: {
            phone,
            password,
            't': new Date().getTime()
        },
    })
}

///退出登录
export function getLogOut() {
    return request({
        url: '/logout',
    })
}

//刷新登录状态
export function getLoginRef() {
    return request({
        url: '/login/refresh',
    })
}

//生成二维码Key
export function getQrKey() {
    return request({
        url: '/login/qr/key',
        params: {
            't': new Date().getTime()
        }
    })
}

//生成二维码Qrunikey
export function getQrCreate(key) {
    return request({
        url: '/login/qr/create',
        params: {
            key,
            qrimg: key,
            't': new Date().getTime()
        }
    })
}

//轮询二维码登录状态/login/qr/check
export function getQrCheck(key) {
    return request({
        url: '/login/qr/check',
        params: {
            key,
            't': new Date().getTime()
        }
    })
}
