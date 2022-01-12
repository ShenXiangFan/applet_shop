const actions = {
  savaUserInfo(context, data) {
    context.commit('SAVAUSERINFO', data)
  }
}
const mutations = {
  SAVAUSERINFO(state, data) {
    uni.setStorageSync('address1', JSON.stringify(data))
  }
}
const state = {
  address: JSON.parse(uni.getStorageSync('address1') || '{}')
}
export default {
  actions,
  mutations,
  state,
}
