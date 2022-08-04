import axios from 'axios';

import nprogress from 'nprogress';
import "nprogress/nprogress.css";

import store from '@/store'

// 用axios的create方法来创建axios实例对象。
// 后面可以用这个requests（axios）里的get和post方法
let requests = axios.create({
    baseURL: '/api',
    timeout: 6000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    let uuid = store.state.detail.uuid_token
    if (uuid) {
        // userTempId：是和后端一起商量之后定下来的变量名。
        config.headers.userTempId = uuid
    }
    let token = store.state.user.token
    if (token){
        config.headers.token = token
    }

    // config:配置对象， 这里面有header请求头
    nprogress.start()
    return config;
})

// 响应拦截器
requests.interceptors.response.use((resolve) => {
    nprogress.done()
    return resolve.data;
}, (reject) => {
    nprogress.done()
    return Promise.reject(new Error('failure'))
})

export default requests;