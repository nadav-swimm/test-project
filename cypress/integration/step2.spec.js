
const VALID_FORM_URL = 'https://docs.google.com/forms/d/1koeuPnVQiLFpISCK8ndS1jTarVGFbIVJw6alcNvZypI/edit'
const BAD_FORM_URL = 'https://docs.google.com/forms/d/111/edit'
const URL_INPUT = '.cb-form-input'
const STEP1_SUBMIT_BUTTON = '.cb-form-submit'
const GOOGLE_FILE_PICKER_BUTTON = '.cb-google-docs-button'
const INPUT_CLEAR_BUTTON = '.form-to-chat__form-clear-input-button'
const TITLE = '.form-instruction-title'
const FORM = '#form-to-chat__form'

context('Actions', () => {
  beforeEach(() => {
    cy.visit('localhost:8080/')
  })

  describe('Step 2 - Languages', () => {
    it('Successfully renders languages', ()=> {
      cy.get(URL_INPUT)
        .type(VALID_FORM_URL)
        .then(()=>{
          cy.intercept('POST', '*').as('getLanguages')
          cy.get(STEP1_SUBMIT_BUTTON).click()
          cy.wait('@getLanguages', { timeout: 30000 })
            .get('.cb-form-input').contains('English')
            .get('.vs__actions').click()
            .get('.vs__dropdown-menu :nth-child(6)').click()
            .get('.cb-form-input').contains('Danish')
        });  
    });
  });


  // describe('Sunny days scenarios', () => {
  //   const url = 'https://docs.google.com/forms/d/1gFIJrAFWDe35XiZHn7MaNQuTD3BGFoN1fTVBB5pQp0A/edit'
  //   it('Valid url allows  ', () => {
  //     cy.get('.cb-form-input')
  //       .type(url)
  //       .should('have.value', url)

  //     cy.get('#form-to-chat__form').should('have.class', 'cb-success')

  //     cy.get('.cb-form-submit').click()

  //     cy.intercept('POST', 'https://chat-forms.com/api/exec/deploy-form').as('chatbotReady')

  //     cy.get('.form-generator-preference_set-language').click()

  //     cy.wait('@chatbotReady', { timeout: 30000 })
  //       .its('response.statusCode')
  //       .should('be.oneOf', [200, 304])

  //     cy.get('.success-and-share__sharing-options').click()

  //     cy.get('#uuid-share-email')
  //       .focus()
  //       .type('nadav.avidan.inbox+from_cypress@gmail.com')
  //       .should('have.value', 'nadav.avidan.inbox+from_cypress@gmail.com')

  //     cy.get('#uuid-share-recipient-email input[type="text"]')
  //       .focus()
  //       .type('nadav.avidan.inbox+recipient_cypress@gmail.com')
  //       .should('have.value', 'nadav.avidan.inbox+recipient_cypress@gmail.com')
  //       .type('{enter}')

  //     cy.get('#uuid-share-message-email')
  //       .focus()
  //       .type('cypress test message')
  //       .should('have.value', 'cypress test message')

  //     cy.get('#uuid-share-send').click()

  //     cy.get('#uuid-share-email')
  //       .should('have.value', '')

  //     cy.get('#uuid-share-recipient-email input[type="text"]')
  //       .should('have.value', '')

  //     cy.get('#uuid-share-message-email')
  //       .should('have.value', '')

  //     cy.get('#share-modal__navigation__by-link').click()
  //     cy.get('#share-link__value').click()
  //       .should('not.be.empty')
  //   })
  // })
})
