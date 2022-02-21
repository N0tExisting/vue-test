import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createWebHistory } from 'vue-router';
import { createHead } from '@vueuse/head';
import { MotionPlugin } from '@vueuse/motion';
import createRouter from '$util/router';
import App from '$App.vue';
import '$asset/global.css';
import 'windi.css';

export const app = createApp(App);
export const pinia = createPinia();
export const head = createHead();
export const router = createRouter(createWebHistory(import.meta.env.BASE_URL));

app.use(MotionPlugin);
app.use(pinia);
app.use(head);
app.use(router);

await router.isReady();

export const instance = app.mount('#app');
