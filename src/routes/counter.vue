<script setup lang="ts">
	import { Head } from '@vueuse/head';
	import { useCounterStore } from '$store';
	import CounterExample from '$comp/CounterExample.vue';
	const counter = useCounterStore();
</script>

<template>
	<main class="flex justify-center w-screen h-full">
		<Head>
			<title>Counter - {{ counter.count }}</title>
		</Head>
		<CounterExample />
	</main>
</template>
