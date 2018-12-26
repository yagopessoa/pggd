// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
