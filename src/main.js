import Vue from 'vue'
import App from './App.vue'

require("jquery/dist/jquery.js")
require("jquery/dist/jquery.slim.js")
require("bootstrap/dist/js/bootstrap.bundle.min.js")
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
