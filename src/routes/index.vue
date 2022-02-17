<script setup lang="ts">
	import { onMounted, onBeforeUnmount, ref } from 'vue';

	const time = ref(0);

	onMounted(() => {
		const interval = setInterval(() => {
			time.value++;
		}, 1000);

		onBeforeUnmount(() => {
			clearInterval(interval);
		});
	});
</script>

<template>
	<main class="h-full flex flex-col place-content-center place-items-center text-lg">
		<!-- TODO: Animate Logo
			(Up & down while squishing)?
		-->
		<img
			alt="Vue logo"
			class="pointer-events-none h-40 m-4 select-none"
			src="../assets/logo.svg?url" />

		<p>Edit <code>routes/index.vue</code> and save to test HMR updates.</p>

		<p class="pt-3">
			<a
				class="text-cyan-600 dark:text-cyan-400"
				href="https://vuejs.org"
				target="_blank"
				rel="noopener noreferrer">
				Learn Vue.js
			</a>
			|
			<a
				class="text-cyan-600 dark:text-cyan-400"
				href="https://vitejs.dev/"
				target="_blank"
				rel="noopener noreferrer">
				Vite Docs
			</a>
		</p>

		<p class="pt-3">
			This Page Has been open for <code>{{ time }}</code> seconds.
		</p>
	</main>
</template>
