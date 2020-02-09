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
//导入时间插件
import moment from 'moment';
//定义全局时间过滤器
Vue.filter('dataFormat',function (datastr,pattern="YYYY-MM-DD HH:mm"){
  return moment(datastr).format(pattern)
})
Vue.config.productionTip = false 
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
//请求头添加token
let token = window.sessionStorage.getItem('luffy_jwt_token');
axios.defaults.headers.common.Authorization =`Bearer ${token}`;
//vue2中使用axios，我们请求的参数仍为json类型，是并没有序列化的。我们需要使用querystring解决该问题
import qs from 'qs';
Vue.prototype.qs = qs;

//添加一个请求拦截器
// axios.interceptors.request.use(function (config) {
//   let luffy_jwt_token = JSON.parse(window.localStorage.getItem('luffy_jwt_token'));
//   let token
//   if (luffy_jwt_token) {
//     token = luffy_jwt_token;
//     config.headers.Authorization =`Bearer ${token}`;
//   }else{
//     config.headers.Authorization ='';
//   }
//   console.dir(config);
//   return config;
// }, function (error) {
//   // Do something with request error
//   console.info("error: ");
//   console.info(error);
//   return Promise.reject(error);
// });

// // 添加一个响应拦截器
// axios.interceptors.response.use(function (response) {
//   if (response.data && response.data.code) {
//     if (parseInt(response.data.code) === 108 || parseInt(response.data.code) === 109 || response.data.msg === 'TOKEN失效，请重新登录' || response.data.msg === 'TOKEN不存在') {
//       //未登录
//       response.data.msg = "登录信息已失效，请重新登录";
//       road.$message.error(response.data.msg);
//       // routerIndex.push('/login');
//     }
//     if (parseInt(response.data.code) === -1) {
//       road.$message.error("请求失败");
//     }
//   }
//   return response;
// }, function (error) {
//   // Do something with response error
//   console.dir(error);
//   road.$message.error("服务器连接失败");
//   return Promise.reject(error);
// })


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
