import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/blue-skin5152.css'
import './assets/css/bootstrap5152.css'
import './assets/css/green-skin5152.css'
import './assets/css/main5152.css'
import './assets/css/red-skin5152.css'
import './assets/css/responsive5152.css'
import './assets/css/ali.css'
import './plugins/element.js'
//vuex
import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)   
// aiox需要的包
import axios from 'axios'
// axios.defaults.withCredentials = true
//aciox基础url
axios.defaults.baseURL = 'http://127.0.0.1:3000';

// axios.defaults.baseURL = 'http://localhost:8081/';

//将axios写成vue的原型属性
Vue.prototype.$axios = axios;
//为post请求设置默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
//
// const luffy_jwt_token = window.localStorage.getItem('luffy_jwt_token');
// axios.defaults.headers.common['Authorization'] = luffy_jwt_token;

// axios.defaults.headers.common['Authorization'] =`Bearer ${luffy_jwt_token}`;
//vue2中使用axios，我们请求的参数仍为json类型，是并没有序列化的。我们需要使用querystring解决该问题
import qs from 'qs';
Vue.prototype.qs = qs;
Vue.config.productionTip = false

//导入时间插件
import moment from 'moment';


//定义全局时间过滤器
Vue.filter('dataFormat',function (datastr,pattern="YYYY-MM-DD HH:mm"){
  return moment(datastr).format(pattern)
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
