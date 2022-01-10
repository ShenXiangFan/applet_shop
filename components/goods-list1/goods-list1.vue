<template>
	<view>
    <!-- 商品列表的ui结构 -->
    <view class="goods-list">
      <view class="good-item" v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
        <!-- 左边的图片区域 -->
        <view class="goods-item-left">
          <image :src="item.goods_small_logo || defaultImg" ></image>
        </view>
        <!-- 右边商品列表区域 -->
        <view class="goods-item-right">
          <view class="goods-item-title">{{item.goods_name}}</view>
          <view class="goods-item-price">{{item.goods_price | chargeFilter}}</view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
    props:['goodsList'],
    data(){
      return{
         defaultImg:'/static/logo.png'
      }
    },
    methods:{
      gotoDetail(item){
        this.$emit("itemGotoDetail",item)
      }
    },
    filters:{
      chargeFilter(num){
        return Number(num).toFixed(2)
      }
    }
	}
</script>

<style lang="scss">
.goods-list{
  padding: 10px 5px;
  .good-item{
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #efefef;
    .goods-item-left{
      width:30%;
      height: 180rpx;
      image{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .goods-item-right{
      width: 60%;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-item-title{
        font-size: 12px;
      }
      .goods-item-price{
        font-size: 15px;
        color:red;
      }
    }
  }
}
</style>
