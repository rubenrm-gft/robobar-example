// hola.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

function checkoutButton() {
    return cy.get('.col-12 > .btn')
}
function colaButton() {
    return cy.get(':nth-child(1) > :nth-child(3) > .row > .col-5 > .input-group-append > .btn')
}

function totalText() {
    return cy.get(':nth-child(4) > .ng-binding')
}

function beerButton(){
    return cy.get(':nth-child(2) > :nth-child(3) > .row > .col-5 > .input-group-append > .btn')
}

function checkOut(){
 return cy.get('.col-12 > .btn')
}

function ageInput(){
    return cy.get('#ageInput')
}

function orderButton(){
    return cy.get('.btn-success')
}

function confirmText(){
    return cy.get('p')
}

function alertAge(){
    return cy.get(':nth-child(2) > :nth-child(1) > .alert')
}



describe('Hello Cypress', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:3002')
    })
    it('Says hello', () => {
        expect(true).to.equal(true)
    })
    it('Order a cola', () => {
        colaButton()
            .click()
        totalText()
            .should("contain.text", "€1.25")
    })
    it('Order a cola', () => {
        checkoutButton()
            .should("be.disabled")
        colaButton()
            .click()
        checkoutButton()
            .should("be.enabled")
        totalText()
            .should("contain.text", "€1.25")
    })
    it('Order two colas', () => {
        colaButton()
            .click()
            .click()
        totalText()
            .should("contain.text", "€2.50")
    })
    it('Order two beers', () => {
        cy.get(':nth-child(2) > :nth-child(3) > .row > .col-5 > .input-group-append > .btn')
            .as('beerButton')
            .click()
        cy.get(':nth-child(4) > .ng-binding')
            .as('total')
            .should("contain.text", "€2.00")
        cy.get('@beerButton')
            .click()
        cy.get('@total')
            .should("contains.text","€4.00" )
    })
})

describe('AgesSuite tests', () =>{
    it('Cola order full', () =>{
        cy.visit('http://localhost:3000/')
        colaButton().click()
        totalText().should("contain.text", "€1.25")
        checkOut().click()
        ageInput().should('not.exist')
        orderButton().click()
        confirmText().should("contain.text", "Coming right up! ~bzzzt~")
    })

    it('Underage beer', () =>{
        cy.visit('http://localhost:3000/')
        beerButton().click()
        totalText().should("contain.text", "€2.00")
        checkOut().click()
        ageInput().should('exist')
        ageInput().type("17");
        orderButton().click();
        alertAge().should('exist')
    })

    it('Overage beer', () =>{
        cy.visit('http://localhost:3000/')
        beerButton().click()
        totalText().should("contain.text", "€2.00")
        checkOut().click()
        ageInput().should('exist')
        ageInput().type("19");
        orderButton().click();
        alertAge().should('not.exist')
        confirmText().should("contain.text", "Coming right up! ~bzzzt~")
        cy.get('@total')
            .should("contains.text","€4.00" )
    })
}) 