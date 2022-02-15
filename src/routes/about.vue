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
	<div class="flex justify-center text-center">
		<h1 class="text-6xl">About this Website</h1>
	</div>
</template>
