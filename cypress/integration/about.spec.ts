describe('About Page', () => {
	it('renders', () => {
		cy.visit('/about');

		cy.contains('h1', 'About this Website');
		cy.contains('p', 'This is Website was made with Vite and Vue.');

		cy.screenshot();
	});
});
