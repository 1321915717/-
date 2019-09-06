<template>
	<view class="page">
		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/img/search_128px_1223096_easyicon.net.png" class="search-ico" ></image>
				
			</view>
			
			<input placeholder="搜索你感兴趣的文章"  maxlength="10" class="search-text" id="sousuo" v-model="words" @confirm="allatcicle">
		</view>
		
		 <view  class="list-box">
        <uni-segmented-control class="tabs" :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#008B8B"></uni-segmented-control>
        <view class="content">
            <view v-show="current === 0" class="aa">
				 <you-scroll ref="scroll" @onPullDown="onPullDown" @ceshi="ceshi" @onLoadMore="onLoadMore">
					 
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
            <view v-show="current === 1" class="aa">
                  <scroll-view scroll-x="true" class="options-tab"  >
                	<view class="small-tab" @click="allatcicletwo('article_view_count')"    :class="findtype=='article_view_count' ? 'tagactive' : '' " >
                		浏览最多
                	</view>
                	<view class="small-tab" @click="allatcicletwo('article_comment_count')" :class="findtype=='article_comment_count' ? 'tagactive' : '' "  >
                		评论最多
                	</view>
					<view class="small-tab" @click="allatcicletwo('article_give_count')" :class="findtype=='article_give_count' ? 'tagactive' : '' " >
						点赞最多
					</view>
					<view class="small-tab" @click="allatcicletwo('article_like_count')" :class="findtype=='article_like_count' ? 'tagactive' : '' " >
						收藏最多
					</view>  
				</scroll-view>
				<you-scroll ref="scroll" @onPullDown="onPullDowntwo" @ceshi="ceshi" @onLoadMore="onLoadMoretwo">
					 
						<view class="blog-content" @click="intoArticle(article.articleId)" v-for="article in articlestwo " :key="article.articleId">
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
            <view v-show="current === 2" class="aa">
               <scroll-view scroll-x="true" class="options-tab"  >
               	
               	<view class="small-tab" v-for="tag in tags" :key="tag.tagId" @click="allatciclethree(tag.tagId)" :class="[tagid==tag.tagId ? 'tagactive' : '']">
               		{{tag.tagName}}
               	</view>
               	
				
               </scroll-view>
				<you-scroll ref="scroll" @onPullDown="onPullDownthree" @onLoadMore="onLoadMorethree">
					 
						<view class="blog-content" @click="intoArticle(article.articleId)" v-for="article in articlesthree " :key="article.articleId">
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
		computed: mapState(['forcedLogin','hasLogin','nickName','session_key','token','avatarUrl','articleid']), //对全局变量监控
		components: {
					uniSegmentedControl,
					youScroll
					
					},
		data() {
			return {
			items: ['最新','热门','推荐'],
            current: 0,
			//以上是分段器的数据
			articles:[],
			articlestwo:[],
			pageNum:0,
			pageNumtwo:0,
			isrefresh:true,
			toltal:0,  //文章1总数
			isLoading:true,
			isLoadingtwo:true,
			isrefreshtwo:true,
			toltaltwo:0,  //文章2总数
			isLoadingtow:true,
			findtype:'article_view_count',
			tagid:0,
			isLoadingthree:true,
			isrefreshthree:true,
			toltalthree:0,  //文章3总数
			articlesthree:[],
			pageNumthree:0,
			tags:[],
			words:''
			}
			
		},
		onLoad() {
				this.islogin();
				this.allatcicle();
			//	this.allatcicletwo('article_view_count');
			
		},
		
		methods: {
			sousou(){
				console.log("搜索")
				
				
			},
			onPullDown(done) {
				 this.isLoading=true;
				 this.isrefresh=true;
				  this.pageNum=1;
				uni.request({
						url: 'http://localhost:8081/blog/index/allArticle', 
						data: {
							pageNum: this.pageNum,
							pageSize:5,
							words:'',
						},
						
						success: (res) => {
							console.log(res.data);
							this.articles = res.data.list;
						}
					});
				  done();

            },
			onPullDowntwo(done) {
				 this.isLoadingtwo=true;
				 this.isrefreshtwo=true;
				  this.pageNumtwo=1;
				uni.request({
						url: 'http://localhost:8081/blog/index/allArticleByCount', 
						data: {
							pageNum: this.pageNumtwo,
							pageSize:5,
							words:'',
							findtype:this.findtype,
						},
						
						success: (res) => {
							console.log(res.data);
							this.articlestwo = res.data.list;
						}
					});
				  done();
			
			},
			onPullDownthree(done) {
				 this.isLoadingthree=true;
				 this.isrefreshthree=true;
				  this.pageNumthree=1;
				uni.request({
						url: 'http://localhost:8081/blog/index/allArticleByTag', 
						data: {
							pageNum: this.pageNumthree,
							pageSize:5,
							words:'',
							tagid:this.tagid
						},
						
						success: (res) => {
							console.log(res.data);
							this.articlesthree = res.data.list;
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
						uni.showLoading({
							title: '加载中'
								});
						uni.request({
							url: 'http://localhost:8081/blog/index/allArticle', //仅为示例，并非真实接口地址。
							data: {
								pageNum: _this.pageNum,
								pageSize:5,
								words:'',
							},
							
							success: (res) => {
								
								  var article = res.data.list;
								  _this.isrefresh=true;
								  if(article.length<5){
									  _this.isLoading=false;
									 
											  }
									
								  
								for(let i =0; i<article.length;i++){
									_this.articles.push(article[i]);
									 console.log("********/////////////")
									 console.log(article[i]);
								}
								
								
								console.log(res.data);
								 uni.hideLoading();
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
			
			...mapMutations(['login','articleids']),
			toMain(user){
				this.login(user)
			},
			islogin(){
				var _this=this;
					if(!this.hasLogin){
					uni.showModal({
						title:'请先授权',
						content:'您未授权,需要授权后才能继续',
						showCancel:!this.forcedLogin,
						success:(res)=>{
							if(res.confirm){
								if(!this.forcedLogin){
									uni.login({
										provider: 'weixin',
										success: function(loginRes) {
											console.log('-------获取code-------')
											console.log(loginRes.code);
											
											wx.getUserInfo({
												success:function  (res) {
													console.log(res)
													wx.request({
														url: 'http://localhost:8081/blog/index/login/weixinLogin',
														data:{
															rawData:res.rawData,
															code:loginRes.code,
															encryptedData:res.encryptedData,
															iv:res.iv
															
														},
														success: function(info) {
															console.log('-------获取sessionKey、openid(unionid)-------')
															console.log(info)
															var infos=info.data.userInfo;
															var user = new Object();
															user.nickName=infos.nickName;
															user.avatarUrl=infos.avatarUrl;
															user.session_key=infos.session_key;
															user.token='';
															user.session_key=infos.session_key;
															_this.toMain(user);
															
															
															
														},
														fail: function(e) {
															console.log(e)
														}
													})
													
												} 
													
												
											})
										}
										});
								}else {
									console.log("证明登陆了");
								}
								
								
							}else {
								console.log("取消了按钮");
								this.islogin();
							}
							
							
						}
						
					})
					
				}
			},
			
		
			 onLoadMoretwo(e) {
						   var _this=this;
							
							if(_this.isrefreshtwo==true){
								
								if(_this.isLoadingtwo==true){
								console.log("7777777777777777777")
								_this.isrefreshtwo=false;
								_this.pageNumtwo++;
									uni.showLoading({
										title: '加载中'
											});
									uni.request({
										url: 'http://localhost:8081/blog/index/allArticleByCount', //仅为示例，并非真实接口地址。
										data: {
											pageNum: this.pageNumtwo,
											pageSize:5,
											words:'',
											findtype:_this.findtype
										},
										
										success: (res) => {
											
											  var article = res.data.list;
											  _this.isrefreshtwo=true;
											  if(article.length<5){
												  _this.isLoadingtwo=false;
												 
														  }
												
											  
											for(let i =0; i<article.length;i++){
												_this.articlestwo.push(article[i]);
												 console.log("********/////////////")
												 console.log(article[i]);
											}
											
											
											console.log(res.data);
											 uni.hideLoading();
										},
										fail: (res) => {
											_this.isrefreshtwo=true;
										}
									});
									}else{
										setTimeout(function(){
											uni.showToast({
												title: '没有更多文章了',
												image:'../../static/img/fail.png',
												duration: 1000
												});
												_this.isrefreshtwo=false;
											
										},500)
										
									}
							}
			 },
			 onLoadMorethree(e) {
				 console.log("3进来了")
			 						   var _this=this;
			 							
			 							if(_this.isrefreshthree==true){
			 								
			 								if(_this.isLoadingthree==true){
			 								console.log("7777777777777777777")
			 								_this.isrefreshthree=false;
			 								_this.pageNumthree++;
			 									uni.showLoading({
			 										title: '加载中'
			 											});
			 									uni.request({
			 										url: 'http://localhost:8081/blog/index/allArticleByTag', //仅为示例，并非真实接口地址。
			 										data: {
			 											pageNum: this.pageNumthree,
														pageSize:5,
							
														tagid:this.tagid
			 										},
			 										
			 										success: (res) => {
			 											
			 											  var article = res.data.list;
			 											  _this.isrefreshthree=true;
			 											  if(article.length<5){
			 												  _this.isLoadingthree=false;
			 												 
			 														  }
			 												
			 											  
			 											for(let i =0; i<article.length;i++){
			 												_this.articlesthree.push(article[i]);
			 												 console.log("********/////////////")
			 												 console.log(article[i]);
			 											}
			 											
			 											
			 											console.log(res.data);
			 											 uni.hideLoading();
			 										},
			 										fail: (res) => {
			 											_this.isrefreshthree=true;
			 										}
			 									});
			 									}else{
			 										setTimeout(function(){
			 											uni.showToast({
			 												title: '没有更多文章了',
			 												image:'../../static/img/fail.png',
			 												duration: 1000
			 												});
			 												_this.isrefreshthree=false;
			 											
			 										},500)
			 										
			 									}
			 							}
			 },
		
		
		onClickItem(index) {
            
			
			 if (this.current !== index) {
                this.current = index;
				if(index==0){
					console.log(0);
				}else if(index==1){
					this.$options.methods.allatcicletwo.bind(this)('article_view_count');
				}else if(index==2){
					console.log(2);
					this.$options.methods.loadingTag.bind(this)();
					this.$options.methods.allatciclethree.bind(this)(1);  //1代表数据库tag表的第一条数据 
					
				}
            } 
		},
		
		//以上是分段器方法
		
		intoArticle(id){
			this.articleids(id);
			uni.navigateTo({
			
				url:"../article/article"
			})
			
			
		},
		
		
		allatcicle(){
			this.pageNum++;
			this.current=0;
			
			console.log("pageNum的值为"+this.pageNum)
				uni.request({
						url: 'http://localhost:8081/blog/index/allArticle', //仅为示例，并非真实接口地址。
						data: {
							pageNum: this.pageNum,
							pageSize:5,
							words:this.words,
						},
						
						success: (res) => {
							console.log(res.data);
							this.articles = res.data.list;
							
						},
						fail(res) {
							
						}
					});
					
				this.words='';
			
		},
		allatcicletwo(findtype){
			this.pageNumtwo=0;
			this.pageNumtwo++;
			this.findtype=findtype;
			this.isLoadingtwo=true;
			this.isrefreshtwo=true;
			console.log("pageNum的值为"+this.pageNumtwo)
				uni.request({
						url: 'http://localhost:8081/blog/index/allArticleByCount', //仅为示例，并非真实接口地址。
						data: {
							pageNum: this.pageNumtwo,
							pageSize:5,
							words:'',
							findtype:findtype,
						},
						
						success: (res) => {
							console.log(res.data);
							this.articlestwo = res.data.list;
						}
					});
					
				
			
		},
		allatciclethree(tagid){
			this.tagid=tagid;
			this.pageNumthree=0;
			this.pageNumthree++;
			
			this.isLoadingthree=true;
			this.isrefreshthree=true;
			console.log("pageNum的值为"+this.pageNumthree)
				uni.request({
						url: 'http://localhost:8081/blog/index/allArticleByTag', //仅为示例，并非真实接口地址。
						data: {
							pageNum: this.pageNumthree,
							pageSize:5,
							
							tagid:tagid
							
						},
						
						success: (res) => {
							console.log(res.data);
							this.articlesthree = res.data.list;
						}
					});
					
				
			
		},
		
		loadingTag(){
				uni.request({
					url: 'http://localhost:8081/blog/index/loadingTag', //仅为示例，并非真实接口地址。
					
					success: (res) => {
						console.log(res.data);
						this.tags = res.data;
					}
				});
			
		}

		
      
	
	},

	
	}
</script>

<style>
	
	@import url("index.css");
	
</style>
