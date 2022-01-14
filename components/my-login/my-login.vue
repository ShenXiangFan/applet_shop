<template>
  <view>
    <view class="login-container">
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
      <view class="tips-text">
        登陆后尽享更多权益
      </view>
    </view>
  </view>
</template>

<script>
  import store from '@/store/index.js'
  import {mapState,mapGetters} from 'vuex'
  export default {
    data() {
      return {
        userInfo:{},
      };
    },
    methods: {
      getUserProfile() {
        uni.getUserProfile({
          desc: '你的授权信息',
          success: (res) => {
            // 将信息存到 vuex 中
            this.updateUserInfo(res.userInfo)
            this.getToken(res)
          },
          fail: (res) => {
            return uni.$showMsg('您取消了登录授权')
          }
        })
      },
      updateUserInfo(info){
        this.userInfo=info
        store.dispatch('getUserInfo',info)
      },
      async getToken(info){
        const [err,res] = await uni.login().catch(err=>err)
        if(res.errMsg !== 'login:ok') return uni.$showMsg('登陆失败')
        const query={
          code:res.code,
          encryptedData:info.encryptedData,
          iv:info.iv,
          rawData:info.rawData,
          signature:info.signature, 
        }
        //获取token
        const {data:loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
        if(loginResult.meta.status !== 400) return uni.$showMsg('登录失败')
        uni.$showMsg('登陆成功')
        store.dispatch('updataToken',{name:'sxf'})
      }
    },
    computed:{
      ...mapGetters(['userLoginInfo'])
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F8F8F8;
    position: relative;
    overflow: hidden;

    &::after {
      content: ' ';
      display: block;
      width: 100%;
      height: 40px;
      background-color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%;
      transform: translateY(50%);
    }

    .btn-login {
      background-color: #C00000;
      height: 40px;
      line-height: 40px;
      width: 650rpx;
      border-radius: 20px;
      margin-bottom: 10px;
    }

    .tips-text {
      font-size: 12px;
      color: #757575;
    }
  }
</style>
