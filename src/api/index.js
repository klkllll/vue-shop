import request from '@/api/request'
import mockrequest from '@/api/mockAjax'

// TypeNav 三级联动目录的请求
export const reqCateporyList = () => {
    return request({ url: '/product/getBaseCategoryList', method: 'get' })
}
// mock数据
// banner
export const reqBannerList = () => {
    return mockrequest({ url: '/banner', method: 'get' })
}
// floor
export const reqFloorList = () => {
    return mockrequest({ url: '/floor', method: 'get' })
}

// 获取search 数据
export const reqSearchList = (params) => {
    return request({ url: '/list', method: 'post', data: params })
}

// 获取detail数据
export const reqDetailList = (skuId) => {
    return request({ url: `/item/${skuId}`, method: 'get' })
}
// 添加到购物车，/api/cart/addToCart/{ skuId }/{ skuNum }，  post
// 因为返回的数据为空，也只需要一个code来确定是否添加成功，所以这里不用vuex的
export const reqCartList = (skuId, skuNum) => {
    return request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}

// 得到购物车列表数据
export const reqCartDataList = () => {
    return request({ url: `/cart/cartList`, method: 'get' })
}

// 删除购物车的数据
export const deleteCartList = (skuId) => {
    return request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
}

// 切换购物车产品选中的状态
export const changeCartList = (skuID, isChecked) => {
    return request({ url: `/cart/checkCart/${skuID}/${isChecked}` })
}

// 获取验证码
export const getCode = (phone) => {
    return request({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}

// 注册用户
export const getUserRegister = (data) => {
    return request({ url: '/user/passport/register', data, method: 'post' })
}

// 登录
export const reqUserLogin = (data) => {
    return request({url:'/user/passport/login', data, method:'post'})
}

// 获取用户信息
export const reqUserInfo = () => {
    return request({url:'/user/passport/auth/getUserInfo',method:'get'})
}

// 退出登录
export const reqLoginOut = () => {
    return request({url:'/user/passport/logout', method:'get'})
}

// 获取用户地址信息
export const reqGetUserAddress = () => {
    return request({url:'/user/userAddress/auth/findUserAddressList', method:'get'})

}
// 获取用户订单详细页信息
export const reqGetUserTrade = () => {
    return request({url:'/order/auth/trade', method:'get'})
}
// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
    return request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
}

// 获取支付订单信息
export const reqGetOrderInfo = (orderId) => {
    return request({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}

// 查询订单支付状态
export const reqQueryOrder = (orderId) => {
    return request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}

// 获取订单列表
export const reqOrderList  = (page, limit) => {
    return request({url:`/order/auth/${page}/${limit}`, method:'get'})
}