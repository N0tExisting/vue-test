<script setup lang="ts">
	import { RouterView } from 'vue-router';
	import { Head } from '@vueuse/head';
	import NavBar from '$layout/NavBar.vue';
</script>

<template>
	<Head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Vite App</title>
		<link rel="icon" href="/favicon.ico" />
	</Head>

	<NavBar />

	<div class="h-full w-screen" id="page">
		<RouterView />
	</div>
</template>
