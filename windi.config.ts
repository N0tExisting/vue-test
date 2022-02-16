import { defineConfig } from 'vite-plugin-windicss';
import plugin from 'windicss/plugin';
import pluginFilters from 'windicss/plugin/filters';
import pluginForms from 'windicss/plugin/forms';
import pluginAspectRatio from 'windicss/plugin/aspect-ratio';
import pluginLineClamp from 'windicss/plugin/line-clamp';
import pluginTypography from 'windicss/plugin/typography';
import pluginScrollbar from '@windicss/plugin-scrollbar';
import pluginInteraction from '@windicss/plugin-interaction-variants';
import pluginQuestionMark from '@windicss/plugin-question-mark';

export default defineConfig({
	attributify: {
		prefix: 's:',
	},
	darkMode: 'class',
	extract: {
		include: [
			'./**/*.html',
			'./**/*.svg',
			'./src/**/*.{js,ts,jsx,tsx,vue}',
			'./src/**/*.{css,scss,pcss,postcss}',
		],
	},
	alias: {
		btn: 'rounded px-1 m-1 transition ease-in-out duration-500 hover:(scale-110)',
	},
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Inter',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Oxygen',
					'Ubuntu',
					'Cantarell',
					'Fira Sans',
					'Droid Sans',
					'Helvetica Neue',
					'sans-serif',
				],
			},
		},
	},
	variants: {
		scrollbar: ['rounded', 'dark'],
	},
	plugins: [
		plugin(({ addUtilities, addDynamic, variants }) => {
			const containUtilities = {
				'.contain-none': {
					contain: 'none',
				},
				'.contain-strict': {
					contain: 'strict',
				},
				'.contain-content': {
					contain: 'content',
				},
				'.contain-size': {
					contain: 'size',
				},
				'.contain-layout': {
					contain: 'layout',
				},
				'.contain-style': {
					contain: 'style',
				},
				'.contain-paint': {
					contain: 'paint',
				},
				'.contain-full': {
					contain: 'size layout paint style',
				},

				'.content-visibility-visible': {
					'content-visibility': 'visible',
				},
				'.content-visibility-hidden': {
					'content-visibility': 'hidden',
				},
				'.content-visibility-auto': {
					'content-visibility': 'auto',
				},
			};
			addUtilities(containUtilities);
			// FIXME: I have no clue what I'm doing here
			/*addDynamic(
				'contain',
				({ Utility, Style }) => {
					return Utility.handler
						.handleStatic(Style('contain'))
						.handleString((val) => {
							// Replace underscores and dashes in val with spaces
							val = val.replace(/[_-]/g, ' ').trim();
							if (
								!/^(?:(?:paint|style|layout|size)\s){1,4}|content|strict|none$/.test(
									val,
								)
							) {
								throw new Error(
									`Invalid value for 'contain' property: '${val}'\n\
									See MDN Docs https://developer.mozilla.org/en-US/docs/Web/CSS/contain#values`,
								);
							}
							return val;
						})
						.createProperty('contain');
				},
				variants('contain'),
			);*/
		}),
		pluginFilters,
		pluginForms,
		pluginAspectRatio,
		pluginLineClamp,
		pluginTypography,
		pluginScrollbar,
		pluginInteraction,
		pluginQuestionMark,
	],
});
