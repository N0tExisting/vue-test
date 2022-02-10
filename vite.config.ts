import { defineConfig } from 'vite';
// <reference types="vitest" />
import tsconfigPaths from 'vite-tsconfig-paths';
import WindiCSS from 'vite-plugin-windicss';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { minifyHtml } from 'vite-plugin-html';
import Icons from 'unplugin-icons/vite';
import { envConfig } from 'vite-plugin-env-config';
import Pages, {
	type ImportMode,
	type ImportModeResolveFn,
} from 'vite-plugin-pages';

let shown = false;
const importMode: ImportModeResolveFn = (path) => {
	let retVal: ImportMode = 'async';
	// /\/src\/routes\/\[\.\.\.\]\.([jt]sx?|vue)$/;
	if (path.endsWith('/src/routes/[...].vue')) {
		retVal = 'sync';
	}
	console.log(`${shown ? '' : '\n'}Importing '${path}' ${retVal}hronously`);
	shown = true;
	return retVal;
};

// https://vitejs.dev/config/
export default defineConfig({
	cacheDir: 'node_modules/.cache/vite',
	envPrefix: 'PUBLIC_',
	plugins: [
		tsconfigPaths({ loose: true }),
		vue(),
		vueJsx(),
		WindiCSS(),
		Pages({
			extensions: ['vue', 'jsx', 'tsx', 'md', 'mdx'],
			dirs: 'src/routes',
			syncIndex: false,
			resolver: 'vue',
			importMode,
		}),
		envConfig(),
		Icons({
			compiler: 'vue3',
		}),
		minifyHtml({
			collapseWhitespace: true,
			removeComments: true,
			decodeEntities: true,
			minifyCSS: true,
			minifyJS: true,
			removeAttributeQuotes: false,
			removeEmptyAttributes: true,
			processConditionalComments: true,
			useShortDoctype: false,
		}),
	],
	resolve: {
		dedupe: [
			'vue',
			'@vue/shared',
			'@vue/runtime-dom',
			'@vue/runtime-core',
			'@vue/server-renderer',
			//'@vue/compiler-core',
			//'@vue/compiler-sfc',
			//'@vue/compiler-dom',
			'pinia',
		],
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
			// TODO: Coverage
			enabled: false,
			reportsDirectory: 'coverage',
			skipFull: false,
			include: ['src/**/*.{js,jsx,ts,tsx,vue}'],
			reporter: [
				'text',
				'text-summary',
				'lcov',
				'json',
				'html',
				'clover',
				'cobertura',
			],
			extension: [
				'.js',
				'.mjs',
				'cjs',
				'.jsx',
				'.ts',
				'.mts',
				'.cts',
				'.tsx',
				'.vue',
			],
		},
	},
});
