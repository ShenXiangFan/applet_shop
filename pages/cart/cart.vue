<template>
  <view class="cart-box">
    <view v-if="cartList.cart.length !== 0">
      <!-- 收件地址组件 -->
      <my-address></my-address>
      <view class="cart-title">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="cart-title-text">购物车</text>
      </view>
      <!-- 购物车列表 -->
      <uni-swipe-action>
        <block v-for="(goods,index) in cartList.cart">
          <uni-swipe-action-item :options="options" @click="swipeActionClickHandler(goods)">
            <goods-list1 :goodsList="goods" :showRadio="true" @raiodChange="raiodChange" @numChange="numChange"></goods-list1>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      <my-settle></my-settle>
    </view>
    <view class="empty-cart" v-else>
      <image src="/static/cart_empty@2x.png" class="empty-img"></image>
      <text>空空如也</text>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import badgeMix from '@/mixins/tabbar-badge.js'
  import store from '@/store/index.js'
  export default {
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
      };
    },
    mixins: [badgeMix],
    computed: {
      ...mapState({
        cartList: (state) => {
          return state.cart
        },
      })
    },
    methods: {
      raiodChange(e) {
        store.dispatch('updataGoodsState', e)
      },
      numChange(data) {
        store.dispatch('updataGoodsCount', data)
      },
      swipeActionClickHandler(goods) {
        store.dispatch('deleteGoods', goods)
      }
    }
  }
</script>

<style lang="scss">
  .cart-title {
    line-height: 70rpx;
    border-bottom: 1px solid #efefef;

    .uni-icons {
      margin: 0 5px;
    }

    .cart-title-text {
      font-size: 18px;
    }
  }

  .cart-box {
    margin-bottom: 50px;
  }
  .empty-cart{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .empty-img{
      width: 90px;
      height: 90px;
    }
    text{
      font-size: 12px;
      color: gray;
      margin-top: 15px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
