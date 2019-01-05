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
    setLoading (state) {
      state.loading = !state.loading
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
      commit('setLoading')
      commit('clearError')
      firebase.database().ref('classes').once('value')
        .then(data => {
          const classes = []
          const obj = data.val()
          for (let key in obj) {
            classes.push({
              id: key,
              title: obj[key].title,
              teacher: obj[key].teacher
            })
          }
          console.log('Classes loaded =>', classes)
          commit('setLoadedClasses', classes)
          commit('setLoading')
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading')
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
          }
        ).catch(error => {
          console.log(error)
          commit('setLoading')
          commit('setError', error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading')
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
            commit('setLoading')
          }
        ).catch(error => {
          console.log(error)
          commit('setLoading')
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
          const key = data.key
          commit('addClass', {
            ...newClass,
            id: key
          })
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
