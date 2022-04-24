import { Writable } from 'node:stream';

import {
	createSSRApp,
	mergeProps,
	type HTMLAttributes,
	type HtmlHTMLAttributes,
} from 'vue';
import {
	renderToString,
	pipeToNodeWritable,
	type SSRContext as RootSSRCtx,
} from 'vue/server-renderer';

import type {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	RouteHandlerMethod,
} from 'fastify';

import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { createMemoryHistory } from 'vue-router';
import { createHead, renderHeadToString, type HeadClient } from '@vueuse/head';
import { MotionPlugin } from '@vueuse/motion';

import viteDevServer from 'vavite/vite-dev-server';

import createRouter from '$util/router';
import SafeStringify from '$utils/SafeStringify';
import App from '$App.vue';
import Document from '$%Document.vue';

export interface BaseSSRCtx extends RootSSRCtx {
	/**
	 * introduced by `@vitejs/plugin-vue`
	 */
	modules: string[];
}

export interface AppSSRCtx extends BaseSSRCtx {
	head: HeadClient;

	//* server stuff

	server: FastifyInstance;

	req: FastifyRequest;

	rep: FastifyReply;
}

export interface DocSSRCtx extends BaseSSRCtx {
	readonly ctx: AppSSRCtx;

	/** Props for the `<html>` element */
	html: HtmlHTMLAttributes;
	/** Props for the `<body>` element. */
	body: HTMLAttributes;
	/** Content to be rendered in the `<head>` element. */
	head: string;
	/** The rendered app. */
	app: string;
	/** Scripts to be placed in the `<body>` element. */
	scripts: string;
	/** Modal Content, if it exists */
	modal?: string;
}

const renderer: RouteHandlerMethod = async function render(req, rep) {
	const app = createSSRApp(App);

	const head = createHead();
	const router = createRouter(createMemoryHistory(import.meta.env.BASE_URL));
	const pinia = createPinia();
	const PiniaPersist = createPersistedState({
		storage: {
			getItem: (key) => {
				const cookie = req.cookies[key];
				// TODO: decode?
				return cookie ? cookie : null;
			},
			setItem: (key, value) => {
				rep.setCookie(key, value, {
					expires: new Date(Date.now() + 10000 * 60 * 60 * 24 * 365),
				});
			},
		},
	});
	pinia.use(PiniaPersist);

	app.use(MotionPlugin);
	app.use(pinia);
	app.use(head);
	app.use(router);

	await router.push(req.url);
	await router.isReady();

	/**
	 * passing SSR context object which will be available via useSSRContext()
	 *
	 * `@vitejs/plugin-vue` injects code into a component's setup() that registers
	 * itself on ctx.modules. After the render, ctx.modules would contain all the
	 * components that have been instantiated during this render call.
	 */
	const ctx: AppSSRCtx = {
		head,
		req,
		rep,
		server: this,
		modules: [],
	};
	const html = await renderToString(app, ctx);

	// TODO: Insert ctx.modules into the Head
	console.log('Head:', head.headTags);
	const tags = renderHeadToString(head);

	const htmlProps: HtmlHTMLAttributes = mergeProps(
		...head.headTags
			.filter((tag) => tag.tag === 'html')
			.map((tag) => tag.props),
	);
	const bodyProps: HTMLAttributes = mergeProps(
		...head.headTags
			.filter((tag) => tag.tag === 'body')
			.map((tag) => tag.props),
	);

	const DocCtx: DocSSRCtx = {
		ctx,
		body: bodyProps,
		html: htmlProps,
		head: tags.headTags,
		app: html,
		scripts: `<script>window[Symbol.for('SSR.Initial')]=${SafeStringify({
			pinia: pinia.state.value,
		})}</script><script type="module" src="/src/main.ts"></script>`,
		modal: ctx.teleports?.modal,
		modules: [],
	};

	const document = createSSRApp({
		render: () => (
			<Document>
				{{
					default: () => html,
					head: () => tags.headTags,
					modal: () => DocCtx.scripts,
					scripts: () =>
						`<script>window[Symbol.for('SSR.Initial')]=${SafeStringify({
							pinia: pinia.state.value,
						})}</script><script type="module" src="/src/main.ts"></script>`,
				}}
			</Document>
		),
	});

	if (import.meta.env.DEV) {
		const result = await renderToString(document, DocCtx);
		return await viteDevServer!.transformIndexHtml(req.url, result);
	} else {
		const stream = new Writable();
		pipeToNodeWritable(document, DocCtx, stream);
		return stream;
	}
};

export default renderer;
