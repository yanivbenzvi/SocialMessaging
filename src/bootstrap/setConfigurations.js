import Vue from 'vue'

const inDevelopment      = process.env.NODE_ENV === 'development'
Vue.config.silent        = !inDevelopment
Vue.config.devtools      = inDevelopment
Vue.config.productionTip = false
