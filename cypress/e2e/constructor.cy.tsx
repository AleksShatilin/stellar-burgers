/// <reference types="cypress" />

const BUN_NAME = 'Краторная булка N-200i';
const MAIN_NAME = 'Биокотлета из марсианской Магнолии';
const MODAL_TITLE = 'Детали ингредиента';

describe('Страница конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.contains(BUN_NAME, { timeout: 10000 }).should('be.visible');
  });

  it('должна загружаться', () => {
    cy.contains('Соберите бургер').should('be.visible');
  });

  it('должен добавлять булку в конструктор', () => {
    cy.contains(BUN_NAME).parent().parent().contains('Добавить').click();
    cy.get('.constructor-element').should('have.length', 2);
  });

  it('открывает модальное окно ингредиента при клике на карточку', () => {
    cy.contains(BUN_NAME).click();
    cy.contains(MODAL_TITLE).should('be.visible');
  });

  it('закрывает модальное окно по клику на крестик', () => {
    cy.contains(BUN_NAME).click();
    cy.contains(MODAL_TITLE).should('be.visible');
    cy.contains(MODAL_TITLE).parent().find('button').click();
    cy.contains(MODAL_TITLE).should('not.exist');
  });

  it('закрывает модальное окно по клику на оверлей', () => {
    cy.contains(BUN_NAME).click();
    cy.contains(MODAL_TITLE).should('be.visible');
    cy.get('body').click(0, 0);
    cy.contains(MODAL_TITLE).should('not.exist');
  });

it('должен создавать заказ', () => {
  cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
  cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

  cy.window().then((win) => {
    win.localStorage.setItem('accessToken', 'mock-token');
    win.localStorage.setItem('refreshToken', 'mock-token');
  });

  cy.wait('@getUser', { timeout: 10000 });

  cy.contains(BUN_NAME).parent().parent().contains('Добавить').click();
  cy.contains(MAIN_NAME).parent().parent().contains('Добавить').click();

  cy.contains('Оформить заказ').should('be.enabled').click();

  cy.wait('@createOrder', { timeout: 10000 });

  cy.contains('12345').should('be.visible');
  cy.get('body').click(0, 0);
  cy.get('.constructor-element').should('have.length', 0);
});
});