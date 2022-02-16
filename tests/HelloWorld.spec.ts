import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import AboutPage from '$route/about.vue';

describe('About Page', () => {
	it('renders properly', () => {
		const wrapper = mount(AboutPage);
		expect(wrapper.text()).toContain('About this Website');
	});
});
