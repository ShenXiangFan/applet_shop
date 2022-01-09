<template>
	<view>
		<view class="my-search-container" @click="searchClickHandler">
		  <!-- 使用view组件模拟input输入框的样式 -->
      <view class="my-search-box">
        <uni-icons type="search" size="17"/>
        <text class="placeholder">搜索</text>
      </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value
			};
		},
    methods:{
      searchClickHandler(){
        this.$emit('searchClickHandler')
      }
    }
	}
</script>

<style lang="scss">
  .my-search-container{
    background-color:#C00000;
    align-items: center;
    display: flex;
    height: 50px;
    padding: 0 10px;
    .my-search-box{
      margin: 10px auto;
       width: 100%;
       height: 36px;
       background-color: #FFFFFF;
       text-align: center;
       line-height: 36px;
       border-radius: 18px;
       .placeholder{
         font-size: 15px;
         margin-left: 5px;
       }
    }
  }
</style>
