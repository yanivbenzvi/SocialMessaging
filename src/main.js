import './bootstrap'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import App    from './App'
import '@babel/polyfill';
import Vue from 'vue'
import './plugins/vuetify';
import router from './router'

Vue.config.productionTip = false;

export const appData = {
    app_icon: 'code',
    footer_message: 'Made with ❤️ in Mountain View, California',
    title: 'Vue, Vuetify, Webpack',
};



// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

