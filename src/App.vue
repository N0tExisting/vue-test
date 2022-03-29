<script setup lang="ts">
	import { RouterView } from 'vue-router';
	import { useHead } from '@vueuse/head';
	import NavBar from '$layout/NavBar.vue';
	import favicon from '$assets/favicon.ico?url';

	useHead({
		title: 'Vite App',
		meta: [
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1.0',
			},
		],
		link: [
			{
				rel: 'icon',
				href: favicon,
			},
		],
		script: [
			{
				crossorigin: 'anonymous',
				src: 'https://polyfill.io/v3/polyfill.min.js?flags=gated&features=es2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019%2Ces2020%2Ces2022%2Ces2021%2Cdefault%2C%7Ehtml5-elements%2C%7Eviewport%2Cdom4',
			},
		],
	});
</script>

<template>
	<NavBar />

	<div class="h-full w-screen" id="page">
		<RouterView />
	</div>
</template>
