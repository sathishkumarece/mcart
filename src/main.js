import Vue from 'vue'
import App from './App.vue'

import router from './router'
import vueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(vueResource)

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('currency', function (value) {
  return '₹' + parseFloat(value).toFixed(2)
})
/* eslint-disable no-new */

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
