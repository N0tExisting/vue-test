import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import { createHead } from '@vueuse/head';
import AboutPage from '$route/about.vue';

describe.skip('About Page', () => {
	const head = createHead();
	it('renders properly', () => {
		const wrapper = mount(AboutPage, { plugins: [head] });
		expect(wrapper.text()).toContain('About this Website');
		//expect(head.headTags).toContainEqual({});
	});
});
