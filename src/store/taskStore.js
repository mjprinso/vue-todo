import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const taskStore = new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    addTask (state, task) {
      state.tasks.push(task)
      window.localStorage.setItem('vue-Todo', JSON.stringify(state.tasks))
    },
    compTask (state, task) {
      let index = state.tasks.indexOf(task)
      if (index !== -1) {
        state.tasks.splice(index, 1, task)
        window.localStorage.setItem('vue-Todo', JSON.stringify(state.tasks))
      }
    },
    editTask (state, task) {
      let index = state.tasks.indexOf(task)
      if (index !== -1) {
        state.tasks.splice(index, 1, task)
        window.localStorage.setItem('vue-Todo', JSON.stringify(state.tasks))
      }
    },
    deleteTask (state, task) {
      let index = state.tasks.indexOf(task)
      if (index !== -1) {
        state.tasks.splice(index, 1)
        window.localStorage.setItem('vue-Todo', JSON.stringify(state.tasks))
      }
    },
    setTasks: (state) => {
      let fromLocalStorage = window.localStorage.getItem('vue-Todo')
      if (fromLocalStorage !== null) {
        state.tasks = JSON.parse(fromLocalStorage)
      } else {
        state.tasks = []
      }

    // localStorage.removeItem('vue-Todo')
    }
  },
  getters: {
    totalTasks: state => {
      return state.tasks.length
    },
    completedTasks: state => {
      return state.tasks.filter(task => task.status === 'done')
    },
    pendingTasks: state => {
      return state.tasks.filter(task => task.status === 'pending')
    },
    totalDone: (state, getters) => {
      return getters.completedTasks.length
    },
    totalPending: (state, getters) => {
      return getters.pendingTasks.length
    }
  }
})
