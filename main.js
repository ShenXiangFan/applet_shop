import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
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

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
