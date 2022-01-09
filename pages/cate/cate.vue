<template>
  <view>
    <my-search></my-search>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height:wh+'px'}">
        <view :class="['left-scroll-view-item',index===currentIndex?'active':'']" v-for="(item,index) in cateList" :key="item.cat_id" @click="changeIndex(index)">{{item.cat_name}}</view>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height:wh+'px'}"
      :scroll-top="scrollTop">
        <view class="right-scroll-view-item">
          <!-- 二级分类标题 -->
          <view class="cate-lv2" v-for="(rightInfo,index2) in cateLevel" :key="index2">
            <!-- 标题区域 -->
            <view class="cata-lv2-title">/{{rightInfo.cat_name}}/</view>
            <!-- 动态渲染三级分类列表数据 -->
            <view class="cate-lv3-list">
              <view class="cate-lv3-item" v-for="(item3,index3) in rightInfo.children" 
              :key="index3" @click="gotoGoodsList(item3)">
                <image :src="item3.cat_icon"></image>
                <text>{{item3.cat_name}}</text>
              </view>
            </view>
          </view>
        </view>
        <!-- 视图区域 -->
        
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        cateList:[],
        currentIndex:0,
        //二级分类列表
        cateLevel:[],
        scrollTop:0
      };
    },
    methods:{
      // 获取参数列表数据
      async getCateList(){
          const {data:res} = await uni.$http.get('/api/public/v1/categories')
          if(res.meta.status !== 200) return uni.$showMsg()
          this.cateList=res.message
          this.cateLevel=res.message[0].children
      },
      // 修改动态列表
      changeIndex(index){
        this.currentIndex=index
        this.cateLevel=this.cateList[index].children
        this.scrollTop=this.scrollTop===0?Math.random():0
      },
      //三级分类得item跳转
      gotoGoodsList(item){
        console.log(item)
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
        })
      }
    },
    onLoad() {
      const systemInfo = uni.getSystemInfoSync()
      this.wh=systemInfo.windowHeight-50
      
      //获取分类数据
      this.getCateList()
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        background-color: #efefef;
        font-size: 12px;
        text-align: center;
        line-height: 60px;

        &.active {
          background-color: #FFFFFF;
          position: relative;
          &::before{
            content: '';
            display: block;
            width: 2px;
            height: 30px;
            background-color: red;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
  .cata-lv2-title{
    text-align: center;
    font-weight: bold;
    font-size: 12px;
    padding: 15px 0;
  }
  .cate-lv3-list{
    display: flex;
    flex-wrap: wrap;
    .cate-lv3-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 33%;
      height: 120px;
      font-size: 12px;
      padding: 5px 5px;
      box-sizing: border-box;
      image{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
