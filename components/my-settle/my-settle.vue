<template>
  <view>
    <view class="settle-list">
      <!-- 全选按钮 -->
      <view class="radio">
        <radio color="#C00000" :checked="tag" @click="radioClick" />
        <text>全选</text>
      </view>
      <!-- 合计按钮 -->
      <view class="amount-box">
        合计:<text class="price">￥{{totalPrice}}</text>
      </view>
      <!-- 结算按钮 -->
      <view class="submitCharge">
        <button @click="settlement">结算({{selectTotal}})</button>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import store from '@/store/index.js'
  export default {
    data() {
      return {
        tag: true,
        userInfo:JSON.parse(uni.getStorageSync('address1')||'{}')
      };
    },
    methods: {
      radioClick() {
        this.tag = !this.tag
        store.dispatch('changeAllTag', this.tag)
      },
      settlement(){
        if(this.selectTotal === 0) return uni.$showMsg('请选择要结算的商品')
        if(JSON.stringify(this.userInfo) === '{}') return uni.$showMsg('请选择用户地址')
        if(!this.token){
         uni.$showMsg('请登录')
         setTimeout(()=>{
           uni.switchTab({
             url:'../../pages/mine/mine'
           })
           uni.hideLoading()
         },1000)
        }
      }
    },
    computed: {
      ...mapGetters(['selectTotal', 'total','totalPrice'])
    },
    watch:{
      selectTotal:{
        immediate:true,
        handler(){
          if((this.selectTotal-0) === (this.total-0)){
            this.tag=true
          }else{
            this.tag=false
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .settle-list {
    height: 50px;
    width: 730rpx;
    background-color: #FFFFFF;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    line-height: 50px;
    font-size: 14px;
    padding: 0 5px;

    .radio {}

    .amount-box {
      .price {
        color: #C00000;
        font-weight: bold;
      }
    }

    .submitCharge {
      button {
        background-color: #C00000;
        height: 50px;
        color: white;
        padding: 0px 10px;
        min-width: 100px;
      }
    }
  }
</style>
