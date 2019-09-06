<template>
	<view class="page">
		<view  class="aa">
			 <you-scroll ref="scroll" @onPullDown="onPullDown"  @onLoadMore="onLoadMore">
				 
					<view class="blog-content" @click="intoArticle(article.articleId)" v-for="article in articles " :key="article.articleId">
						 <view class="article-title">{{article.articleTitle}}</view>
						
						<view class="image">
										<image  class="img" :src="article.articleImg"></image>
									</view>
						<view class="blog-info">
										<view class="info-time"><image class="info-image" src="../../static/img/time.png"></image>{{article.articleUpdateTime}}</view>
										<view class="info-time"> <image class="info-image" src="../../static/img/fangke.png"></image>{{article.articleViewCount}}</view>
										<view class="info-time"><image class="info-image" src="../../static/img/dianzan.png"></image>{{article.articleGiveCount}}</view>
										<view class="info-time"><image class="info-image" src="../../static/img/pinglun.png"></image>{{article.articleCommentCount}}</view>
									</view>
					</view>
					
					
				
				
			</you-scroll>
		 
		</view>
		
		
	
		
	
	</view>
</template>

<script>
	 import youScroll from "@/components/you-scroll.vue"
	 import {
	 	mapState,
	 	mapMutations
	 } from 'vuex'
	export default {
		computed: mapState(['optionid']), //对全局变量监控
		components:{
			
			
			youScroll
		},
		data() {
			return {
				articles:[],
				pageNum:0,
				isLoading:true,
				isrefresh:true,
				
				
			}
		},
		onLoad() {
			this.onLoadMore();
		},
		methods: {
			...mapMutations(['articleids']),
			intoArticle(id){
				this.articleids(id);
				uni.navigateTo({
				
					url:"../article/article"
				})
				
				
			},
			
			onPullDown(done){
				var _this=this;
				 this.isLoading=true;
				 this.isrefresh=true;
				  _this.pageNum=1;
				uni.request({
						url: 'http://localhost:8081/blog/index/option/intoOptions', 
						data: {
							pageNum: this.pageNum,
							pageSize:5,
							optionId:this.optionid
						},
						
						success: (res) => {
							console.log(this.optionid);
							this.articles = res.data.list;
							 if(res.data.list.length<5){
								  this.isLoading=false;
							
								}
						}
					});
				  done();
				
			},
			
			 onLoadMore(e) {
								   var _this=this;
									
									if(_this.isrefresh==true){
										
										if(_this.isLoading==true){
										
										_this.isrefresh=false;
										_this.pageNum++;
										
											uni.showLoading({
												title: '加载中'
													});
											uni.request({
												url: 'http://localhost:8081/blog/index/option/intoOptions', //仅为示例，并非真实接口地址。
												data: {
													pageNum: this.pageNum,
													pageSize:5,
													optionId:this.optionid
												},
												
												success: (res) => {
													
													  var article = res.data.list;
													  _this.isrefresh=true;
													  console.log(article.length+"sss")
													  if(article.length<5){
														  _this.isLoading=false;
														console.log("文章小于5")
															 }
														
													  
													for(let i =0; i<article.length;i++){
														_this.articles.push(article[i]);
														
													}
													
													
													
													 uni.hideLoading();
													  _this.isrefresh=true;
												},
												fail: (res) => {
													_this.isrefresh=true;
												}
											});
											}else{
												setTimeout(function(){
													uni.showToast({
														title: '没有更多文章了',
														image:'../../static/img/fail.png',
														duration: 1000
														});
														_this.isrefresh=false;
													
												},500)
												
											}
									}
			},
			
		}
	}
</script>

<style>
	@import url("articles.css");
</style>
