module.exports = [
    (test) => {
        test(`
        let a = 10;
      `, {
            type: 'Program',
            body: [
                {
                    type: 'VariableStatement',
                    declarations: [
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'a'
                            },
                            init: {
                                type: 'NumericLiteral',
                                value: 10
                            }
                        }
                    ],
                }
            ]
        })
    },
    (test) => {
        test(`
        let a = 10,b, c = (a+"b") * 3, e = f= 4;
        d = 10;
      `, {
            type: 'Program',
            body: [
                {
                    type: 'VariableStatement',
                    declarations: [
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'a'
                            },
                            init: {
                                type: 'NumericLiteral',
                                value: 10
                            }
                        },
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'b'
                            },
                            init: null,
                        },
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'c'
                            },
                            init: {
                                type: 'BinaryExpression',
                                operator: "*",
                                left: {
                                    type: 'BinaryExpression',
                                    operator: "+",
                                    left: {
                                        type: 'Identifier',
                                        name: 'a',
                                    },
                                    right: {
                                        type: 'StringLiteral',
                                        value: 'b'
                                    }
                                },
                                right: {
                                    type: "NumericLiteral",
                                    value: 3
                                }
                            }
                        },
                        {
                            type: 'VariableDeclaration',
                            id:{
                                type: 'Identifier',
                                name: 'e',
                            },
                            init:{
                                type: "AssignmentExpression",
                                operator: "=",
                                left: {
                                    type: 'Identifier',
                                    name: 'f',
                                },
                                right: {
                                    type: 'NumericLiteral',
                                    value: 4
                                }
                            }

                        }
                    ],
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                            type: 'Identifier',
                            name: 'd',
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 10,
                        }
                    },
                }
            ]

        })
    }
]
