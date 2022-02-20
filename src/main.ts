import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createWebHistory } from 'vue-router';
import { createHead } from '@vueuse/head';
import { MotionPlugin } from '@vueuse/motion';
import router from '$util/router';
import App from '$App.vue';
import '$asset/global.css';
import 'windi.css';

const app = createApp(App);

app.use(MotionPlugin);
app.use(createPinia());
app.use(createHead());
app.use(router(createWebHistory(import.meta.env.BASE_URL)));

app.mount('#app');
