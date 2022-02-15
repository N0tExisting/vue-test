import { createApp } from 'vue';
import { createPinia } from 'pinia';
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
app.use(router);

app.mount('#app');
