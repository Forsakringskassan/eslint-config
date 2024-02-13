module.exports = {
    extends: ["angular"],
    rules: {
        "consistent-this": ["error", "$ctrl", "provider"],
        "angular/component-name": ["error", "/^(exp|fk)[A-Z].*/"],
        "angular/controller-as-vm": ["error", "$ctrl"],
        "angular/di-unused": "error",
        "angular/directive-name": ["error", "/^(exp|fk)[A-Z].*/"],
    },
};
