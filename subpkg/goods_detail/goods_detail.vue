<template>
  <view v-if="detailData.goods_name" class="goods-detail-container">
    <!-- 商品详情页 -->
    <view class="goods-detail-list">
      <!-- 轮播图区域 -->
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
        <swiper-item v-for="(image,index1) in detailData.pics" :key="index1">
          <image :src="image.pics_big" @click="previewImage(index1)"></image>
        </swiper-item>
      </swiper>
      <!-- 价格信息区域 -->
      <view class="goods-detail-info">
        <view class="goods-price">￥{{detailData.goods_price}}</view>
        <view class="goods-info-body">
          <view class="goods-name">
            {{detailData.goods_name}}
          </view>
          <view class="favi">
            <uni-icons type="star" size="18" color="gray"></uni-icons>
            <text>收藏</text>
          </view>
        </view>
        <view class="expressPrice">快递：免运费</view>
      </view>
      <!-- 商品图文数据 -->
      <view class="goods-image-area" v-html="detailData.goods_introduce">
      </view>
    </view>
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import store from '@/store/index.js';
  export default {
    data() {
      return {
        goods_id: '',
        detailData: {},
        options: [{
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ],
        cartLength: 0
      };
    },
    methods: {
      // 获取详情页的数据
      async getGoodsDetailData() {
        let {
          goods_id
        } = this
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g, '<img style="display:block;"')
        this.detailData = res.message
      },
      // 轮播图浏览效果
      previewImage(index) {
        uni.previewImage({
          current: index,
          urls: this.detailData.pics.map(item => {
            return item.pics_big
          })
        })
      },
      // 底部购物信息点击事件
      onClick(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '../../pages/cart/cart'
          })
        }
      },
      buttonClick(e) {
        if (e.content.text === '加入购物车') {
          const goods = {
            goods_id: this.detailData.goods_id,
            goods_name: this.detailData.goods_name,
            goods_price: this.detailData.goods_price,
            goods_count: 1,
            goods_small_logo: this.detailData.goods_small_logo,
            goods_state: true
          }
          store.dispatch('addtoCart', goods)
        }
      }
    },
    computed: {
      ...mapState({
        cateList: (state) => {
          // this.options[1].info=state.cart.goods_count
          return state.cart
        }
      }),
      ...mapGetters(['total'])
    },
    watch: {
      total: {
        immediate:true,
        handler(newValue) {
          let findResult = this.options.find((item) => {
            return item.text === '购物车'
          })
          if (findResult) {
            findResult.info = newValue
          }
        }
      }
    },
    onLoad(options) {
      this.goods_id = options.goods_id
      this.getGoodsDetailData()
    }
  }
</script>

<style lang="scss">
  .goods-detail-container {
    margin-bottom: 50px;

    .goods-detail-list {
      swiper {
        height: 750rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .goods-detail-info {
        padding: 10px;
        padding-right: 0;

        .goods-price {
          color: red;
          font-size: 20px;
        }

        .expressPrice {
          color: gray;
          font-size: 10px;
        }

        .goods-info-body {
          display: flex;
          justify-content: space-between;
          height: 80rpx;

          .goods-name {
            width: 80%;
            font-size: 13px;
          }

          .favi {
            border-left: 1px solid #efefef;
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            text {
              font-size: 10px;
              color: gray;
            }
          }
        }
      }
    }

    .goods_nav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
</style>
