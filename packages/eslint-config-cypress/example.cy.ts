class MyPageObject {
    private selector: string;

    public constructor(selector: string) {
        this.selector = selector;
    }

    public button(): Cypress.Chainable<JQuery<HTMLButtonElement>> {
        return cy.get(`${this.selector} button`);
    }
}

describe("MyComponent", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should contain tests", () => {
        const component = new MyPageObject("selector");
        component.button().should("contain.text", "My button");
    });
});
