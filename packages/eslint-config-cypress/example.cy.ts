import { MyPageObject } from "./MyPageObject";

describe("MyComponent", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should contain tests", () => {
        const component = new MyPageObject("selector");
        component.button().should("contain.text", "My button");
    });
});
