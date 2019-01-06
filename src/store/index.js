import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: () => ({
    user: null,
    loading: false,
    error: null,
    classes: []
  }),
  mutations: {
    setLoadedClasses (state, payload) {
      state.classes = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    addClass (state, payload) {
      state.classes.push(payload)
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadClasses ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.database().ref('classes').on('value', data => {
        const classes = []
        const obj = data.val()
        for (let key in obj) {
          classes.push({
            id: key,
            title: obj[key].title,
            teacher: obj[key].teacher
          })
        }
        /* console.log('Classes loaded =>', classes) */
        commit('setLoadedClasses', classes)
        commit('setLoading', false)
      }, error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            console.log('Cadastrou:', user.user)
            const newUser = {
              id: user.user.uid,
              email: user.user.email,
              isTeacher: true
            }
            commit('setUser', newUser)
            commit('setLoading', false)
          }
        ).catch(error => {
          console.log(error)
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            console.log('Logou:', user.user)
            const newUser = {
              id: user.user.uid,
              email: user.user.email
            }
            commit('setUser', newUser)
            commit('setLoading', false)
          }
        ).catch(error => {
          console.log(error)
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    autoSignin ({commit}, payload) {
      commit('setUser', {id: payload.uid, email: payload.email})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/')
    },
    createClass ({commit}, payload) {
      const newClass = {
        title: payload.title,
        teacher: payload.teacher
      }
      firebase.database().ref('classes').push(newClass)
        .then((data) => {
          console.log('Class created =>', data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    classes (state) {
      return state.classes
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
