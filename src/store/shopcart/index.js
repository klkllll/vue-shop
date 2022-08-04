import { reqCartDataList, deleteCartList, changeCartList } from '@/api'

const state = {
    cartDateList: []
}
const mutations = {
    CARTDATALIST(state, cartDateList) {
        state.cartDateList = cartDateList
    },
}
const actions = {
    // 获取购物车列表数据
    async getCartDataList(context) {
        let result = await reqCartDataList()
        console.log(result);
        context.commit('CARTDATALIST', result.data)
    },
    // 删除购物车的数据
    async deleteCartList(context, skuId) {
        let result = await deleteCartList(skuId)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    // 切换购物车产品选中的状态
    async changeCartList(context, { skuID, isChecked }) {
        let result = await changeCartList(skuID, isChecked)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    // 删除所有所选的商品
    deleteAllCartList(context) {
        let PromiseAll = []
        context.getters.cartList.cartInfoList.forEach(element => {
            let promise = element.isChecked == '1' ? context.dispatch('deleteCartList', element.skuId) : ''
            PromiseAll.push(promise)
        });

        // 只要有一个错误，就会出现错误提示
        return Promise.all(PromiseAll)
    },
    // 改变购物车全选的状态
    changeAllCartIsChecked(context, isChecked) {
        let PromiseAll = []
        context.getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == isChecked ? '' : context.dispatch('changeCartList', { skuID: item.skuId, isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }

}
const getters = {

    cartList(state) {
        return state.cartDateList[0] || {}
    },
}

export default {
    state, mutations, actions, getters
}