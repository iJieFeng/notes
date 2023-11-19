import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/vcharts.js'
import * as echarts from 'echarts'
import VueECharts from 'vue-echarts'
import '@/style/common.scss'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.component('v-chart', VueECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
