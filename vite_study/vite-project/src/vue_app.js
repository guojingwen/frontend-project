import {createApp} from 'vue';
import VueAPP from './vue-app.vue';

const ele = document.createElement('div');
document.body.appendChild(ele);

createApp(VueAPP).mount(ele);

