module.exports = [
    (test) => {
        test(
            `
       foo(x);
    `, {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: 'foo'
                            },
                            arguments: [
                                {
                                    type: 'Identifier',
                                    name: 'x',
                                }
                            ]
                        }
                    }
                ]
            }
        );
    },
    (test) => {
        test(
            `
       foo(x)();
    `, {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: 'foo'
                                },
                                arguments: [
                                    {
                                        type: 'Identifier',
                                        name: 'x',
                                    }
                                ]
                            },
                            arguments: [],
                        }
                    }
                ]
            }
        );
    },
    (test) => {
        test(
            `console.log(x.y);`,
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'console'
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'log'
                                }
                            },
                            arguments: [
                                {
                                    type: 'MemberExpression',
                                    computed: false,
                                    object: {
                                        type: 'Identifier',
                                        name: 'x',
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'y',
                                    }
                                },
                            ]

                        }
                    }
                ]
            }
        )
    }
]
