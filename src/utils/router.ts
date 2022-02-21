import {
	createRouter,
	type RouterHistory,
	type RouterOptions,
} from 'vue-router';
import routes from '~pages';

export type MiniRouterOpts = Omit<RouterOptions, 'history' | 'routes'>;

export default function CreateRouter(
	History: RouterHistory,
	opts: MiniRouterOpts = {},
) {
	return createRouter({
		history: History,
		routes: routes,
		...opts,
	});
}
