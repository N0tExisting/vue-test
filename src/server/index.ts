import type { AddressInfo } from 'node:net';
//import * as path from 'node:path';
import Fastify, { type RouteHandlerMethod } from 'fastify';
import compression from 'fastify-compress';
//import fastifyStatic from 'fastify-static';
import fastifyFetch from 'fastify-fetch';
import cookie from 'fastify-cookie';
import middie from 'middie';
import httpDevServer from 'vavite/http-dev-server';
import viteDevServer from 'vavite/vite-dev-server';
import renderer from './renderer';

const fastify = Fastify({
	serverFactory: httpDevServer
		? (handler) => {
				/* eslint-disable @typescript-eslint/no-non-null-assertion */
				httpDevServer!.on('request', handler);
				return httpDevServer!;
				/* eslint-enable @typescript-eslint/no-non-null-assertion */
		  }
		: undefined,
});

fastify.register(fastifyFetch);

fastify.register(middie);
fastify.register(cookie);

if (import.meta.env.PROD) {
	fastify.register(compression);
	/*fastify.register(fastifyStatic, {
		root: path.join(__dirname, '../client/'),
		cacheControl: true,
		lastModified: true,
		etag: true,
		index: false,
		extensions: [],
	});*/
} else {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	fastify.use(viteDevServer!.middlewares);
}

export const fetch = fastify.fetch;

// This is an optional trick to load routes lazily so that
// when reloadOn option is set to "static-deps-change",
// changes to the route handlers will not trigger a reload.
export function lazy(
	importer: () => Promise<{ default: RouteHandlerMethod }>,
): RouteHandlerMethod {
	return async (req, res) => {
		try {
			const routeHandler = (await importer()).default;
			return routeHandler.bind(fastify)(req, res);
		} catch (err) {
			if (err instanceof Error) viteDevServer?.ssrFixStacktrace(err);
			throw err;
		}
	};
}

// TODO: This should be simplified in prod
export let Renderer = renderer.bind(fastify);

fastify.get('*', {
	handler(req, rep) {
		return Renderer(req, rep);
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(
		'./renderer.tsx',
		(mod: typeof import('./renderer')) => {
			Renderer = mod.default.bind(fastify);
		},
	);
}

export default fastify;

if (httpDevServer) {
	console.log('Starting dev server');
	// Fastify insists on calling listen itself.
	// devServer ignores listen calls but calls the callback.
	fastify.listen((httpDevServer.address() as AddressInfo).port, (err, addr) => {
		if (err) {
			console.error('Error starting server [Dev]:', err);
			throw err;
		} else {
			console.log(`Started server [Dev] on: ${addr}`);
		}
	});
} else {
	console.log('Starting Prod server');

	fastify.listen(3000, (err, addr) => {
		if (err) {
			console.error('Error starting server [Prod]:', err);
			throw err;
		} else {
			console.log(`Started server [Prod] on: ${addr}`);
		}
	});
}
