module.exports = [
    (test) => {
        test(
            `
            if(a = x + 10 + "string" <= d + e){}
          `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'IfStatement',
                        test: {
                            type: 'AssignmentExpression',
                            operator: '=',
                            left: {
                                type: 'Identifier',
                                name: 'a',
                            },
                            right:{
                                type: 'BinaryExpression',
                                operator: '<=',
                                left:{
                                    type: 'BinaryExpression',
                                    operator: '+',
                                    left: {
                                        type: 'BinaryExpression',
                                        operator: '+',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        right: {
                                            type: 'NumericLiteral',
                                            value: 10,
                                        }
                                    },
                                    right:{
                                        type: 'StringLiteral',
                                        value: 'string'
                                    }
                                },
                                right:{
                                    type: 'BinaryExpression',
                                    operator: '+',
                                    left:{
                                        type: 'Identifier',
                                        name: 'd'
                                    },
                                    right:{
                                        type: 'Identifier',
                                        name: 'e'
                                    },
                                }
                            }
                        },
                        consequent: {
                            type: 'BlockStatement',
                            body: [],
                        },
                        alternate: null,
                    }
                ]
            }
        )
    },
];
