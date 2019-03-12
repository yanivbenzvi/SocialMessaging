import Vue from 'vue'
import Router from 'vue-router'
import home    from './components/Home'
import messages    from './components/messages'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/user/:id',
            name: 'messages',
            component: messages,
            props: true
        },
    ]
})
