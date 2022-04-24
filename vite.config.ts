import { defineConfig } from 'vite';
import { builtinModules } from 'node:module';
import vavite from 'vavite';
import tsconfigPaths from 'vite-tsconfig-paths';
import WindiCSS from 'vite-plugin-windicss';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Icons from 'unplugin-icons/vite';
import { envConfig } from 'vite-plugin-env-config';
import Pages from 'vite-plugin-pages';
import type { ImportMode, ImportModeResolver } from 'vite-plugin-pages';
import Inspect from 'vite-plugin-inspect';

const importMode = ((): ImportModeResolver => {
	let shown = false;
	return (path) => {
		let retVal: ImportMode = 'async';
		// /\/src\/routes\/\[\.\.\.\]\.([jt]sx?|vue)$/;
		if (path.endsWith('/src/routes/[...].vue')) {
			retVal = 'sync';
		}
		console.log(`${shown ? '' : '\n'}Importing '${path}' ${retVal}hronously`);
		shown = true;
		return retVal;
	};
})();

// https://vitejs.dev/config/
export default defineConfig({
	cacheDir: 'node_modules/.cache/vite',
	envPrefix: 'PUBLIC_',
	plugins: [
		tsconfigPaths({ loose: true }),
		vue(),
		vueJsx(),
		vavite({
			serverEntry: './src/server/index.ts',
			clientAssetsDir: 'dist/client',
			//serveClientAssetsInDev: true,
			reloadOn: 'static-deps-change',
		}),
		WindiCSS(),
		Pages({
			extensions: ['vue', 'jsx', 'tsx', 'md', 'mdx'],
			dirs: 'src/routes',
			syncIndex: false,
			resolver: 'vue',
			importMode,
			exclude: ['src/routes/api/**/*'],
		}),
		// TODO: Api
		/*Pages({
			// prettier-ignore
			dirs: [{
					dir: 'src/routes/api',
					baseRoute: '/api',
			}],
			resolver: 'react',
			importMode: 'sync',
			extensions: ['ts', 'tsx', 'js', 'jsx'],
			//extendRoute
		}),*/
		envConfig(),
		Icons({
			compiler: 'vue3',
		}),
		Inspect({ enabled: false }),
	],
	resolve: {
		dedupe: [
			'vue',
			'@vue/shared',
			'@vue/runtime-dom',
			'@vue/runtime-core',
			'@vue/server-renderer',
			'pinia',
		],
	},
	buildSteps: [
		{
			name: 'client',
			config: {
				build: {
					target: 'es6',
					outDir: 'dist/client',
					sourcemap: 'hidden',
					rollupOptions: {
						// Client entry
						input: './src/main.ts',
					},
				},
			},
		},
		{
			name: 'server',
			config: {
				build: {
					// Server entry
					sourcemap: true,
					target: 'es7',
					ssr: './src/server/index.ts',
					outDir: 'dist/server',
				},
			},
		},
	],
	ssr: {
		external: [...builtinModules],
		//noExternal: false,
		target: 'node',
	},
	build: {
		target: 'es6',
		polyfillDynamicImport: false,
		polyfillModulePreload: false,
		assetsDir: 'static',
		assetsInlineLimit: 512,
		sourcemap: 'hidden',
		ssrManifest: true,
		manifest: true,
	},
	test: {
		environment: 'jsdom',
		include: ['**/tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx,vue}'],
		reporters: 'verbose',
		coverage: {
			enabled: true,
			reportsDirectory: 'coverage',
			skipFull: false,
			reporter: [
				'text',
				'text-summary',
				'lcov',
				'json',
				//'html',
				'clover',
				'cobertura',
			],
			clean: true,
			// TODO: Do we emit full coverage during watch?
			//cleanOnRerun: true,
			all: true,
			excludeNodeModules: true,
			allowExternal: false,
			include: ['src/**/*.{js,jsx,ts,tsx,vue}'],
			exclude: ['dist/**/*', 'cypress/**/*', 'coverage/**/*', 'analysis/**/*'],
			extension: ['.cjs', '.mjs', '.js', '.jsx', '.vue', '.tsx', '.ts'],
		},
	},
});
