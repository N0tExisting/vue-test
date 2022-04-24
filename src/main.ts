import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import PiniaPersist from 'pinia-plugin-persistedstate';
import { createWebHistory } from 'vue-router';
import { createHead } from '@vueuse/head';
import { MotionPlugin } from '@vueuse/motion';
import createRouter from '$util/router';
import App from '$App.vue';
import '$asset/global.css';
import 'windi.css';

export const app = createSSRApp(App);
export const head = createHead();
export const router = createRouter(createWebHistory(import.meta.env.BASE_URL));
export const pinia = createPinia();

pinia.state.value = window[Symbol.for('SSR.Initial')].pinia;
pinia.use(PiniaPersist);

app.use(pinia);
app.use(MotionPlugin);
app.use(head);
app.use(router);

export const instance = router.isReady().then(() => app.mount('#app'));
