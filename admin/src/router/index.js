import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import login from '../views/login.vue'
import contentexamine from '../views/examine/contentexamine.vue'
import useruser from '../views/user/useruser.vue'
import carousel from '../views/management/carousel.vue'
import managementlable from '../views/management/managementlable.vue'
import numbering from '../views/numbering/numbering.vue'
Vue.use(VueRouter)

const routes = [
  {path: '/login',name: 'login',component: login ,meta:{ispublic:true}},
  {path: '/',name: 'main',component: main ,children: [
    { path: '', name: 'numbering', component: numbering, },
    { path: 'contentexamine', name: 'contentexamine', component: contentexamine, },
    { path: 'useruser', name: 'useruser', component: useruser, },
    { path: 'managementlable', name: 'managementlable', component: managementlable, },
    { path: 'carousel', name: 'carousel', component: carousel, },


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
router.beforeEach((to,Form,next)=>{
  // console.log(to)
  if(!to.meta.ispublic&&!localStorage.admin_jwt_token){
    return next('/login')
  }
  next()
})
export default router
