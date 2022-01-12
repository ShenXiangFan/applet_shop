const actions = {
  addtoCart(context, data) {
    context.commit('ADDTOCART', data)
  },
  updataGoodsState(context, data) {
    context.commit('UPDATAGOODSSTATE', data)
  },
  updataGoodsCount(context, data) {
    context.commit('UPDATAGOODSCOUNT', data)
  },
  deleteGoods(context, data) {
    context.commit('DELETEGOODS', data)
  }
}
const mutations = {
  ADDTOCART(state, data) {
    let findResult = state.cart.find(item => {
      return item.goods_id === data.goods_id
    })
    if (!findResult) state.cart.push(data)
    else findResult.goods_count++
    uni.setStorageSync('cart', JSON.stringify(state.cart))
  },
  UPDATAGOODSSTATE(state, data) {
    let findResult = state.cart.find(item => {
      return item.goods_id === data.goods_id
    })
    if (findResult) {
      findResult.goods_state = data.goods_state
    }
    uni.setStorageSync('cart', JSON.stringify(state.cart))
  },
  UPDATAGOODSCOUNT(state, data) {
    console.log(data)
    let findResult = state.cart.find(item => {
      return item.goods_id === data.goods_id
    })
    if (findResult) {
      findResult.goods_count = data.goods_count
    }
    uni.setStorageSync('cart', JSON.stringify(state.cart))
  },
  DELETEGOODS(state, data) {
    let findResult = state.cart.filter(item => {
      if(item.goods_id !== data.goods_id){
        return item
      }
    })
    state.cart=findResult
    uni.setStorageSync('cart', JSON.stringify(state.cart)) 
  }
}
const state = {
  cart: JSON.parse(uni.getStorageSync('cart') || '[]')
}
const getters = {
  total(state) {
    let c = 0
    state.cart.forEach(item => {
      return c += item.goods_count
    })
    return c
  },
}
export default {
  actions,
  mutations,
  state,
  getters
}
