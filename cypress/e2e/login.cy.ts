describe('Home page test integration case', () => {
	it('Visit the login page', () => {
		cy.visit('http://localhost:3000/login')
	})
	it('Should display  validation error when some on the input fields are empty', () => {
		cy.visit('http://localhost:3000/login')
		cy.get('[data-test="username-input"]').type('Noxius')
		cy.get('button[name="submit-login"]').click()
		cy.get('[data-test="input-errors"]').should('contain', 'Campo requerido')
	})
})
