module.exports = [
    (test) => {
        test(
            `
            if(x){
              y = 10;
            }else{
             let a = 20;
            }
            `,
            {
                type: 'Program',
                body: [
                    {
                        type: "IfStatement",
                        test: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        consequent: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'y'
                                        },
                                        right: {
                                            type: 'NumericLiteral',
                                            value: 10
                                        }
                                    }
                                }
                            ]
                        },
                        alternate: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableStatement',
                                    declarations: [
                                        {
                                            type: 'VariableDeclaration',
                                            id: {
                                                type: 'Identifier',
                                                name: 'a',
                                            },
                                            init: {
                                                type: 'NumericLiteral',
                                                value: 20,
                                            }
                                        }
                                    ]
                                }
                            ],
                        }
                    }
                ]
            }
        )
    }
]
