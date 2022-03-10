<script setup lang="ts">
	import { Head } from '@vueuse/head';
</script>

<template>
	<div class="h-full flex flex-col justify-center text-center">
		<Head>
			<title>About</title>
			<meta name="description" content="About this Website" />
		</Head>
		<h1 class="text-6xl mb-2">About this Website</h1>

		<div
			class="h-full flex flex-col justify-center content-center text-center text-3xl">
			<p>
				This is Website was made with
				<a
					class="text-cyan-600 dark:text-cyan-400"
					href="https://vitejs.dev/"
					target="_blank"
					rel="noopener noreferrer">
					Vite</a
				>
				and
				<a
					class="text-cyan-600 dark:text-cyan-400"
					href="https://vuejs.org"
					target="_blank"
					rel="noopener noreferrer">
					Vue </a
				>.
			</p>
		</div>
	</div>
</template>
