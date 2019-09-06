<template>
	<view class="page">
		 <view  class="list-box">
		    <uni-segmented-control class="tabs" :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#008B8B"></uni-segmented-control>
		    <view class="content">
		        <view v-show="current === 0" class="aa">
					 <you-scroll ref="scroll" @onPullDown="onPullDown"  @onLoadMore="onLoadMore">
						 
							<view class="blog-content" @click="intoArticle(article.articleId)" v-for="article in articleCollections " :key="article.articleId">
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
		        <view v-show="current === 1" class="aa">
		              <scroll-view scroll-x="true" class="options-tab"  >
		            	
					</scroll-view>
					<you-scroll ref="scroll" @onPullDown="onPullDowntwo"  @onLoadMore="onLoadMoretwo">
						 
							<view class="blog-content" @click="intoArticle(article.articleId)" v-for="article in articleD " :key="article.articleId">
								 <view class="article-title">{{article.articleTitle}}</view>
								
								<view class="image">
												<image  class="img" :src="article.articleImg"></image>
											</view>
								<view class="blog-info">
												<view class="info-time"><image class="info-image" src="../../static/img/time.png"></image>{{article.articleUpdateTime}}</view>
												<view class="info-time"> <image class="info-image" src="../../static/img/fangke.png"></image>{{article.articleViewCount}}</view>
												<view class="info-time"><image class="info-image" src="../../static/img/dianzan.png"></image>{{article.articleLikeCount}}</view>
												<view class="info-time"><image class="info-image" src="../../static/img/pinglun.png"></image>{{article.articleCommentCount}}</view>
											</view>
							</view>
							
							
						
						
					</you-scroll>
					
		        </view>
		      
		    </view>
		</view>
		
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	 import youScroll from "@/components/you-scroll.vue"
	 import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed:mapState(['forcedLogin','hasLogin','session_key']),//对全局变量监控
		data() {
			return {
				items: ['我的收藏','我的点赞'],
				current: 0,
				
				articleCollections:[],
				articleD:[],
				pageNum:0,
				isLoading:true,
				isrefresh:true,
				pageNumtwo:0,
				isLoadingtwo:true,
				isrefreshtwo:true,
				
				
				
			}
		},
		components:{
			
			uniSegmentedControl,
			youScroll
		},
		onLoad() {
			this.pageNum=0;
			this.pageNumtwo=0;
			this.loadingCollection();
		},
		methods: {
			...mapMutations(['articleids']),
			intoArticle(id){
				this.articleids(id);
				uni.navigateTo({
				
					url:"../article/article"
				})
				},
			loadingCollection(){
				this.pageNum++;
				
				
				uni.request({
						url: 'http://localhost:8081/blog/index/me/loadingCollectionArticle', //仅为示例，并非真实接口地址。
						data: {
							pageNum: this.pageNum,
							pageSize:5,
							session_key:this.session_key
						},
						
						success: (res) => {
							console.log(res.data);
							this.articleCollections = res.data.list;
							if(res.data.list.length<5){
								 this.isLoading=false;
									 											 
							}
						},
						fail(res) {
							
						}
					});
				
			},
			loadingD(){
				this.pageNumtwo++;
					uni.request({
						url: 'http://localhost:8081/blog/index/me/loadingDArticle', //仅为示例，并非真实接口地址。
						data: {
							pageNum: this.pageNumtwo,
							pageSize:5,
							session_key:this.session_key
						},
						
						success: (res) => {
							console.log(res.data);
							this.articleD = res.data.list;
							if(res.data.list.length<5){
								 this.isLoadingtwo=false;
									 											 
							}
						},
						fail(res) {
							
						}
					});
				
			},
			
			onClickItem(index) {
			    
				
				 if (this.current !== index) {
			        this.current = index;
					if(index==0){
						
					}else if(index==1){
						this.$options.methods.loadingD.bind(this)();
					}
			    } 
			},
		
		onPullDown(done){
			 this.isLoading=true;
			 this.isrefresh=true;
			  this.pageNum=1;
			uni.request({
					url: 'http://localhost:8081/blog/index/me/loadingCollectionArticle', 
					data: {
						pageNum: this.pageNum,
						pageSize:5,
						session_key:this.session_key
					},
					
					success: (res) => {
						console.log(res.data);
						this.articleCollections = res.data.list;
					}
				});
			  done();
			
		},
		onPullDowntwo(done){
			 this.isLoadingtwo=true;
			 this.isrefreshtwo=true;
			  this.pageNumtwo=1;
			uni.request({
					url: 'http://localhost:8081/blog/index/me/loadingDArticle', 
					data: {
						pageNum: this.pageNumtwo,
						pageSize:5,
						session_key:this.session_key
					},
					
					success: (res) => {
						console.log(res.data);
						this.articleD = res.data.list;
					}
				});
			  done();
			
		},
		 onLoadMore(e) {
					   var _this=this;
						
						if(_this.isrefresh==true){
							
							if(_this.isLoading==true){
							console.log("7777777777777777777")
							_this.isrefresh=false;
							_this.pageNum++;
							console.log(_this.pageNum+"页面")
								uni.showLoading({
									title: '加载中'
										});
								uni.request({
									url: 'http://localhost:8081/blog/index/me/loadingCollectionArticle', //仅为示例，并非真实接口地址。
									data: {
										pageNum: this.pageNum,
										pageSize:5,
										session_key:this.session_key
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
											_this.articleCollections.push(article[i]);
											
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
		  onLoadMoretwo(e) {
		 					   var _this=this;
		 						
		 						if(_this.isrefreshtwo==true){
		 							
		 							if(_this.isLoadingtwo==true){
		 							console.log("7777777777777777777")
		 							_this.isrefreshtwo=false;
		 							_this.pageNumtwo++;
									console.log(_this.pageNumtwo+"加载的pagenum");
		 								uni.showLoading({
		 									title: '加载中'
		 										});
		 								uni.request({
		 									url: 'http://localhost:8081/blog/index/me/loadingDArticle', //仅为示例，并非真实接口地址。
		 									data: {
		 										pageNum: _this.pageNumtwo,
		 										pageSize:5,
		 										session_key:this.session_key
		 									},
		 									
		 									success: (res) => {
		 										
		 										  var article = res.data.list;
		 										  _this.isrefreshtwo=true;
												  console.log(article.length+"文章长度")
		 										  if(article.length<5){
		 											  this.isLoadingtwo=false;
		 											 
		 													  }
		 											
		 										  
		 										for(let i =0; i<article.length;i++){
		 											_this.articleD.push(article[i]);
		 											
		 										}
		 										
		 										
		 										
		 										 uni.hideLoading();
		 									},
		 									fail: (res) => {
		 										_this.isrefreshtwo=true;
		 									}
		 								});
		 								}else{
											console.log("不加载了")
		 									setTimeout(function(){
		 										uni.showToast({
		 											title: '没有更多文章了',
		 											
		 											duration: 1000
		 											});
		 											_this.isrefreshtwo=false;
		 										
		 									},500)
		 									
		 								}
		 						}
		 },
			
		}
	}
</script>

<style>
	@import url("shoucang.css");
</style>
