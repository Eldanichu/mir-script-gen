import Vue from './utils/imports'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

Vue.config.productionTip = false
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
