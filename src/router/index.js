import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import ClassesPage from '@/pages/ClassesPage'

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
      path: '/turmas',
      name: 'ClassesPage',
      component: ClassesPage
    }
  ],
  mode: 'history'
})
