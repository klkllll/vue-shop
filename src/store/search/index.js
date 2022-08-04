import { reqSearchList } from "@/api"

const state = {
    searchList: {}
}
const mutations = {
    SEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 第二个参数至少是一个空对象，不然会请求失败
    async getSearchList(context, params = {}) {
        let searchList = await reqSearchList(params)
        if (searchList.code == 200) {
            context.commit("SEARCHLIST", searchList.data)
        }
    }
}
const getters = {
    // state:当前仓库的state，并不是大仓库里的
    attrsList(state) {
        return state.searchList.attrsList
    },
    goodsList(state) {
        return state.searchList.goodsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },

}

export default { state, mutations, actions, getters }