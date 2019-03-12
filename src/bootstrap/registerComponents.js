import Vue from 'vue'

const requireComponent = require.context('../components', true, /\.vue$/)

requireComponent
    .keys()
    .map(filename => requireComponent(filename).default)
    .filter(config => config && config.name)
    .forEach(config => Vue.component(config.name, config))
