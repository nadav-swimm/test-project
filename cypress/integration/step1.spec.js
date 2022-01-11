
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
    cy.visit('http://localhost:8080/#/chatbot')
  })

  describe('Step 1 - valid URL', () => {
    it('Accepts a valid URL', () => {
      cy.intercept('POST', 'https://chat-forms.com/api/exec/deploy-form').as('chatbotReady')
      cy.get('.toggle-to-manual-mode')
        .click()
        .get('.cb-form-submit').should('have.attr', 'disabled')
        .get('.cb-form-input')
        .type(VALID_FORM_URL)
        .then(() => {
          cy.intercept('POST', '*').as('getLanguages')
          cy.get('.cb-form-submit').should('not.have.attr', 'disabled')
          cy.get(FORM).should('have.class', 'cb-success')
          cy.get('.cb-form-submit').click()
        })
        .then(() => {
          cy.wait('@getLanguages', { timeout: 30000 }).then(() => {
            cy.get('#language-options-manual').click()
              .get('.language-selector').click()
              .get('#vs1__option-12').click()
          })

          cy.get('.button-stat-over').click()
            .get('.cb-form-input')
            .should('have.value', '')
        })
        .then(() => {
          cy.get('.cb-form-input')
            .type(VALID_FORM_URL)
            .then(() => {
              cy.get('.cb-form-submit').click()
            })
        })
        .then(() => {
          cy.get('.create-chat-button').click()
        })

      cy.wait('@chatbotReady', { timeout: 30000 })
        .its('response.statusCode')
        .should('be.oneOf', [200, 304])
        .then(() => {
          cy.get('.sharing-option-edit-chat').click()
        })
    })
  })
})
