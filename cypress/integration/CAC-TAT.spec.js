/// <reference types="Cypress"/>

describe('Central de Atendimento ao cliente', function(){
    beforeEach('', function(){
        cy.visit('./src/index.html')
    })
    it('verifica o titulo da aplicação', function(){
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
        
    it('Preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'ewifbiefn fhrueifnerfinreuigfo tesdte dnewoifnbierwf bfyeru9fyueirw hbfuiewgtrhgrthtrbythuythntchtyfr fnejrignoiew'
        cy.get('input[id="firstName"]').type('Matheus').should('have.value', 'Matheus')
        cy.get('input[id="lastName"]').type('Seidel').should('have.value', 'Seidel')
        cy.get('input[id="email"]').type('matheus.seidel@teste.com')
        cy.get('textarea[id="open-text-area"]').type(longText, {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        const longText = 'ewifbiefn fhrueifnerfinreuigfo tesdte dnewoifnbierwf bfyeru9fyueirw hbfuiewgtrhgrthtrbythuythntchtyfr fnejrignoiew'
        cy.get('input[id="firstName"]').type('Matheus').should('have.value', 'Matheus')
        cy.get('input[id="lastName"]').type('Seidel').should('have.value', 'Seidel')
        cy.get('input[id="email"]').type('matheus.seidel@teste,com')
        cy.get('textarea[id="open-text-area"]').type(longText, {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Sistema não permite o preenchimento de caracteres não numericos no campo telefone', function(){
        cy.get('#phone').type('teste').should('have.value', '')

    })
    it('Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido', function(){
        cy.get('#phone-checkbox').check()
        cy.get('input[id="firstName"]').type('Matheus').should('have.value', 'Matheus')
        cy.get('input[id="lastName"]').type('Seidel').should('have.value', 'Seidel')
        cy.get('input[id="email"]').type('matheus.seidel@teste.com')
        cy.get('textarea[id="open-text-area"]').type('teste testyuwevfu hueraipfhgirewb', {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('input[id="firstName"]')
          .type('Matheus')
          .should('have.value', 'Matheus')
          .clear()
          .should('have.value','')
        cy.get('input[id="lastName"]')
          .type('Seidel')
          .should('have.value', 'Seidel')
          .clear()
          .should('have.value','')
        cy.get('input[id="email"]')
          .type('matheus.seidel@teste.com')
          .should('have.value','matheus.seidel@teste.com')
          .clear()
          .should('have.value','')
        cy.get('#phone')
          .type('99999999')
          .should('have.value', '99999999')
          .clear()
          .should('have.value','')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){     
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia um formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seelcione um produto (YouTube) por seu texto', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[value="feedback"]')
          .check()
          .should('be.checked')
    })
    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
              .should('be.checked')
        })          
    })
    it('marca ambos checkboxes, depois desmarca o ultimo', function(){
        cy.get('input[type="checkbox"]')
          .should('have.length',2)
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload')
          .should('not.have.value')
          .should(function($input){
            expect($input[0].files.length).to.equal(0)
          })
          .selectFile('cypress/fixtures/example.json')
          .should(function($input){
            // console.log($input)
            // console.log($input[0].files[0].name)
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('#file-upload')
          .should('not.have.value')
          .should(function($input){
            expect($input[0].files.length).to.equal(0)
          })
          .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(function($input){
            // console.log($input)
            // console.log($input[0].files[0].name)
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
          .should(function($input){
            expect($input[0].files.length).to.equal(0)
          })
          .selectFile('@sampleFile')
          .should(function($input){
            // console.log($input)
            // console.log($input[0].files[0].name)
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })
    it('verifica que a politica de provacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
    })
    it('Acessa a pagina da politica de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
}) 