import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
