<script setup lang="ts">
	import { useSSRContext } from 'vue';
	import type { DocSSRCtx } from '$server/renderer';

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const ctx = useSSRContext<DocSSRCtx>()!;
</script>

<template>
	<!DOCTYPE html>
	<html class="dark" lang="en" v-bind="ctx.html">
		<head>
			<meta charset="UTF-8" />
			<slot name="head" />
		</head>
		<body v-bind="ctx.body">
			<div id="root">
				<div id="app">
					<slot />
				</div>
				<div id="modal">
					<slot name="modal" />
				</div>
			</div>
			<slot name="scripts" />
		</body>
	</html>
</template>
