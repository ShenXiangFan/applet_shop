import {mapGetters} from 'vuex'
export default{
  methods:{
    setBadge(){
      uni.setTabBarBadge({
        index:2,
        text:this.selectTotal+''
      })
    }
  },
  computed:{
    ...mapGetters(['selectTotal'])
  },
  onLoad(){
    this.setBadge()
  },
  updated(){
    this.setBadge()
  }
}