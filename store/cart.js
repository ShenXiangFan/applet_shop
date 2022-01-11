const actions={
  addtoCart(context,data){
    context.commit('ADDTOCART',data)
  }
}
const mutations={
  ADDTOCART(state,data){
    const findResult = state.cart.find(item=>{
      return item.goods_id===data.goods_id
    })
    if(!findResult) state.cart.push(data)
    else findResult.goods_count++
    uni.setStorageSync('cart',JSON.stringify(state.cart))
    console.log(state)
  }
}
const state={
  cart:JSON.parse(uni.getStorageSync('cart') || '[]')
}
const getters={
  total(state){
    let c=0
    state.cart.forEach(item=>{
      return c+=item.goods_count
    })
    return c
  },
}
export default{
  actions,
  mutations,
  state,
  getters
}