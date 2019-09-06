<script>
	export default {
		
		onLaunch: function() {
			/* console.log('App Launch')
			let userInfo =uni.getStorageInfoSync('userInfo')||'';
			if(userInfo.id){
				
				//更新登录状态
				uni.getSetting({
					key:'userInfo',
					success:(res)=>{
						this.login(res.data);
					}
				})
			} */
		},
		onLoad:function(){
			
		
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.page{
		 width: 100%;
		 height: 100%;
		 background-color: #f7f7f7;
		 position: absolute;
		 
			
			 }
</style>
