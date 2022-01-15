const actions = {
  savaUserInfo(context, data) {
    context.commit('SAVAUSERINFO', data)
  }
}
const mutations = {
  SAVAUSERINFO(state, data) {
    state.address=data
    uni.setStorageSync('address', JSON.stringify(data))
  },
  updateRedirectInfo(state,data){
    state.redirectInfo=data
  }
}
const state = {
  address: JSON.parse(uni.getStorageSync('address') || '{}'),
  redirectInfo:null,
}
const getters={
  myAddress(state){
    return state.address
  }
}
export default {
  actions,
  mutations,
  state,
  getters
}
