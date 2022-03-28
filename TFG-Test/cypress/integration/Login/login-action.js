describe('Login TFG', () => {
    beforeEach(() => {
        cy.visit('http://localhost/')
        cy.wait(1000)
    })

    it('Login Test User account', () => {
        cy.get('input').eq(0).focus().should("not.be.disabled").type("TestUser@gmail.com")
        cy.get('input').eq(1).focus().should("not.be.disabled").type("123456")
        cy.get('.pageCentered').contains('Login').click()
        cy.get('.pageCentered').contains("User successfully logged in").should("be.visible")
    })
})