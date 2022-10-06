/* vue@3 vue-router@4 */
import VueRouter from 'vue-router'

const router = VueRouter.createRouter({
    // createWebHistory createWebHashHistory
    history: VueRouter.createWebHistory(),
    routes: [/* 
        {},
        ...
    */],
})

// App.vue
// template 里放置 <router-view/>

import {createApp} from 'vue'
import App from './App.vue'
createApp(app)
    .use(router)
