describe('Register TFG', () => {
    beforeEach(() => {
        cy.visit('http://localhost/')
        cy.get('.navbar').contains('Sign up').click()
        cy.wait(1000)
    })

    it('display Form in english', () => {
        cy.get('.pageCentered>form').should('be.visible')
        cy.get('.pageCentered>form').contains('Username')
        cy.get('.pageCentered>form').contains('Email')
        cy.get('.pageCentered>form').contains('Password')
        cy.get('.pageCentered>form').contains('Confirm password')
        cy.get('.pageCentered>form').contains('Sign up')
    })

    it('Change to spanish and display form in spanish', () => {
        cy.get('.select>select').select('Español')
        cy.get('.pageCentered>form').contains('Nombre de usuario')
        cy.get('.pageCentered>form').contains('Correo')
        cy.get('.pageCentered>form').contains('Contraseña')
        cy.get('.pageCentered>form').contains('Confirmación')
        cy.get('.pageCentered>form').contains('Registrarse')
        cy.get('.select>select').select('English')
    })

})