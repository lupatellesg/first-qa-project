describe('Testes do fluxo de compra', () => {
    beforeEach(() => { cy.visit('https://www.saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

    })
    //CT-03
    it('Compra de produtos com sucesso', () => {
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('João')
        cy.get('[data-test="lastName"]').type('da Silva')
        cy.get('[data-test="postalCode"]').type('00000-000')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()

        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-complete.html')
    })

})

