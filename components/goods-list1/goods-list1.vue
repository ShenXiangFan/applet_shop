<template>
  <view>
    <!-- 商品列表的ui结构 -->
    <view class="goods-list">
      <view class="good-item" @click="gotoDetail(goodsList)">
        <!-- 左边的图片区域 -->
        <view class="goods-item-left">
          <radio color="#C00000" :checked="goodsList.goods_state" v-if="showRadio" @click="changeRadio(goodsList)" /><text></text>
          <image :src="goodsList.goods_small_logo || defaultImg"></image>
        </view>
        <!-- 右边商品列表区域 -->
        <view class="goods-item-right">
          <view class="goods-item-title">{{goodsList.goods_name}}</view>
          <view class="goods-info-box">
            <view class="goods-item-price">{{goodsList.goods_price | chargeFilter}}</view>
            <uni-number-box :min="1" :value="goodsList.goods_count" v-if="showRadio" @change="numChangeHandler"></uni-number-box>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: ['goodsList', 'showRadio'],
    data() {
      return {
        defaultImg: '/static/logo.png',
        goods:{}
      }
    },
    methods: {
      gotoDetail(item) {
        this.$emit("itemGotoDetail", item)
      },
      changeRadio(item) {
        this.$emit('raiodChange', {
          goods_id: item.goods_id,
          goods_state: !item.goods_state
        })
      },
      numChangeHandler(val){
        this.$emit('numChange',{
          goods_id:this.goodsList.goods_id,
          goods_count:val-0
        })
      }
    },
    filters: {
      chargeFilter(num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods-list {
    padding: 10px 5px;

    .good-item {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #efefef;

      .goods-item-left {
        width: 30%;
        height: 180rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .goods-item-right {
        width: 60%;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        .goods-item-title {
          font-size: 12px;
        }

        .goods-info-box {
          display: flex;
          justify-content: space-between;
          .goods-item-price {
            font-size: 15px;
            color: red;
          }
        }
      }
    }
  }
</style>
