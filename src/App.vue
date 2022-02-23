<script setup lang="ts">
	import { RouterView } from 'vue-router';
	import { Head } from '@vueuse/head';
	import NavBar from '$layout/NavBar.vue';
	import favicon from '$assets/favicon.ico?url';
</script>

<template>
	<Head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Vite App</title>
		<link rel="icon" :href="favicon" />
	</Head>

	<NavBar />

	<div class="h-full w-screen" id="page">
		<RouterView />
	</div>
</template>
