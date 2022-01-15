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
    mapGetters,mapMutations,mapState
  } from 'vuex'
  import store from '@/store/index.js'
  export default {
    data() {
      return {
        tag: true,
        userInfo: JSON.parse(uni.getStorageSync('address1') || '{}'),
        token:this.getToken,
        seconds:3,
        timer:null
      };
    },
    methods: {
      ...mapMutations(['updateRedirectInfo']),
      radioClick() {
        this.tag = !this.tag
        store.dispatch('changeAllTag', this.tag)
      },
      settlement() {
        if (this.selectTotal === 0) return uni.$showMsg('请选择要结算的商品')
        if (JSON.stringify(this.myAddress) == '{}') return uni.$showMsg('请选择用户地址')
        if (JSON.stringify(this.token) == '{}') {
          return this.delayNavigate()
        }
        // 支付订单
        this.payOrder()
      },
      async payOrder(){
        const orderInfo={
          order_price:0.01,
          consignee_addr:this.myAddress,
          goods:this.myCartList.filter(x=>x.goods_state).map(item1=>({
            goods_id:item1.goods_id,
            goods_number:item1.goods_count,
            goods_price:item1.goods_price,
          }))
        }
        const res = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
        console.log(res)
      },
      delayNavigate(){
        this.seconds=3
        this.showTips(this.seconds);
        this.timer = setInterval(()=>{
          this.seconds--
          if(this.seconds<=0){
            clearInterval(this.timer)
            uni.switchTab({
              url:'/pages/mine/mine',
              success: () => {
                this.updateRedirectInfo({
                  openTypr:'switchBar',
                  from:'/pages/cart/cart'
                })
              }
            })
            return   
          }
          this.showTips(this.seconds)
        },1000)
      },
      showTips(sec){
        uni.showToast({
          icon:'none',
          title:'请登陆后再结算！还差'+sec+'s跳转到登录页',
          mask:true,
          duration:1500
        })
      }
    },
    computed: {
      ...mapGetters(['selectTotal', 'total', 'totalPrice']),
      ...mapGetters(['getToken']),
      ...mapGetters(['myAddress']),
      ...mapGetters(['myCartList'])
    },
    watch: {
      selectTotal: {
        immediate: true,
        handler() {
          if ((this.selectTotal - 0) === (this.total - 0)) {
            this.tag = true
          } else {
            this.tag = false
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
