import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import home from "../views/home.vue"
import adminindex from "../views/webadmin/adminindex.vue"
import adminhome from "../views/webadmin/adminhome.vue"
import createhelp from "../views/webadmin/help/createhelp.vue"
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'index', redirect: '/home', component: index, },
  {
    path: '/index', name: 'index', component: index, redirect: '/home', children: [
      { path: '*', redirect: '/home', },
      { path: '/home', name: 'home', component: home },
      // { path: '/admin', name: 'adminindex', component: adminindex },
      {
        path: '/admin', name: 'adminindex',  component: adminindex, children: [
          // { path: '*', redirect: 'admin/home', },
          { path: '/admin/home', name: 'adminhome', component: adminhome },
          { path: '/admin/createhelp', name: 'createhelp', component: createhelp },
        ]
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
