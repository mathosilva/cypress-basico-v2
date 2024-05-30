Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const longText = 'ewifbiefn fhrueifnerfinreuigfo tesdte dnewoifnbierwf bfyeru9fyueirw hbfuiewgtrhgrthtrbythuythntchtyfr fnejrignoiew'
    cy.get('input[id="firstName"]').type('Matheus').should('have.value', 'Matheus')
    cy.get('input[id="lastName"]').type('Seidel').should('have.value', 'Seidel')
    cy.get('input[id="email"]').type('matheus.seidel@teste.com')
    cy.get('textarea[id="open-text-area"]').type(longText, {delay:0})
    cy.get('button[type="submit"]').click()
})