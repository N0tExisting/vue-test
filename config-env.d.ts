declare module '@windicss/plugin-scrollbar';
declare module '@windicss/plugin-interaction-variants';
declare module '@windicss/plugin-question-mark';

declare module 'vite' {
	import type { SSRConfig } from 'vite';
	interface UserConfig {
		ssr?: SSRConfig;
	}
}
