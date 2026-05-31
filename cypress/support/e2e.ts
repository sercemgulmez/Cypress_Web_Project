import './commands';
import 'cypress-axe';
import { register as registerCypressGrep } from '@cypress/grep';
registerCypressGrep();

Cypress.on('uncaught:exception', () => {
  // Public production pages may load third-party scripts unrelated to the QA assertions.
  return false;
});
