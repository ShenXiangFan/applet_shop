import {mapGetters} from 'vuex'
export default{
  methods:{
    setBadge(){
      uni.setTabBarBadge({
        index:2,
        text:this.total+''
      })
    }
  },
  computed:{
    ...mapGetters(['total'])
  },
  onLoad(){
    this.setBadge()
  }
}