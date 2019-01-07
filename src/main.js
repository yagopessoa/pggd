// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'

import { store } from './store'
import * as firebase from 'firebase'

import AlertCmp from './components/Alert.vue'

Vue.config.productionTip = false
Vue.use(Vuetify,
  {
    theme: {
      primary: '#354A5F',
      secondary: '#495C6F',
      accent: '#F1CD36',
      error: '#FF5252',
      info: '#1E2264',
      success: '#4CAF50',
      warning: '#FFC107'
    }
  }
)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCsQZTZjS-yvYpK1OeADfXv2KHx_l17fx8',
      authDomain: 'pggd-7f3cb.firebaseapp.com',
      databaseURL: 'https://pggd-7f3cb.firebaseio.com',
      projectId: 'pggd-7f3cb',
      storageBucket: 'pggd-7f3cb.appspot.com'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref('users/' + user.uid).once('value')
          .then(snapshot => {
            const data = snapshot.val()
            const newUser = {
              id: user.uid,
              email: user.email,
              name: data.name,
              bornAt: data.bornAt,
              isTeacher: data.isTeacher
            }
            this.$store.dispatch('autoSignin', newUser)
            this.$store.dispatch('loadClasses')
          })
          .catch(error => { console.log(error) })
      }
    })
  }
})
