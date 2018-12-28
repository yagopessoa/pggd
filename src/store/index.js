import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: () => ({
    user: null,
    loading: false,
    error: null,
    classes: [
      {
        id: 'asoidjoas',
        title: 'Matemática',
        teacher: 'aoisdjaoisjda'
      },
      {
        id: 'asoidjoasaAS',
        title: 'Geografia',
        teacher: 'aoisdjaoisjda'
      },
      {
        id: 'asoidjoasZ',
        title: 'História',
        teacher: 'aoisdjaoisjda'
      }
    ]
  }),
  mutations: {
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
