import { reqCateporyList, reqBannerList, reqFloorList } from "@/api"
const state = {
    categorylist: [],
    bannerlist:[],
    floorlist:[]
}
const mutations = {
    CATEGORYLIST(state, categorylist) {
        state.categorylist = categorylist
    },
    BANNERLIST(state, bannerlist) {
        state.bannerlist = bannerlist
    },
    FLOORLIST(state, floorlist) {
        state.floorlist = floorlist
    }
}
const actions = {
    async categorylist(context) {
        // 得到三级联动目录的数据
        let categorylist = await reqCateporyList();
        context.commit('CATEGORYLIST', categorylist)
    },
    async getbannerlist(context) {
        let bannerlist = await reqBannerList();
        // 当时模拟的数据是：{code；data}
        context.commit('BANNERLIST', bannerlist.data)
    },
    async getFloorList(context) {
        let floorlist = await reqFloorList();
        if (floorlist.code == 200){
            context.commit('FLOORLIST', floorlist.data)
        }
    }
}
const getters = {}

export default { state, mutations, actions, getters }