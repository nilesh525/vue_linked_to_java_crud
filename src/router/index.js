import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '../views/register.vue'
import login from '../views/login.vue'
import employee from '@/components/EmployeeList.vue'
import forgotpass from "@/views/forgotpass.vue";
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'register',
    component:register
  },
  {
    path:'/register',
    name:'register',
    component:register
  },
  {
    path:'/login',
    name:'login',
    component:login
  },
  {
    path:'/employees',
    name:'EmployeeList',
    component:employee
  },
  {
    path:'/logout',
    name:'logout',
    component:register,
    meta:{
      log:"logout"
    },
  },
  {
    path:'/forgotpass',
    name:'forgotpass',
    component:forgotpass
  },
  // {
  //   path:'/hitfacebook',
  //   name:'hitfacebook',
  //   component:employee
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router