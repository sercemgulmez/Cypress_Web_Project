import './commands';

Cypress.on('uncaught:exception', () => {
  // Public production pages may load third-party scripts unrelated to the QA assertions.
  return false;
});
