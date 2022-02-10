import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';
import router from '$util/router';

import App from '$App.vue';

import '$asset/base.css';

const app = createApp(App);

app.use(createPinia());
app.use(createHead());
app.use(router);

app.mount('#app');
