import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
import store from './store'
uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'
// 请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}
Vue.config.productionTip = false
uni.$showMsg=function(title='数据加载失败',duration=1500){
  uni.showLoading({
    title,
    duration,
    icon:'none'
  })
}
App.mpType = 'app'
Vue.prototype.$store = store
const app = new Vue({
  store,
  ...App
})
app.$mount()
