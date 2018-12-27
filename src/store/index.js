import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    loading: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state) {
      state.loading = !state.loading
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            console.log('Cadastrou:', user.user)
            const newUser = {
              id: user.user.uid,
              email: user.user.email
            }
            commit('setUser', newUser)
          }
        ).catch(err => {
          console.log(err)
          commit('setLoading')
        })
    },
    signUserIn ({commit}, payload) {
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
        ).catch(err => {
          console.log(err)
          commit('setLoading')
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    }
  }
})
