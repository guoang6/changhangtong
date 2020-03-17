import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import contentexamine from '../views/examine/contentexamine.vue'
import useruser from '../views/user/useruser.vue'
import managementlable from '../views/management/managementlable.vue'





Vue.use(VueRouter)

const routes = [
  {path: '/',name: 'main',component: main ,children: [
    { path: '/contentexamine', name: 'contentexamine', component: contentexamine, },
    { path: '/useruser', name: 'useruser', component: useruser, },
    { path: '/managementlable', name: 'managementlable', component: managementlable, },

  ]
}
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
