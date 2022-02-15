<script setup lang="ts">
	import { computed /*, ref*/ } from 'vue';
	//import { useMotion } from '@vueuse/motion';
	//import FeatherSun from '~icons/fe/sun';
	import SunIcon from '~icons/octicon/sun-16';
	import MoonIcon from '~icons/octicon/moon-16';
	import { useDarkMode } from '$store';

	const ThemeStore = useDarkMode();
	const tooltip = computed(
		() => `Enable ${ThemeStore.mode === 'dark' ? 'Light' : 'Dark'} Mode`,
	);
	// animation vaguely taken from https://jfelix.info/blog/using-react-spring-to-animate-svg-icons-dark-mode-toggle
	/*const properties = {
		//! The names are swapped
		sun: {
			svgContainer: {
				transform: 'rotate(40deg)',
			},
			centerCircle: {
				r: 9,
			},
			maskCircle: {
				cx: 12,
				cy: 4,
			},
			rays: {
				//transform: 'rotate(0deg)',
				opacity: 0,
			},
		},
		moon: {
			svgContainer: {
				transform: 'rotate(90deg)',
			},
			centerCircle: {
				r: 5,
			},
			maskCircle: {
				cx: 30,
				cy: 0,
			},
			rays: {
				//transform: 'rotate(360deg)',
				opacity: 1,
			},
		},
	};

	const shape = computed<'moon' | 'sun'>(() =>
		ThemeStore.mode === 'light' ? 'moon' : 'sun',
	);

	const svgContainer = ref<SVGSVGElement>();
	const svg = useMotion(svgContainer, {
		sun: properties.sun.svgContainer,
		moon: properties.moon.svgContainer,
	});
	svg.variant = shape;

	const maskCircle = ref<SVGCircleElement>();
	const mask = useMotion(maskCircle, {
		sun: properties.sun.maskCircle,
		moon: properties.moon.maskCircle,
	});
	mask.variant = shape;

	const centerCircle = ref<SVGCircleElement>();
	const circle = useMotion(centerCircle, {
		sun: properties.sun.centerCircle,
		moon: properties.moon.centerCircle,
	});
	circle.variant = shape;

	const raysContainer = ref<SVGGElement>();
	const rays = useMotion(raysContainer, {
		sun: properties.sun.rays,
		moon: properties.moon.rays,
	});
	rays.variant = shape;*/

	const toggle = () => {
		ThemeStore.toggle();
	};
</script>

<template>
	<button @click="() => toggle()" :title="tooltip">
		<SunIcon width="24" height="24" v-if="ThemeStore.mode !== 'light'" />
		<MoonIcon width="24" height="24" v-else />

		<!-- TODO: Fix animation
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				stroke="currentColor"
				ref="svgContainer">
				<mask id="dark-mode-mask">
					<rect x="0" y="0" width="100%" height="100%" fill="white" />
					<circle r="9" fill="black" ref="maskCircle" />
				</mask>

				<circle
					cx="12"
					cy="12"
					fill="currentColor"
					mask="url(#dark-mode-mask)"
					ref="centerCircle" />

				<g
					strokeWidth="2"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					ref="raysContainer">
					<line x1="12" y1="1" x2="12" y2="3" />
					<line x1="12" y1="21" x2="12" y2="23" />
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
					<line x1="1" y1="12" x2="3" y2="12" />
					<line x1="21" y1="12" x2="23" y2="12" />
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
				</g>
			</svg>-->
	</button>
</template>
