import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import home from "../views/home.vue"
import help from "../views//help.vue"
import news from '../views/news.vue'
import job from "../views/job.vue"
import activity from "../views/activity.vue"
import helpcontent from "../views/content/helpcontent.vue"

import adminindex from "../views/webadmin/adminindex.vue"
import adminhome from "../views/webadmin/adminhome.vue"
import createhelp from "../views/webadmin/help/createhelp.vue"
import createhelplist from "../views/webadmin/help/createhelplist.vue"
import createactivity from "../views/webadmin/activity/createactivity.vue"
import createactivitylist from "../views/webadmin/activity/createactivitylist.vue"
import company from "../views/webadmin/job/company.vue"
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'index', redirect: '/home', component: index, meta:{ispublic:true}},
  {
    path: '/index', name: 'index', component: index, redirect: '/home',meta:{ispublic:true}, children: [
      { path: '*', redirect: '/home', },
      { path: '/home', name: 'home', component: home, meta:{ispublic:true}},
      { path: '/help', name: 'help', component: help, meta:{ispublic:true}},
      { path: '/helpcontent/:id', name: 'helpcontent', component: helpcontent,props:true, meta:{ispublic:true}},

      { path: '/news', name: 'news', component: news, meta:{ispublic:true}},
      { path: '/job', name: 'job', component: job, meta:{ispublic:true}},
      { path: '/activity', name: 'activity', component: activity, meta:{ispublic:true}},
      // { path: '/admin', name: 'adminindex', component: adminindex },
      {
        path: '/admin', name: 'adminindex',  component: adminindex, children: [
          // { path: '*', redirect: 'admin/home', },
          { path: '/admin/home', name: 'adminhome', component: adminhome },
          { path: '/admin/createhelp', name: 'createhelp', component: createhelp },
          { path: '/admin/updatehelp/:id', name: 'createhelp', component: createhelp ,props:true},
          { path: '/admin/createhelplist', name: 'createhelplist', component: createhelplist },
          { path: '/admin/updateactivity/:id', name: 'updateactivity', component: createactivity ,props:true},
          { path: '/admin/createactivitylist', name: 'createactivitylist', component: createactivitylist },
          { path: '/admin/createactivity', name: 'createactivity', component: createactivity },
          { path: '/admin/company', name: 'company', component: company },
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
