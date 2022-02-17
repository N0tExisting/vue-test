describe('About Page', () => {
	it('renders', () => {
		cy.visit('/about');
		cy.contains('h1', 'About this Website');
		cy.screenshot();
	});
});
