import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/Home'
import Register from '../views/Register.vue'
import Login from "../views/Login";
import Home from "../views/Home";
import ForgetPass from "../views/ForgetPass";

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
    path: '/forgetpassword',
    name: 'forgetpassword',
    component: ForgetPass
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router