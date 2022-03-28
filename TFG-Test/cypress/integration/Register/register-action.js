describe('Register TFG', () => {
    beforeEach(() => {
        cy.visit('http://localhost/')
        cy.get('.navbar').contains('Sign up').click()
        cy.wait(1000)
    })

    it('Register Test User account', () => {
        cy.get('input').eq(0).focus().should("not.be.disabled").type("Test User")
        cy.get('input').eq(1).focus().should("not.be.disabled").type("TestUser@gmail.com")
        cy.get('input').eq(2).focus().should("not.be.disabled").type("123456")
        cy.get('input').eq(3).focus().should("not.be.disabled").type("123456")
        cy.get('.pageCentered').contains('Sign up').click()
        cy.get('.pageCentered').contains("User successfully registered").should("be.visible")
    })
})