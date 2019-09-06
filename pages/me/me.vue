<template>
  <view class="page">
		<view class="user-logo">
			<view class="box-logo">
				
				<image class="logo" :src="avatarUrl"></image>
				
			</view>
			<view class="username">{{nickName}}</view>
		</view>
	
		<view @click="intoshoucang" class="item">
		
		<view  class="item-title"><i class="iconfont shou colorone">&#xe600;</i>我的收藏</view>	
		<view><i class="iconfont">&#xe611;</i></view>
		
		</view>
		
		<view class="item" @click="intoshoucang">
		
		<view class="item-title"><i class="iconfont shou colortwo">&#xe601;</i>我的点赞</view>	
		<view><i class="iconfont">&#xe611;</i></view>
		
		</view>
		<view class="item" @click="title">
		
		<view class="item-title"><i class="iconfont shou colorthree">&#xe602;</i>我的消息</view>	
		<view><i class="iconfont">&#xe611;</i></view>
		
		</view>
		<view class="item" @click="title"  style="margin-top: 30upx;">
		
		<view class="item-title"><i class="iconfont shou  colorfour">&#xe668;</i>意见反馈</view>	
		<view><i class="iconfont">&#xe611;</i></view>
		
		</view>
		
		
		<view class="item"  @click="title">
		
		<view class="item-title"><i class="iconfont shou  colorfive">&#xe6f4;</i>联系作者</view>	
		<view><i class="iconfont">&#xe611;</i></view>
		
		</view>
		<view class="item"  @click="title">
		
		<view class="item-title"><i class="iconfont shou  colorsix">&#xe67c;</i>历史版本</view>	
		<view><i class="iconfont">&#xe611;</i></view>
		
		</view>
		
		
		
		
  </view>
</template>

<script>
	import {
		mapState
		
	} from 'vuex'
export default {
	computed:mapState(['forcedLogin','hasLogin','nickName','session_key','token','avatarUrl']),//对全局变量监控
 
  data () {
    return {
		
      
    }
  },
  methods:{
	  intoshoucang(){
		  uni.navigateTo({
		  	url:"../shoucang/shoucang"
		  })
		  
	  },
	  
	  title(){
 uni.showToast({
    title: '还没开发呢',
	image:"../../static/img/beishang.png",
    duration: 2000
});
		  
	  }

  },
  onLoad() {
  	
		
	
	
	
  }
}
</script>


<style >
	@import url("me.css");

</style>
