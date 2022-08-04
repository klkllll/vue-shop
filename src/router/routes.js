import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import paySuccess from '@/pages/PaySuccess'
import Center from "@/pages/Center"
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'


export default [
    {
        path: '/center',
        name: 'center',
        // 这是路由懒加载
        component: () => import('@/pages/Center'),
        meta: {
            show: false
        },
        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/Center/myOrder')
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/groupOrder')
            },
            {
                path: '/',
                redirect: 'myorder',

            },

        ],
        // 路由独享守卫， 可以用来控制什么时候可以跳转到哪个路由
        beforeEnter: (to, from, next) => {
            if (to.path == '/paysuccess') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            show: false
        },
        beforeEnter: (to, from, next) => {
            if (to.path == '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: () => import('@/pages/Pay'),
        meta: {
            show: false
        },
        beforeEnter: (to, from, next) => {
            if (to.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: () => import('@/pages/Trade'),
        meta: {
            show: false
        },
        beforeEnter: (to, from, next) => {
            if (to.path == '/addcartsuccess') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (to.path == '/shopCart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/shopCart',
        name: 'ShopCart',
        component: () => import('@/pages/ShopCart'),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (to.path == '/detail') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: {
            show: true
        }
    },
    // 重定向，项目启动时，访问/，然后就会定向都首页的
    {
        path: '*',
        redirect: '/home',

    },
    {
        path: '/register',
        component: Register,
        meta: {
            show: false
        }
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {
            show: false
        }
    },
    {
        // 这里的keyword要和push路由传参的对象写法里的params中的参数名相同
        // ? :加上之后params参数就是可传可不传了，就不会出现如果params不传，search就会不见了。
        path: '/search/:keyword?',
        name: "search",
        component: () => import('@/pages/Search'),
        meta: {
            show: true
        },
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        }
    },
    {
        path: '/detail/:skuId',
        component: () => import('@/pages/Detail'),
        meta: {
            show: false
        }
    },

]