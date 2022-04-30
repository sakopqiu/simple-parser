module.exports = [
    (test) => {
        test(
            `
        2+20;
      `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'BinaryExpression',
                            operator: '+',
                            left: {
                                type: 'NumericLiteral',
                                value: 2
                            },
                            right: {
                                type: 'NumericLiteral',
                                value: 20
                            }
                        }
                    }
                ]
            }
        );
    },


    (test) => {
        test(
            `
        1-2+20;
      `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'BinaryExpression',
                            operator: '+',
                            left: {
                                type: 'BinaryExpression',
                                operator: '-',
                                left: {
                                    type: 'NumericLiteral',
                                    value: 1
                                },
                                right: {
                                    type: 'NumericLiteral',
                                    value: 2
                                }
                            },
                            right: {
                                type: 'NumericLiteral',
                                value: 20
                            }
                        }
                    }
                ]
            }
        );
    },

    (test) => {
        test(
            `
        1-2*20;
      `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'BinaryExpression',
                            operator: '-',
                            left: {
                                type: 'NumericLiteral',
                                value: 1
                            },
                            right: {
                                type: 'BinaryExpression',
                                operator: '*',
                                left: {
                                    type: 'NumericLiteral',
                                    value: 2
                                },
                                right: {
                                    type: 'NumericLiteral',
                                    value: 20
                                }
                            },
                        }
                    }
                ]
            }
        );
    },

    (test) => {
        test(
            `
        2*23*20;
      `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'BinaryExpression',
                            operator: '*',
                            left: {
                                type: 'BinaryExpression',
                                operator: '*',
                                left: {
                                    type: 'NumericLiteral',
                                    value: 2
                                },
                                right: {
                                    type: 'NumericLiteral',
                                    value: 23
                                }
                            },
                            right: {
                                type: 'NumericLiteral',
                                value: 20
                            }
                        }
                    }
                ]
            }
        );
    },

    (test) => {
        test(
            `
        (2+23)*20;
      `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'BinaryExpression',
                            operator: '*',
                            left: {
                                type: 'BinaryExpression',
                                operator: '+',
                                left: {
                                    type: 'NumericLiteral',
                                    value: 2
                                },
                                right: {
                                    type: 'NumericLiteral',
                                    value: 23
                                }
                            },
                            right: {
                                type: 'NumericLiteral',
                                value: 20
                            }
                        }
                    }
                ]
            }
        );
    },
    (test) => {
        test(
            `
        (2)*20;
      `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'BinaryExpression',
                            operator: '*',
                            left: {
                                type: 'NumericLiteral',
                                value: 2,
                            },
                            right: {
                                type: 'NumericLiteral',
                                value: 20
                            }
                        }
                    }
                ]
            }
        );
    }


];
