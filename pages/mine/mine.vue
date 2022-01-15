<template>
  <view class="mine-container">
    <my-login v-if="JSON.stringify(getToken) === '{}'"></my-login>
    <my-userInfo v-else></my-userInfo>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapGetters,mapState
  } from 'vuex'
  export default {
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters(['getToken'])
    },
    mixins: [badgeMix],
  }
</script>

<style lang="scss">
body,.mine-container{
  height: 100%;
  background-color: #F8F8F8;
}
</style>
