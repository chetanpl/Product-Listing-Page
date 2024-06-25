describe('template spec', () => {
  it('Match the page title and color', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="title"]').should("have.text","Choose Your Life Style");
    cy.get('[data-testid="productid"]').should('have.css','background-color').and('match',/255, 255, 255/);
    cy.get('[data-testid="productid"]').first('1');
  })
  it('Automation auto enter product name and match with search result',()=>{
    cy.visit('http://localhost:3000')
    const productName = 'Foldsack';
    cy.typeWithDelay('[data-testid="seachInputCtrl"]', productName, 2);
    cy.get('[data-testid="productName"]').contains(productName);
  })
  it('Automation auto click page number and match it with active page',()=>{
    cy.visit('http://localhost:3000')
    const testid="pageNumber2";
    cy.get(`[data-testid=${testid}]`).click();
    cy.get(`[data-testid=${testid}]`).should('have.css', 'background-color')
    .and('eq', 'rgb(76, 175, 80)');
  });
})