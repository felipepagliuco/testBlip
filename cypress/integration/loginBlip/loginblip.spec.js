describe('Validações de Login ', () => {

    beforeEach(() => {
        cy.visit('https://account.blip.ai/login')
    })

    it('Login com e-mail e senha valida acessa o Portal', () => {
        cy.get('#email').type("tevyt@abyssmail.com")
        cy.get('#password').type("123456")
        cy.get('#blip-login').click()
        cy.get('.user-name').should("contain","Joao Maria Teste")

    })

    it('Usuário esqueceu sua senha, deseja redefinir', () => {
        cy.get('#login-forgot-password').click()
        cy.get('#Email').type("tevyt@abyssmail.com")
        cy.get('#submitButton').click()
        cy.get('.bp-c-desk').should("contain.text","Enviamos um email para t****t@abyssmail.com")
        cy.get('.bp-c-rooftop').should("contain.text","Se você não receber a mensagem em cerca de 5 minutos, clique no botão abaixo para reenviá-la:")
    })


})