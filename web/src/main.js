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

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
