module.exports = [
    // while
    (test) => {
        test(
            `
          while (a > 0) {
             ++x;
          }
          `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'WhileStatement',
                        test: {
                            type: 'BinaryExpression',
                            operator: '>',
                            left: {
                                type: 'Identifier',
                                name: 'a'
                            },
                            right: {
                                type: 'NumericLiteral',
                                value: 0,
                            }
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'UnaryExpression',
                                        operator: '+',
                                        argument: {
                                            type: 'UnaryExpression',
                                            operator: '+',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'x'
                                            }
                                        }
                                    }
                                }
                            ]
                        }

                    }
                ]
            }
        )
    },
    // do while
    (test) => {
        test(
            `
          do {
             a = 123;
             ++x;
          } while((a > 0);
          `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'DoWhileStatement',
                        test: {
                            type: 'BinaryExpression',
                            operator: '>',
                            left: {
                                type: 'Identifier',
                                name: 'a'
                            },
                            right: {
                                type: 'NumericLiteral',
                                value: 0,
                            }
                        },
                        body: {
                            type: 'BlockStatement',
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
                                            type: 'NumericLiteral',
                                            value: 123,
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'UnaryExpression',
                                        operator: '+',
                                        argument: {
                                            type: 'UnaryExpression',
                                            operator: '+',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'x'
                                            }
                                        }
                                    }
                                }
                            ]
                        }

                    }
                ]
            }
        )
    },
    // for case 1
    (test) => {
        test(
            `
          for(let i = 0, z="aa";i < 10;i+=1){
             a = 10;
          }
          `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'ForStatement',
                        init: {
                            type: 'VariableStatement',
                            declarations: [
                                {
                                    type: 'VariableDeclaration',
                                    id: {
                                        type: 'Identifier',
                                        name: 'i'
                                    },
                                    init: {
                                        type: 'NumericLiteral',
                                        value: 0,
                                    }
                                },
                                {
                                    type: 'VariableDeclaration',
                                    id: {
                                        type: 'Identifier',
                                        name: 'z'
                                    },
                                    init: {
                                        type: 'StringLiteral',
                                        value: "aa",
                                    }
                                }
                            ]
                        },
                        test: {
                            type: 'BinaryExpression',
                            operator: '<',
                            left: {
                                type: 'Identifier',
                                name: 'i',
                            },
                            right: {
                                type: 'NumericLiteral',
                                value: 10,
                            }
                        },
                        update: {
                            type: 'AssignmentExpression',
                            operator: '+=',
                            left: {
                                type: 'Identifier',
                                name: 'i'
                            },
                            right: {
                                type: 'NumericLiteral',
                                value: 1
                            }
                        },
                        body: {
                            type: 'BlockStatement',
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
                                            type: 'NumericLiteral',
                                            value: 10,
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        )
    },
    // for empty
    (test) => {
        test(`
        for(;;){
        }
        `, {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    init: null,
                    test: null,
                    update: null,
                    body: {
                        type: 'BlockStatement',
                        body: [],
                    }
                }
            ]
        })
    }
]
