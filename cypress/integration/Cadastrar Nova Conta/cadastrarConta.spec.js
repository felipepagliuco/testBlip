function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

describe('Validações de cadastro de nova conta ', () => {

    beforeEach(() => {
        cy.visit('https://account.blip.ai/register?returnUrl=%2Faccount')
    })

    it('Usuário não digita um ou mais campos obrigatórios', () => {

        cy.get('#FullName').type("User Teste XX1")
        cy.get('#submitButton').should("be.disabled")

        cy.get('#Email').type("usertestxx1@gmail.com")
        cy.get('#submitButton').should("be.disabled")

        cy.get('#Password').type("12345678")
        cy.get('#submitButton').should("be.disabled")

        cy.get('#PhoneNumber').type("5598952929")
        cy.get('#submitButton').should("be.disabled")

        cy.get('#CompanySite').type("https://account.blip.ai/login")
        cy.get('#submitButton').should("be.disabled")

        cy.get('.items-center > .hydrated').click()
        cy.get('#submitButton').should("not.be.disabled")
    })

    it('Usuário informa um e-mail que já está cadastrado na base de dados', () => {
        cy.get('#FullName').type("User Teste XX1")
        cy.get('#Email').type("tevyt@abyssmail.com")
        cy.get('#Password').type("12345678")
        cy.get('#PhoneNumber').type("5598952929")
        cy.get('#CompanySite').type("https://account.blip.ai/login")
        cy.get('.items-center > .hydrated').click()
        cy.get('#submitButton').click()
        cy.get('.pb2').should("contain.text","Este e-mail já está em uso.")
    })


    it('Usuário não cadastrado realiza cadastro e recebe um link no e-mail', () => {
        // Para esse caso de teste teria que utilizar técnicas mais avançadas essa é uma forma simplista uma idéia inicial,
        //     poderiamos pegar o link gerado e realizar um assert nele, seria uma opção. Devido ao pouco tempo fiz uma ideia inicial

        cy.get('#FullName').type("User Teste XX1")
        cy.get('#Email').type(makeid(10)+"@abyssmail.com")
        cy.get('#Password').type("12345678")
        cy.get('#PhoneNumber').type("5598952929")
        cy.get('#CompanySite').type("https://account.blip.ai/login")
        cy.get('.items-center > .hydrated').click()
        cy.get('#submitButton').click()
        cy.get('.bp-c-rooftop').should("contain.text","Por favor, confira sua caixa de entrada. Verifique também sua caixa de spam ou lixo eletrônico.")
    })

})