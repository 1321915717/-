<template>
	<view class="page">
		<view class="options" @click="intoarticles(c.categoryId)" v-for=" c in categorys" :key="c.categoryId" >
			
			<view class="title"><view class="yuandian"></view>{{c.categoryName}}</view>
			<view class="detils">{{c.categoryDescription}}</view>
		</view>
		
		
		
	</view>
</template>

<script>
	 import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: mapState(['optionid']), //对全局变量监控
		data() {
			return {
				categorys:[],
				
			}
		},
		onLoad() {
			this.loadingOptions();
			
		},
		methods: {
			...mapMutations(['optionids']),
			intoarticles(categoryid){
				this.optionids(categoryid);
				
				uni.navigateTo({
					url:"../articles/articles"
				})
				
			},
			loadingOptions(){
				
				uni.request({
						url: 'http://localhost:8081/blog/index/option/loadOptions', //仅为示例，并非真实接口地址。
						
						success: (res) => {
							console.log(res.data);
							this.categorys = res.data;
							
						},
						fail(res) {
							
						}
					});
				
				
			}
		},
		
	
	}
</script>

<style>
@import url("options.css");
</style>
