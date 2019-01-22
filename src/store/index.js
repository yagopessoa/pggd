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
    classes: [],
    loadedClass: null
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
    setLoadedClass (state, payload) {
      state.loadedClass = payload
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
      firebase.database().ref('classes/' + this.getters.user.id).on('value', data => {
        const classes = []
        const obj = data.val()
        for (let key in obj) {
          firebase.database().ref('global-classes/' + key).once('value')
            .then(snapshot => {
              const globalClass = snapshot.val()
              if (globalClass) {
                classes.push({
                  id: key,
                  title: obj[key].title,
                  teacher: obj[key].teacher,
                  modules: obj[key].modules,
                  accessKey: globalClass.id
                })
              } else {
                classes.push({
                  id: key,
                  title: obj[key].title,
                  teacher: obj[key].teacher,
                  modules: obj[key].modules
                })
              }
            })
        }
        console.log('Classes loaded =>', classes)
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
              name: payload.name,
              bornAt: payload.bornAt,
              isTeacher: payload.isTeacher
            }
            firebase.database().ref('users/' + newUser.id).set({
              name: newUser.name,
              bornAt: newUser.bornAt,
              isTeacher: newUser.isTeacher
            }).then(function () {
              commit('setUser', newUser)
              commit('setLoading', false)
            }).catch(error => {
              console.log(error)
              commit('setLoading', false)
              commit('setError', error)
            })
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
            firebase.database().ref('users/' + user.user.uid).once('value')
              .then(snapshot => {
                const data = snapshot.val()
                const newUser = {
                  id: user.user.uid,
                  email: user.user.email,
                  name: data.name,
                  bornAt: data.bornAt,
                  isTeacher: data.isTeacher
                }
                console.log('User:', newUser)
                commit('setUser', newUser)
                commit('setLoading', false)
              })
              .catch(error => {
                console.log(error)
                commit('setLoading', false)
                commit('setError', error)
              })
          }
        ).catch(error => {
          console.log(error)
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    autoSignin ({commit}, payload) {
      commit('setUser', payload)
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/')
    },
    createClass ({commit}, payload) {
      const newClass = { title: payload.title }
      firebase.database().ref('classes/' + payload.teacher).push(newClass)
        .then((data) => {
          console.log('Class created =>', data)
          firebase.database().ref('global-classes').once('value')
            .then(snapshot => {
              const globalClasses = snapshot.val()
              if (globalClasses) {
                let count = 0
                for (let key in globalClasses) {
                  console.log(key)
                  count += 1
                }
                firebase.database().ref('global-classes/' + data.key).set({id: count + 1})
              } else {
                firebase.database().ref('global-classes/' + data.key).set({id: 1})
              }
            })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadClass ({commit}, payload) {
      commit('setLoadedClass', payload.id)
    },
    createModule ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const newModule = { title: payload.title, doubts: [] }
      firebase.database().ref('classes/' + payload.teacher + '/' + payload.classId + '/modules').push(newModule)
        .then((data) => {
          console.log('Module created =>', data)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setError', error)
          commit('setLoading', false)
        })
    },
    createDoubt ({commit}, payload) {
      commit('clearError')
      const newDoubt = { title: payload.title, doubt: payload.doubt, author: payload.author, votes: [] }
      firebase.database().ref('classes/' + payload.teacher + '/' + payload.classId + '/modules/' + payload.moduleId + '/doubts').push(newDoubt)
        .then((data) => {
          console.log('Doubt created =>', data)
        })
        .catch((error) => {
          console.log(error)
          commit('setError', error)
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
    },
    loadedClass (state) {
      return classId => {
        /* INVESTIGAR PQ AS TURMAS SOMEM QUANDO CRIA UM NOVO MÓDULO */
        console.log('Classes:', state.classes)
        const obj = state.classes.find(item => {
          return item.id === classId
        })
        console.log('Class:', obj)
        const modules = []
        for (let key in obj.modules) {
          modules.push({
            id: key,
            title: obj.modules[key].title,
            doubts: []
          })
        }
        const loaded = {id: classId, title: obj.title, teacher: obj.teacher, modules: modules, accessKey: obj.accessKey}
        return loaded
      }
    },
    loadedModule (state) {
      return moduleId => {
        console.log(state.loadedClass)
        const obj = state.loadedClass.modules.find(item => {
          return item.id === moduleId
        })
        const doubts = []
        for (let key in obj.doubts) {
          doubts.push({
            id: key,
            title: obj.doubts[key].title,
            doubt: obj.doubts[key].doubt,
            author: obj.doubts[key].author,
            votes: obj.doubts[key].votes
          })
        }
        return {id: moduleId, title: obj.title, doubts: doubts}
      }
    }
  }
})
