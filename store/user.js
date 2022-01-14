const actions = {
  savaUserInfo(context, data) {
    context.commit('SAVAUSERINFO', data)
  }
}
const mutations = {
  SAVAUSERINFO(state, data) {
    console.log('111', state.address)
    uni.setStorageSync('address1', JSON.stringify(state.address))
  }
}
const state = {
  address: JSON.parse(uni.getStorageSync('address1') || '[]'),
  token:''
}
const getters={
  token1(state){
    return state.token
  }
}
export default {
  actions,
  mutations,
  state,
  getters
}
