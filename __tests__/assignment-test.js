module.exports = [
    (test) => {
        test(
            `
            a = b + 10;
            {
               a *= 20;
            }
            `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            operator: '=',
                            left: {
                                type: 'Identifier',
                                name: 'a'
                            },
                            right: {
                                type: 'BinaryExpression',
                                operator: '+',
                                left: {
                                    type: 'Identifier',
                                    name: 'b'
                                },
                                right: {
                                    type: 'NumericLiteral',
                                    value: 10,
                                }
                            }
                        }
                    },
                    {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: "AssignmentExpression",
                                    operator: "*=",
                                    left: {
                                        type: 'Identifier',
                                        name: 'a'
                                    },
                                    right: {
                                        type: 'NumericLiteral',
                                        value: 20,
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        )
    },
    (test) => {
        test(
            `
        a=b=(c + 20) * (a + b);
        `, {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            operator: '=',
                            left: {
                                type: 'Identifier',
                                name: 'a',
                            },
                            right: {
                               type: 'AssignmentExpression',
                                operator: '=',
                                left: {
                                   type: 'Identifier',
                                    name: 'b'
                                },
                                right: {
                                    type: "BinaryExpression",
                                    operator: '*',
                                    left: {
                                        type: "BinaryExpression",
                                        operator: '+',
                                        left: {
                                            type: 'Identifier',
                                            name: 'c'
                                        },
                                        right: {
                                            type: 'NumericLiteral',
                                            value: 20,
                                        }
                                    },
                                    right: {
                                        type: "BinaryExpression",
                                        operator: '+',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                        }
                                    }
                                }
                            }
                        }
                    }
                ],
            }
        )
    }
];
