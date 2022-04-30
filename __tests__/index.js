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
const ifTests = require("./if-test");
const relationTests = require("./relational-test");
const equalityTests = require("./equality-test");
const unaryTests = require("./unary-test");
const iterationTests = require("./iteration-test");
const functionTests = require("./function-test");
const memebrTests = require("./member-test");
const functionCallTests = require("./function-call-test");
const classTests = require("./class-test");


literalTests.forEach(testRun => testRun(test));
statementTests.forEach(testRun => testRun(test));
blockstatementTests.forEach(testRun => testRun(test));
mathTests.forEach(testRun => testRun(test));
assignmentTests.forEach(testRun => testRun(test));
variableTests.forEach(testRun => testRun(test));
ifTests.forEach(testRun => testRun(test));
relationTests.forEach(testRun => testRun(test));
equalityTests.forEach(testRun => testRun(test));
unaryTests.forEach(testRun => testRun(test));
iterationTests.forEach(testRun => testRun(test));
functionTests.forEach(testRun => testRun(test));
memebrTests.forEach(testRun => testRun(test));
functionCallTests.forEach(testRun => testRun(test));
classTests.forEach(testRun => testRun(test));
console.log("All tests passed");

