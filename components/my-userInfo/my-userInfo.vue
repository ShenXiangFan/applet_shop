<template>
  <view>
    <view class="my-userInfo-container">
      <!-- 头像昵称区域 -->
      <view class="top-box">
        <image :src="userLoginInfo.avatarUrl" class="avatar"></image>
        <view class="username">
          {{userLoginInfo.nickName}}
        </view>
      </view>
      <!-- 面板的列表区域 -->
      <view class="panel-list">
        <view class="panel">
          <!-- 第一部分 -->
          <view class="panele-body">
            <view class="panle-item">
              <text>8</text>
              <text>收藏的店铺</text>
            </view>
            <view class="panle-item">
              <text>8</text>
              <text>收藏的店铺</text>
            </view>
            <view class="panle-item">
              <text>8</text>
              <text>收藏的店铺</text>
            </view>
            <view class="panle-item">
              <text>8</text>
              <text>收藏的店铺</text>
            </view>
          </view>
          <!-- 第二部分 -->
          <view class="panelTwo">
            <view class="panelTwo-title">
              我的订单
            </view>
            <view class="panelTwo-list">
              <view class="panelTwo-item">
                <image src="/static/my-icons/icon1.png" class="icon"></image>
                <text>待付款</text>
              </view>
              <view class="panelTwo-item">
                <image src="/static/my-icons/icon2.png" class="icon"></image>
                <text>待收货</text>
              </view>
              <view class="panelTwo-item">
                <image src="/static/my-icons/icon3.png" class="icon"></image>
                <text>退款/退货</text>
              </view>
              <view class="panelTwo-item">
                <image src="/static/my-icons/icon4.png" class="icon"></image>
                <text>全部订单</text>
              </view>
            </view>
          </view>
          <!-- 第三部分 -->
          <view class="panelThree">
            <view class="panelThree-item">
              <text>收货地址</text>
              <uni-icons type="arrowright"></uni-icons>
            </view>
            <view class="panelThree-item">
              <text>联系客服</text>
              <uni-icons type="arrowright"></uni-icons>
            </view>
            <view class="panelThree-item" @click="logout">
              <text>退出登录</text>
              <uni-icons type="arrowright"></uni-icons>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import store from '@/store/index.js'
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {

      };
    },
    computed: {
      ...mapGetters(['userLoginInfo'])
    },
    methods:{
      //退出登录
      async logout(){
        const [err,succ] = await uni.showModal({
          content:'确定退出登陆吗'
        }).catch(err=>err)
        if(succ && succ.confirm){
          store.dispatch('logoutUpdataToken')
        }
      }
    }
  }
</script>

<style lang="scss">
  .my-userInfo-container {
    height: 100%;
    background-color: #f4f4f4;

    .top-box {
      background: #C00000;
      height: 400rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .avatar {
        width: 200rpx;
        height: 200rpx;
        border-radius: 100rpx;
        margin-bottom: 15px;
        border: 5px solid white;
        box-shadow: 0 1px 5px black;
        box-sizing: border-box;
      }

      .username {
        font-size: 14px;
        color: #f4f4f4;
        font-weight: bold;
      }
    }

    .panel-list {
      height: 100%;
      background-color: #f4f4f4;
      position: relative;
      padding: 0 10px;

      .panel {
        position: absolute;
        top: -10px;
        left: 25rpx;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-around;

        // 第一部分
        .panele-body {
          background-color: #FFFFFF;
          width: 700rpx;
          height: 100rpx;
          margin: 0 auto;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-around;
          border-radius: 2px;

          .panle-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 13px;
          }
        }

        // 第二部分
        .panelTwo {
          margin-top: 10px;
          background-color: #FFFFFF;

          .panelTwo-title {
            font-size: 18px;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #f4f4f4;
          }

          .panelTwo-list {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-around;
            background-color: white;

            .panelTwo-item {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              .icon {
                height: 50px;
                width: 50px;
              }

              text {
                font-size: 13px;
              }
            }
          }

        }

        .panelThree {
          background-color: white;
          margin-top: 10px;
          padding: 0 10px;
          .panelThree-item {
            line-height: 50px;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
</style>
