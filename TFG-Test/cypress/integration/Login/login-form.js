describe('Login TFG', () => {
    beforeEach(() => {
        cy.visit('http://localhost/')
        cy.wait(1000)
    })

    it('display Form in english', () => {
        cy.get('.pageCentered>form').should('be.visible')
        cy.get('.pageCentered>form').contains('Email')
        cy.get('.pageCentered>form').contains('Password')
        cy.get('.pageCentered>form').contains('Login')
    })

    it('Change to spanish and display form in spanish', () => {
        cy.get('.select>select').select('Español')
        cy.get('.pageCentered>form').should('be.visible')
        cy.get('.pageCentered>form').contains('Correo')
        cy.get('.pageCentered>form').contains('Contraseña')
        cy.get('.pageCentered>form').contains('Iniciar sesión')
        cy.get('.select>select').select('English')
    })

})