// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Row, Col, Button, Tabs, TabPane, Tooltip, Dialog, Form, FormItem, Input, DatePicker, Popover } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App'
import router from './router'

locale.use(lang)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Popover)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
