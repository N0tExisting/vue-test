<script setup lang="tsx">
	import type { FunctionalComponent as FC } from 'vue';
	import { RouterLink } from 'vue-router';
	import DarkToggle from '$comp/DarkToggle.vue';

	interface NavItemProps {
		left?: boolean;
		place?: 'start' | 'end';
	}

	const NavItem: FC<NavItemProps> = function (p, { slots }) {
		const xPad = () => {
			if (p.place === 'start') {
				return 'pr-4';
			} else if (p.place === 'end') {
				return 'pl-2';
			} else {
				return 'px-4';
			}
		};
		const margin = () => (p.left ? ' ml-auto' : '');
		return (
			<li class={`py-2 ${xPad()}` + margin()}>
				{slots.default ? slots.default() : '<Menu_Item>'}
			</li>
		);
	};
</script>

<template>
	<nav
		role="navigation"
		class="w-screen px-4 bg-gray-200 text-gray-900 dark:(bg-gray-800 text-gray-200)">
		<ul class="flex items-center justify-between first:pl-0 last:pr-0">
			<NavItem place="start">
				<RouterLink to="/">Home</RouterLink>
			</NavItem>
			<NavItem>
				<RouterLink to="/about">About</RouterLink>
			</NavItem>
			<NavItem>
				<RouterLink to="/counter">Counter</RouterLink>
			</NavItem>
			<li class="ml-auto py-2 pl-4 flex items-center">
				<DarkToggle />
			</li>
		</ul>
	</nav>
</template>
