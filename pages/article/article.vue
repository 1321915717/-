<template>
	<view class="page">
	
		<view class="article-title">
			{{article.articleTitle}}
		</view>
		  <scroll-view scroll-x="true" class="options-tab"  >
			<view class="small-tab" v-for="tag in article.tagList" :key="tag.tagId" >
				{{tag.tagName}}
			</view>
			
			
		</scroll-view>
		<view class="blog-info">
			<view class="info-time"><image class="info-image" src="../../static/img/time.png"></image>{{article.articleUpdateTime}}</view>
			<view class="info-time"> <image class="info-image" src="../../static/img/fangke.png"></image>{{article.articleViewCount}}</view>
			<view class="info-time"><image class="info-image" src="../../static/img/dianzan.png"></image>{{article.articleGiveCount}}</view>
			<view class="info-time"><image class="info-image" src="../../static/img/pinglun.png"></image>{{article.articleCommentCount}}</view>
		</view>
		<view class="line"></view>
		
		
	 <div class="content" >
				 <u-parse :content="article.articleContent" @preview="preview" @navigate="navigate" />
				

				
  
		</div> 
		<view class="textbox-Like">
			<view class="textLike" @click="addlike">收藏一下</view>
			<view class="textLike" @click="addgive">点赞</view>
			
		</view>
		
		<view class="line"></view>
		<view class="pinglun">
			
			<view class="pinglun-count">
				<view class="count-logo"> <image class="logo-pinglun" src="../../static/img/dian.png"></image>   </view>
				共{{article.articleCommentCount}}条评论
			</view>
			<view class="lines"></view>
		<view class="user-pinglun" v-for="comment in comments" :key="comment.commentId">
			<view class="user-logo">
				<image class="user-img"  :src="comment.wechatUser.userImg"></image>
				
			</view>
			<view class="username">
				<view>{{comment.wechatUser.userName}}</view>
				<view  class="time"></image>{{comment.commentTime}}  <text class="deletetext" style="float: right;" v-if="comment.wechatUser.userName==nickName" @click="deleteComment(comment.commentId)" >删除</text></view>  
			</view>
			
			<view class="user-content">{{comment.commentContent}}</view>
			
			<view class="blog-info">
				
				<view class="lines"></view>
			</view>
			
		</view>
			
	
		
		</view>
		
		
		
		<view class="buttom"></view>
		
		<view class="add-pinglun">
			<image class="me-img"  :src="avatarUrl"></image>
			<view class="search-block">
				<view class="search-ico-wapper">
					<image src="../../static/img/pinglun.png" class="search-ico" ></image>
					
				</view>
				
				<input placeholder="请留下你的评论"  v-model="commentContent" class="search-text"   >
			</view>
			
			<view class="add-button">
				<button size="mini" type="primary" @click="addComment">发送</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	import uParse from '@/components/gaoyia-parse/parse.vue'
	
	import {
		mapState,
		
	} from 'vuex'
	export default {
		components:{
			uParse
		},
		computed: mapState(['articleid','avatarUrl','session_key','nickName']), //对全局变量监控
		data() {
			return {
				html:'',
				article:'',
				comments:[],
				commentContent:''
			}
		},
		onLoad() {
			uni.request({
				url: 'http://127.0.0.1:8081/blog/index/intoArticle',
				data:{
					id:this.articleid
					
				},
				success: (res) => {
					this.article=res.data
					console.log(res.data);
				}
					
				
			});
			this.loadComment();
		},
		methods: {
			 preview(src, e) { 
      // do something
    },
    navigate(href, e) {
      // do something
    },
	
	loadComment(){
			uni.request({
			url: 'http://127.0.0.1:8081/blog/index/article/loadComment',
			data:{
				id:this.articleid,
				
				
			},
			success: (res) => {
				this.comments=res.data
				console.log("res.data");
				console.log(res)
			}
				
			
		})
		
		
	},
	addComment(){
		if(this.commentContent==''){
		uni.showToast({
			title:'请输入内容',
			image:'../../static/img/fail.png',
			duration:1000
		})
		
		return;
		}
		
			uni.request({
			url: 'http://127.0.0.1:8081/blog/index/article/addComment',
			data:{
				articleId:this.articleid,
				session_key:this.session_key,
				commentContent:this.commentContent
				
				
			},
			success: (res) => {
				uni.showToast({
					title:res.data.msg,
					duration:1000
				});
				this.loadComment();
			},
			fail: (res) => {
				uni.showToast({
					title:res.data.msg,
					image:'../../static/img/fail/png',
					duration:1000
				})
			}
				
			
		});
		this.commentContent='';
		
	},
	deleteComment(commentid){
			uni.request({
			url: 'http://127.0.0.1:8081/blog/index/article/deleteComment',
			data:{
				articleId:this.articleid,
				session_key:this.session_key,
				commentid:commentid
				
				
			},
			success: (res) => {
				uni.showToast({
					title:res.data.msg,
					duration:1000
				});
				this.loadComment();
			},fail: (res) => {
				uni.showToast({
					title:res.data.msg,
					image:'../../static/img/fail/png',
					duration:1000
				})
			}
				
			
		});
		
		
	},
	addlike(){
		uni.request({
			url: 'http://127.0.0.1:8081/blog/index/article/addLike',
			data:{
				articleId:this.articleid,
				session_key:this.session_key,
				
				
				
			},
			success: (res) => {
				uni.showToast({
					title:res.data.msg,
					duration:1000
				});
				this.loadComment();
			},
			fail: (res) => {
				uni.showToast({
					title:'收藏失败',
					image:'../../static/img/fail/png',
					duration:1000
				})
			}
				
			
		});
		
		
	},
	addgive(){
			uni.request({
			url: 'http://127.0.0.1:8081/blog/index/article/addGive',
			data:{
				articleId:this.articleid,
				session_key:this.session_key,
				
				
				
				
			},
			success: (res) => {
				uni.showToast({
					title:res.data.msg,
					duration:1000
				});
				
			},
			fail: (res) => {
				uni.showToast({
					title:'收藏失败',
					image:'../../static/img/fail/png',
					duration:1000
				})
			}
				
			
		});
	}
	
			
		}
	}
</script>

<style >
	
@import url("../../components/gaoyia-parse/parse.css");
 @import url("article.css");

	
</style>
