/* require should be allowed */
const fs = require("fs");

/* Promise and ES6+ should be allowed */
export const myFunc = () =>
    Promise.resolve(fs.readFileSync("foo.txt", "utf-8"));

/* console should be allowed */
console.log(myFunc());
