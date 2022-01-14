import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart.js'
import user from './user.js'
import mine from './mine.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    user,
    cart,
    mine
  }
})
export default store