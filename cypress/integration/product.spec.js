describe("Product page", () => {
    beforeEach(() => cy.visit(Cypress.env("HOST")));
    
    it("loads the product list sections of the page", () => {
        cy.get("input[type='search']").should("be.visible");
        cy.get(".product-list-core-id").first().should("be.visible");
    });
    
    it("loads product details when a list item is clicked", () => {
        cy.get(".product-list-core-id").first().click();
        cy.get("h3").contains("Core product details");
    });
    
    it("filters products by search term", () => {
        cy.get("input[type='search']").type("Core-0000");
        cy.get(".product-list-core-id").should("have.length", 1);
    });
    
    it("closes details section when cross is clicked", () => {
        cy.get(".product-list-core-id").first().click();
        cy.get("button.btn-close").click();
        cy.contains("Core product details").should("not.exist");
    });
    
    it("updates stock quantities correctly when it is changed by the user", () => {
        cy.get("input[type='search']").type("Core-10000"); // load product with existing stock data
        cy.get(".product-list-core-id").click();
        cy.contains("td", "PHOTO").next().then(($td) => {
            const oldQuantity = parseInt($td.text());
            
            cy.contains("span.fw-bold", "Total quantity").next().then(($span) => {
                const oldTotalQuantity = parseInt($span.text());

                cy.contains("td", "PHOTO").next().next().find("input[type='number']").type(10 + "");
                cy.contains("td", "PHOTO").next().next().next().find("button").click();
                cy.contains("td", "PHOTO").next().should("have.text", oldQuantity + 10 + "");
                cy.contains("span.fw-bold", "Total quantity").next().should("have.text", oldTotalQuantity + 10 + "");
            });
        });
    });
});
