import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push和replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call是来重定义push方法里面的this指向
        // 此时的this是VueRouter的实例对象
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // 此时的this是VueRouter的实例对象
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 跳转后页面到顶部
        return { y: 0 }
    },
})

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userName
    // console.log("token", token);
    // 有个问题: 就是刚进入首页就有了token了。这个应该是登录再有的
    if (token) {
        // 如果跳转的是login
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            // 不是跳转login
            if (!name) {
                try {
                    await store.dispatch('getUserInfo');
                    next()
                } catch (error) {
                    // 错误，说明是token失效了。得让用户重新登录了。
                    console.log(error);
                    await store.dispatch('loginOut')
                    next('/login')
                }
            } else {
                next()
            }
        }
    } else {
        // 没登陆： 交易相关、支付相关、个人中心都不能去，其他的放行
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/paysuccess') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirct=' + toPath)
        } else {
            next()
        }

    }
})

export default router