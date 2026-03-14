/// <reference types="cypress" />

describe('Страница конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должна загружаться', () => {
    cy.contains('Соберите бургер').should('be.visible');
  });

  it('должен добавлять булку в конструктор', () => {
    cy.contains('Краторная булка N-200i').parent().parent().contains('Добавить').click();
    cy.get('.constructor-element').should('have.length', 2);
  });

  it('открывает модальное окно ингредиента при клике на карточку', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('be.visible');
  });

  it('закрывает модальное окно по клику на крестик', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Детали ингредиента').parent().find('button').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрывает модальное окно по клику на оверлей', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('be.visible');
    cy.get('body').click(0, 0);
    cy.contains('Детали ингредиента').should('not.exist');
  });

it('должен создавать заказ', () => {
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');

  cy.window().then((win) => {
    win.localStorage.setItem('accessToken', 'mock-token');
    win.localStorage.setItem('refreshToken', 'mock-token');
  });

  cy.contains('Краторная булка N-200i').parent().parent().contains('Добавить').click();
  cy.contains('Биокотлета из марсианской Магнолии').parent().parent().contains('Добавить').click();
  cy.contains('Оформить заказ').click();
  cy.wait('@createOrder');

  // Проверяем, что номер заказа отображается
  cy.contains('12345').should('be.visible');

  // Закрываем модалку кликом по оверлею
  cy.get('body').click(0, 0);

  cy.get('.constructor-element').should('have.length', 0);
});
});