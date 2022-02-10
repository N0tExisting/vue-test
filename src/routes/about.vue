<script setup lang="ts">
	import { useHead } from '@vueuse/head';
	useHead({
		title: 'About',
		meta: [
			{
				name: 'description',
				content: 'This is the about page',
			},
		],
	});
</script>

<template>
	<div class="about">
		<h1>This is an about page</h1>
	</div>
</template>

<style>
	@media (min-width: 1024px) {
		.about {
			min-height: 100vh;
			display: flex;
			align-items: center;
		}
	}
</style>
