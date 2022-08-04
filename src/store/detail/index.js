import { reqDetailList, reqCartList } from "@/api"
import { getUUID } from "@/utils/uuid_token"
const state = {
    detailList: {},
    // 游客临时身份
    uuid_token: getUUID()
}
const mutations = {
    DETAILLIST(state, detailList) {
        state.detailList = detailList
    }
}
const actions = {
    async getDetailList(context, skuId) {
        let result = await reqDetailList(skuId)
        console.log("actions:", result);
        if (result.code == 200) {
            context.commit('DETAILLIST', result.data)
        }
    },
    async addOrUpdateCartList(context, { skuId, skuNum }) {
        let result = await reqCartList(skuId, skuNum)
        if (result.code == 200) {
            // async 函数返回的是一个promise
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    }
}
const getters = {
    categoryView(state) {
        // 因为detailList的初始状态是空对象的，空对象的属性值是undefined
        return state.detailList.categoryView || {}
    },
    // 商品信息
    skuInfo(state) {
        return state.detailList.skuInfo || {}
    },
    // 售卖属性的简化
    spuSaleAttrList(state) {
        return state.detailList.spuSaleAttrList || []
    }
}

export default { state, mutations, actions, getters }