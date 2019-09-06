import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({//全局变量定义
    state: {
        forcedLogin: false,//是否需要强制登录
        hasLogin: false,
        nickName: "",
        session_key:'',
        token:'',
		user_id:-1,
        avatarUrl:'',
		articleid:-1,
		optionid:-1
		
    },
    mutations: {
        login(state, user) {
			console.log("vuex")
            state.nickName = user.nickName || '';
            state.hasLogin = true;
            state.session_key = user.session_key || '';
            state.token = user.token || '';
            state.avatarUrl = user.avatarUrl || '';
			state.user_id=user.user_id || -1;
			
        },
		articleids(state,id){
			
			state.articleid=id;
			
		},
		optionids(state,id){
			state.optionid=id;
			
		},
        logout(state) {
           state.nickName = "";
           state.hasLogin = false;
           state.session_key = '';
           state.token = '';
           state.avatarUrl = '';
		   state.user_id=-1;
        }
    }
})
export default store