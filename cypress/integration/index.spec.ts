// https://docs.cypress.io/api/introduction/api.html

describe('Home Page', () => {
	beforeEach(() => cy.visit('/'));
	it('explains which file to edit', () => {
		cy.contains('p', 'Edit routes/index.vue and save to test HMR updates.');
	});
	it('has a link to the Vue docs.', () => {
		cy.contains('a[href^="https://vuejs.org"]', 'Vue');
	});
	it('has a link to the Vite docs.', () => {
		cy.contains('a[href^="https://vitejs.dev"]', 'Vite');
	});
});
