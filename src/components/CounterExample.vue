<script setup lang="ts">
	import { useCounterStore } from '$store';
	const counter = useCounterStore();
</script>

<template>
	<div class="text-center">
		<h1 class="text-6xl">Counter</h1>

		<p class="text-3xl m-3">
			<label>
				<span>Count: </span>
				<output class="font-mono bg-gray-900 text-gray-100 rounded px-2">{{
					counter.count
				}}</output>
			</label>
			<!--
				<label>
					<span>Double: </span>
					<output class="font-mono">{{ counter.doubleCount }}</output>
				</label>
			-->
		</p>

		<p class="text-xl">
			<button
				class="rounded text-gray-100 bg-red-700 px-1 m-1 transition ease-in-out duration-500 hover:(bg-rose-600 scale-110)"
				@click="counter.decrement(5)">
				-5
			</button>
			<button
				class="*btn text-gray-100 bg-orange-600 hover:bg-orange-500"
				@click="counter.decrement()">
				-1
			</button>
			<!-- TODO: Custom thing for Reset Button-->
			<button
				class="*btn text-gray-100 bg-fuchsia-700 hover:bg-fuchsia-600"
				@click="counter.$reset()">
				Reset
			</button>
			<button
				class="*btn text-gray-100 bg-green-700 hover:bg-green-600"
				@click="counter.increment()">
				+1
			</button>
			<button
				class="*btn text-gray-100 bg-lime-600 hover:bg-lime-500"
				@click="counter.increment(5)">
				+5
			</button>
		</p>
	</div>
</template>
