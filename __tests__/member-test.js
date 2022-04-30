module.exports = [
    (test) => {
        test(
            `
           x.y = 20;
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
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: "x"
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'y'
                                }
                            },
                            right: {
                                type: 'NumericLiteral',
                                value: 20,
                            }
                        }
                    }
                ]
            }
        )
    },
    (test) => {
        test(
            `
           x[0] = 20;
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
                                type: 'MemberExpression',
                                computed: true,
                                object: {
                                    type: 'Identifier',
                                    name: "x"
                                },
                                property: {
                                    type: 'NumericLiteral',
                                    value: 0,
                                }
                            },
                            right: {
                                type: 'NumericLiteral',
                                value: 20,
                            }
                        }
                    }
                ]
            }
        )
    },
    (test) => {
        test(
            `
           a.b.c['d']  = 20;
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
                                type: 'MemberExpression',
                                computed: true,
                                object: {
                                    type: 'MemberExpression',
                                    computed: false,
                                    object: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: "b",
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'c',
                                    }
                                },
                                property: {
                                    type: 'StringLiteral',
                                    value: 'd'
                                }
                            },
                            right: {
                                type: 'NumericLiteral',
                                value: 20,
                            }
                        }
                    }
                ]
            }
        )
    }
];
