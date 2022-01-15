<template>
  <view>
    <view class="address-choose-box" v-if="JSON.stringify(myAddress) === '{}'">
      <button type="primary" size="mini" class="address-choose-button" @click="addAddress">请选择收货地址</button>
    </view>
    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else @click="addAddress">
      <!-- 第一行 -->
      <view class="row1">
        <view class="row1-left">
          <text>收货人:{{myAddress.userName}}</text>
        </view>
        <view class="row1-right">
          <text>电话:{{myAddress.telNumber}}</text>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <!-- 第二行 -->
      <view class="row2">
        <text>收货地址:{{newAddress}}</text>
      </view>
    </view>
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import {
    mapState,mapGetters
  } from 'vuex'
  import store from '@/store/index.js';
  export default {
    data() {
      return {
      };
    },
    methods: {
      async addAddress() {
        const [err, suc] = await uni.chooseAddress()
        if (err === null && suc.errMsg === "chooseAddress:ok"){
          store.dispatch('savaUserInfo', suc)
        }
      }
    },
    computed: {
      ...mapGetters(['myAddress']),
      newAddress() {
        if (this.myAddress !== '{}') {
          let {
            provinceName,
            cityName,
            countyName,
            detailInfo
          } = this.myAddress
          let newAddress = `${provinceName}${cityName}${countyName}${detailInfo}`
          return newAddress
        }
      }
    }
  }
</script>

<style lang="scss">
  .address-border {
    display: block;
    height: 5px;
    width: 100%;
  }

  .address-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .address-info-box {
    padding: 5px 5px;
    height: 90px;
    margin: auto 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 12px;

    .row1 {
      display: flex;
      justify-content: space-between;
    }

    .row2 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
