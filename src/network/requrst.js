import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://8.141.157.64:3000',
        timeout: 5000,
        withCredentials: true
    })

    instance.interceptors.request.use(config => {

        return config
    }, err => {
        console.log(err, '请求失败拦截');
    })

    instance.interceptors.response.use(res => {

        return res.data
    }, err => {

    })
    return instance(config)
}