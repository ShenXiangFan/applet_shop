<template>
  <view>
    <view class="search-box">
      <my-search @searchClickHandler="searchClickHandler1"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" autoplay :interval="3000" :duration="1000">
      <swiper-item v-for="item in swiperData" :key="item.goods_id">
        <view class="swiper-item">
          <image :src="item.image_src" @click="btnHandler(item.goods_id)"></image>
        </view>
      </swiper-item>
    </swiper>
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in catrNavDate" :key="index">
        <image :src="item.image_src" class="nav-img" @click="navigateHandler(item)"></image>
      </view>
    </view>
    <!-- 渲染楼层数据 -->
    <view class="floor-list">
      <!-- 楼层的每一项 -->
      <view class="floor-item" v-for="(item,index) in floorList" :key="index" @click="floorHandler(item)">
        <!-- 楼层得标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层的图片区域 -->
        <view class="floor-img-box">
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width+'rpx'}"></image>
          </navigator>
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2,index2) in item.product_list" :url="item2.url">
               <image v-if="index2!==0?true:false" :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width+'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 轮播图区域数据
        swiperData: [],
        catrNavDate:[],
        floorList:[]
      };
    },
    methods: {
      // 获取轮播图区域
      async getSwiperList() {
        const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) {
          uni.showLoading({
            title: "请求数据失败...",
            duration: 1500,
            icon: 'none'
          })
        }
        this.swiperData = res.message
      },
      // 点击轮播图跳转路径
      btnHandler(id){
        uni.navigateTo({
          url:`../../subpkg/goods_detail/goods_detail?goods_id=${id}`
        })
      },
      // 获取分类导航数据
      async getCatrNavDate(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status !== 200) return uni.$showMsg()
        this.catrNavDate=res.message
      },
      //分类导航得点击事件
      navigateHandler(item){
        if(item.name==='分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      async getFloorList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
        if(res.meta.status !== 200) return uni.$showMsg()
        res.message.forEach(floor=>{
          floor.product_list.forEach(item=>{
            item.url='/subpkg/goods_list/goods_list?'+item.navigator_url.split('?')[1]
          })
        })
        this.floorList=res.message
      },
      //搜索栏得点击事件
      searchClickHandler1(){
        // 跳转路径
        uni.navigateTo({
          url:'../../subpkg/search/search'
        })
      }
    },
    onLoad() {
      this.getSwiperList()
      this.getCatrNavDate()
      this.getFloorList()
    }
  }
</script>

<style lang="scss">
  .search-box{
    position: sticky;
    top: 0;
    z-index: 999;
  }
  swiper {
    height: 330rpx;
    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }
  .nav-list{
     display: flex;
     justify-content: space-around;
     margin: 15px 0;
     .nav-img{
       width: 128rpx;
       height: 140rpx;
     }
  }
  .floor-title{
    height: 60rpx;
    width:  100%;
  }
  .floor-img-box{
    padding: 10rpx;
    display: flex;
    justify-content: space-around;
    .right-img-box{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
</style>
