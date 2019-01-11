import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import ClassesPage from '@/pages/ClassesPage'
import ClassPage from '@/pages/ClassPage'
import ModulePage from '@/pages/ModulePage'

import AuthGuard from './auth-guard'

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
      component: ClassesPage,
      beforeEnter: AuthGuard
    },
    {
      path: '/turma/:id',
      name: 'ClassPage',
      props: true,
      component: ClassPage,
      beforeEnter: AuthGuard
    },
    {
      path: '/modulo/:id',
      name: 'ModulePage',
      props: true,
      component: ModulePage,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
