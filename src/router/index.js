import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import HomePage from '@/pages/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/cadastro',
      name: 'SignupPage',
      component: SignupPage
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    }
  ],
  mode: 'history'
})
