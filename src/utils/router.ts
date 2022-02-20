import {
	createRouter,
	type RouterHistory,
	type RouterOptions,
} from 'vue-router';
import routes from '~pages';

export default function CreateRouter(
	History: RouterHistory,
	opts: Omit<RouterOptions, 'history' | 'routes'> = {},
) {
	return createRouter({
		history: History,
		routes: routes,
		...opts,
	});
}
