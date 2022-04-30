module.exports = [
    (test) => {
        test(
            `x > 0 == true;`,
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'BinaryExpression',
                            operator: '==',
                            left: {
                                type: 'BinaryExpression',
                                operator: '>',
                                left: {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                right: {
                                    type: 'NumericLiteral',
                                    value: 0,
                                }
                            },
                            right: {
                                type: 'BooleanLiteral',
                                value: true
                            }
                        }
                    }
                ]
            }
        )
    },
    (test) => {
        test(
            `x > 0 != false;`,
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'BinaryExpression',
                            operator: '!=',
                            left: {
                                type: 'BinaryExpression',
                                operator: '>',
                                left: {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                right: {
                                    type: 'NumericLiteral',
                                    value: 0,
                                }
                            },
                            right: {
                                type: 'BooleanLiteral',
                                value: false
                            }
                        }
                    }
                ]
            }
        )
    },
    (test) => {
        test(
            `if(x > 1 && y == 2 || z != 2){}`,
            {
                type: 'Program',
                body: [
                    {
                        type: 'IfStatement',
                        test: {
                            type: 'LogicalExpression',
                            operator: '||',
                            left: {
                                type: 'LogicalExpression',
                                operator: '&&',
                                left: {
                                    type: 'BinaryExpression',
                                    operator: '>',
                                    left: {
                                        type: 'Identifier',
                                        name: 'x'
                                    },
                                    right: {
                                        type: 'NumericLiteral',
                                        value: 1,
                                    }
                                },
                                right: {
                                    type: 'BinaryExpression',
                                    operator: '==',
                                    left: {
                                        type: 'Identifier',
                                        name: 'y'
                                    },
                                    right: {
                                        type: 'NumericLiteral',
                                        value: 2,
                                    }
                                }
                            },
                            right: {
                                type: 'BinaryExpression',
                                operator: '!=',
                                left: {
                                    type: 'Identifier',
                                    name: 'z'
                                },
                                right: {
                                    type: 'NumericLiteral',
                                    value: 2,
                                }
                            }
                        },
                        consequent: {
                            type: 'BlockStatement',
                            body: [],
                        },
                        alternate: null,
                    }
                ],
            }
        )
    }
];
