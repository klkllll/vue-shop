import { getCode, getUserRegister, reqUserLogin, reqUserInfo, reqLoginOut } from '@/api'
import { setToken, getToken,removeToken } from '@/utils/token'

const state = {
    code: "",
    token: getToken(),
    userInfo: {}
}
const mutations = {
    CODE(state, value) {
        state.code = value
    },
    USERLOGIN(state, value) {
        state.token = value.token
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    LOGINOUT(state,value){
        state.token = removeToken()
        state.userInfo = ''
    },
}
const actions = {
    // 得到验证码
    async getCode(context, phone) {
        let result = await getCode(phone)
        if (result.code == 200) {
            context.commit('CODE', result.data)
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    // 注册用户
    async getUserRegisterx(context, user) {
        let result = await getUserRegister(user)
        console.log("result", result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    // 登录
    async userLogin(context, user) {
        let result = await reqUserLogin(user)
        console.log(result);
        if (result.code == 200) {
            context.commit('USERLOGIN', result.data)
            // 持久化存储
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    // 登录后获取用户信息
    async getUserInfo(context) {
        let result = await reqUserInfo()
        console.log("获取用户信息",result);
        if (result.code == 200) {
            context.commit('USERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    // 退出登录
    async loginOut(context) {
        let result = await reqLoginOut()
        console.log(result);
        if (result.code == 200) {
            context.commit('LOGINOUT')
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
}
const getters = {

}

export default {
    state, mutations, actions, getters
}