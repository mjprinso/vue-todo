import { taskStore } from '@/store/taskStore.js'
import moment from 'moment'
export default {
  name: 'Todo',
  data () {
    return {
      false: false,
      procAdd: false,
      aTask: {
        desc: '',
        due: ''
      },
      rules: {
        desc: [
          { required: true, message: 'Please input Task', trigger: 'blur' },
          { min: 3, message: 'Please input at least 3 characters', trigger: 'blur' }
        ],
        due: [
          { type: 'date', required: true, message: 'Please select Due date', trigger: 'change' }
        ]
      },
      dialogVisible: false,
      reminderVisible: false,
      activeName: 'first',
      true: true,
      check: false,
      visible2: false
    }
  },
  computed: {
    getTasks () {
      return taskStore.state.tasks
    },
    totalDone () {
      return taskStore.getters.totalDone
    },
    totalPending () {
      return taskStore.getters.totalPending
    },
    getPendingTasks () {
      return taskStore.getters.pendingTasks
    },
    getCompletedTasks () {
      return taskStore.getters.completedTasks
    }
  },
  methods: {
    addTask (task) {
      this.$refs['taskForm'].validate((valid) => {
        if (valid) {
          this.procAdd = true
          task.status = 'pending'
          task.created = new Date()
          taskStore.commit('addTask', task)
          this.procAdd = false
          this.resetForm()
        } else { return 0 }
      })
    },
    resetForm () {
      this.dialogVisible = false
      this.aTask = {
        desc: '',
        due: ''
      }
    },
    reAddTask (task) {
      task.status = 'pending'
      taskStore.commit('compTask', task)
    },
    delTaskP (task) {
      taskStore.commit('deleteTask', task)
    },
    compTask (task) {
      task.status = 'done'
      taskStore.commit('compTask', task)
    },
    setTasks () {
      return taskStore.commit('setTasks')
    },
    dateCreated (param) {
      return moment(param).format('ddd MMM Do YY, h:mm:a')
    },
    dateDue (param) {
      return moment(param).format('ddd MMM Do, YY')
    },
    checkDue () {
      let today = new Date()
      this.check = moment(today).format('L') > moment(this.aTask.due).format('L')
    }
  },
  mounted () {
    this.setTasks()
  }
}
