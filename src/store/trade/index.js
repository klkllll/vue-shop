import { reqGetUserAddress, reqGetUserTrade } from '@/api'


const state = {
    addressInfo: [],
    tradeInfo: {}
}
const mutations = {
    ADDRESS(state, addressInfo) { 
        state.addressInfo = addressInfo
    },
    TRADE(state, tradeInfo) { 
        state.tradeInfo = tradeInfo
    },
}
const actions = {
    async getUserAddress(context) {
        let result = await reqGetUserAddress()
        console.log("ADDRESS", result);
        if (result.code == 200) {
            context.commit('ADDRESS', result.data)
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    async getUserTrade(context) {
        let result = await reqGetUserTrade()
        console.log("TRADE", result);
        if (result.code == 200) {
            context.commit('TRADE', result.data)
        } else {
            return Promise.reject(new Error('failure'))
        }
    }
}
const getters = {

}

export default {
    state, mutations, actions, getters
}