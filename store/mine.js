const actions={
  getUserInfo(context,data){
    context.commit('GETUSERINFO',data)
  },
  updataToken(context,data){
    context.commit('UPDATATOKEN',data)
  },
  logoutUpdataToken(context){
    context.commit('LOGOUTUPDATATOKEN')
  }
}
const mutations={
  GETUSERINFO(state,data){
    uni.setStorageSync('userinfo',JSON.stringify(data))
  },
  UPDATATOKEN(state,data){
    state.token=data
    uni.setStorageSync('token',JSON.stringify(data))
  },
  LOGOUTUPDATATOKEN(state){
    state.token={}
  }
}
const state={
  userLoginInfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
  token:JSON.parse(uni.getStorageSync('token') || '{}')
}
const getters={
  userLoginInfo(state){
    return state.userLoginInfo
  },
  token(state){
    return state.token
  }
}
export default{
  actions,
  mutations,
  state,
  getters
}