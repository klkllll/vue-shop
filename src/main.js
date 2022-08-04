import Vue from 'vue'
import App from './App.vue'
// 引入路由文件夹
import router from '@/router'
// 引入三级导航组件，并为全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
// 引入element-ui
import { Button,MessageBox } from 'element-ui';
Vue.use(Button)
Vue.component(MessageBox.name, MessageBox)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // loading: loadimage, 懒加载时的图片
})

// 引入统一api接口
import * as API from '@/api'

import "@/plugins/validate"
// 引入mockjs
import "@/mock/mockServe"
// 引入swiper
import "swiper/css/swiper.css"

// 测试
// import {reqCateporyList} from '@/api'
// reqCateporyList()

import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
