import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import home from "../views/home.vue"
import help from "../views/help.vue"

import adminindex from "../views/webadmin/adminindex.vue"
import adminhome from "../views/webadmin/adminhome.vue"
import createhelp from "../views/webadmin/help/createhelp.vue"
import createhelplist from "../views/webadmin/help/createhelplist.vue"
import createactivity from "../views/webadmin/activity/createactivity.vue"

import { Form } from 'element-ui'
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'index', redirect: '/home', component: index, meta:{ispublic:true}},
  {
    path: '/index', name: 'index', component: index, redirect: '/home',meta:{ispublic:true}, children: [
      { path: '*', redirect: '/home', },
      { path: '/home', name: 'home', component: home, meta:{ispublic:true}},
      { path: '/help', name: 'help', component: help, meta:{ispublic:true}},
      // { path: '/admin', name: 'adminindex', component: adminindex },
      {
        path: '/admin', name: 'adminindex',  component: adminindex, children: [
          // { path: '*', redirect: 'admin/home', },
          { path: '/admin/home', name: 'adminhome', component: adminhome },
          { path: '/admin/createhelp', name: 'createhelp', component: createhelp },
          { path: '/admin/updatehelp/:id', name: 'createhelp', component: createhelp ,props:true},
          { path: '/admin/createhelplist', name: 'createhelplist', component: createhelplist },
          { path: '/admin/createactivity', name: 'createactivity', component: createactivity },
        ]
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,Form,next)=>{
  // console.log(to)
  if(!to.meta.ispublic&&!sessionStorage.luffy_jwt_token){
    return next('/home')
  }
  next()
})
export default router
