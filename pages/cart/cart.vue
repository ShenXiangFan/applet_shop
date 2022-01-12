<template>
	<view>
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
	</view>
</template>

<script>
  import {mapState} from 'vuex'
  import badgeMix from '@/mixins/tabbar-badge.js'
  import store from '@/store/index.js'
	export default {
		data() {
			return {
				options:[
          {
            text:'删除',
            style:{
              backgroundColor:'#C00000'
            }
          }
        ]
			};
		},
    mixins:[badgeMix],
    computed:{
      ...mapState({
        cartList:(state)=>{
          return state.cart
        },
      })
    },
    methods:{
      raiodChange(e){
          store.dispatch('updataGoodsState',e)
      },
      numChange(data){
        store.dispatch('updataGoodsCount',data)
      },
      swipeActionClickHandler(goods){
        store.dispatch('deleteGoods',goods)
      }
    }
	}
</script>

<style lang="scss">
  .cart-title{
    line-height: 70rpx;
    border-bottom: 1px solid #efefef;
    .uni-icons{
      margin: 0 5px;
    }
    .cart-title-text{
      font-size: 18px;
    }
  }
</style>
