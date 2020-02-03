import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import home from "../views/home.vue"
import adminhome from "../views/webadmin/adminhome.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect:'/home',
    component: index,
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    redirect:'/home',
    children: [
      {
        path: '*',
        redirect:'/home',
        },
      {
        path: '/home',
        name: 'home',
        component: home  
      } ,
      {
        path: '/adminhome',
        name: 'adminhome',
        component: adminhome  
      } 
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
