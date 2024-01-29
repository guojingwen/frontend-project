 /* vue@2 vue-router@3 */
import VueRouter from 'vue-router'

const router = new VueRouter({
    // 'history' | 'hash'
    mode: 'history',
    routes: [/*
        {},
        ...
    */]
})

// App.vue
// template里面放置<router-view/>

import Vue from 'vue'
import router from './router'
import App from './App.vue'

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
