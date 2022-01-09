<template>
	<view>
    <view class="search-box">  
      <uni-search-bar @input="input" radius="100" cancelButton="none"></uni-search-bar>
      <!-- 搜索建议列表 -->
      <view class="sugg-list" v-if="searchResult.length !== 0">
        <view class="sugg-item" v-for="(item,index) in searchResult" :key="index" @click="gotoDetail(item)">
          <view class="goods-name">{{item.goods_name}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
    </view>
    <!-- 搜索历史区域 -->
    <view class="history-box" v-if="searchResult.length===0">
      <!-- 第一行的标题区域 -->
      <view class="history-title-box">
        <text class="history-title">搜索历史</text>
        <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
      </view>
      <!-- 搜索历史区域 -->
      <view class="history-list-box">
        <view class="history-list-item" v-for="(item,index) in historyList" :key="index" @click="gotoGoodsList(item)">
          {{item}}
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
        kw:'',
        searchResult:[],
        historyList:['a','q']
			}
		},
		methods: {
       input(e){
         clearTimeout(this.timer)
         this.timer=setTimeout(()=>{
           this.kw=e.value  
           this.getSearchList()
         },500)
       },
       // 获取search列表项
       async getSearchList(){
         if(this.kw === ''){
           this.searchResult=[]
           return
         }
         const {data:res} = await uni.$http.get(`/api/public/v1/goods/qsearch?query=${this.kw}`)
         if(res.meta.status !== 200) return uni.$showMsg()
         this.searchResult=res.message
         this.saveSearchHistory()
       },
       //点击搜索栏每一项goto相亲页
       gotoDetail(item){
         uni.navigateTo({
           url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
         })
       },
       // 保存历史区数据
       saveSearchHistory(){
         const set=new Set(this.historyList)
         set.delete(this.kw)
         set.add(this.kw)
         this.historyList=Array.from(set)
         this.historyList=[...this.historyList].reverse()
         uni.setStorageSync('kw',JSON.stringify(this.historyList))
       },
       // 清空历史区
       clearHistory(){
         this.historyList=[]
         uni.setStorageSync('kw','[]')
       },
       gotoGoodsList(item){
         uni.navigateTo({
           url:'/subpkg/goods_list/goods_list?query'+item
         })
       }
		},
    onLoad(){
      this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
    }
	}
</script>

<style lang="scss">
.search-box{
  position: static;
  top: 0;
  z-index: 999;
}
.sugg-list{
  padding: 0 5px;
  .sugg-item{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    align-items: center;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    .goods-name{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box{
  padding: 0px 10px;
  .history-title-box{
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px #efefef solid;
  }
  
  .history-list-box{
    display: flex;
    flex-wrap: wrap;
    .history-list-item{
      height: 20px;
      background-color: #efefef;
      padding: 10px 10px;
      margin:5px 5px;
      text-align: center;
    }
  }
}
</style>
