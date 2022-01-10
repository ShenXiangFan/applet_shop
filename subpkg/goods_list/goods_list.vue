<template>
  <view>
    <goods-list1 :goodsList="goodsList" @itemGotoDetail="itemGotoDetail"></goods-list1>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        //商品列表的数据
        total: 0,
        goodsList: [],
        isLoading: false
      }
    },
    methods: {
      // 获取商品列表数据
      async getGoodsList(cb) {
        this.isLoading = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isLoading = false
        cb&&cb()
        if (res.meta.status !== 200) return uni.$showMsg()
        let {
          total,
          goods
        } = res.message
        this.total = total
        this.goodsList = [...this.goodsList, ...goods]
      },
      itemGotoDetail(item){
        console.log('111')
        uni.navigateTo({
          url:"../goods_detail/goods_detail?goods_id="+item.goods_id
        })
      }
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
        return uni.$showMsg('数据加载完毕!')
      if (this.isLoading === false) {
        this.queryObj.pagenum += 1
        this.getGoodsList()
      }
    },
    // 下拉刷新事件
    onPullDownRefresh(){
      this.queryObj.pagenum=1
      this.total=0
      this.goodsList=[]
      this.isLoading=false
      this.getGoodsList(()=>{uni.stopPullDownRefresh();})
    }
  }
</script>

<style lang="scss">
</style>
