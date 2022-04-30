const {Parser} = require("../Parser");
const parser = new Parser();
const asset = require("assert");

function test(program, expected) {
    const ast = parser.parse(program);
    asset.deepEqual(ast, expected);
}

const literalTests = require("./literal-test");
const statementTests = require("./statement-list-test");
const blockstatementTests = require("./blockstatement-test");
const mathTests = require("./math-test");
const assignmentTests = require("./assignment-test");
const variableTests = require("./variable-test");

literalTests.forEach(testRun => testRun(test));
statementTests.forEach(testRun => testRun(test));
blockstatementTests.forEach(testRun => testRun(test));
mathTests.forEach(testRun => testRun(test));
assignmentTests.forEach(testRun => testRun(test));
variableTests.forEach(testRun => testRun(test));
console.log("All tests passed");

