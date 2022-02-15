<script setup lang="ts">
	import { Head } from '@vueuse/head';
	import { useCounterStore } from '$store';
	const counter = useCounterStore();
</script>

<template>
	<Head>
		<title>Counter - {{ counter.count }}</title>
	</Head>
	<div>
		<h2>Counter</h2>

		<label>
			<span>Count:</span>
			<output>{{ counter.count }}</output>
		</label>
		<label>
			<span>Double:</span>
			<output>{{ counter.doubleCount }}</output>
		</label>

		<p>
			<button @click="counter.decrement(5)">-5</button>
			<button @click="counter.decrement()">-1</button>
			<button @click="counter.$reset()">Reset</button>
			<button @click="counter.increment()">+1</button>
			<button @click="counter.increment(5)">+5</button>
		</p>
	</div>
</template>
