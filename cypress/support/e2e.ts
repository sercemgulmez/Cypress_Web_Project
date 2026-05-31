import './commands';
import 'cypress-axe';
import '@cypress/grep/src/support';

Cypress.on('uncaught:exception', () => {
  // Public production pages may load third-party scripts unrelated to the QA assertions.
  return false;
});
