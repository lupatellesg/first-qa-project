describe('Testes do fluxo de compra', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com')
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

    //CT-04
    it('Checkout com campos obrigatórios vazios', () => {
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="continue"]').click()

        cy.get('.error-message-container').should('have.text', 'Error: First Name is required')
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html')
    })


    //CT-05
    it('Remoção de item do carrinho', () => {
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html')

        cy.get('[data-test="remove-sauce-labs-backpack"]').click()

        cy.get('[data-test="inventory-item"]').should('not.exist')
    })
})
