//CT-01
describe('Testes de Login', () => {
  beforeEach(() => { cy.visit('https://www.saucedemo.com') })
  it('Acesse o site Sauce Demo e faça Login com credenciais válidas', () => {
    cy.get('[data-test="username"]')
      .type('standard_user')
    cy.get('[data-test="password"]')
      .type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')
  })


  //CT-02
  it('Faça Login com dados inválidos', () => {
    cy.get('[data-test="username"]').type('random_user')
    cy.get('[data-test="password"]').type('random_password')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('be.visible')
    cy.url().should('not.include', '/inventory.html')
  })

  //CT-06
  it('Faça Login com usuário bloqueado', () => {
    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
    cy.url().should('not.include', '/inventory.html')
  })

})