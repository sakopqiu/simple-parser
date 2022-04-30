module.exports = [
    (test) => {
        test(
            `
            def hello(x,y){
              a = 1;
              return a * 2;
            }
           `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        name: {
                            type: 'Identifier',
                            name: 'hello',
                        },
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                            },
                            {
                                type: 'Identifier',
                                name: 'y'
                            }
                        ],
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
                                            value: 1
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '*',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'NumericLiteral',
                                            value: 2,
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

    (test) => {
        test(
            `def hello(){
          a=1;
          return;
         }
        `,
            {
                "type": "Program",
                "body": [
                    {
                        "type": "FunctionDeclaration",
                        "name": {
                            "type": "Identifier",
                            "name": "hello"
                        },
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "a"
                                        },
                                        "right": {
                                            "type": "NumericLiteral",
                                            "value": 1
                                        }
                                    }
                                },
                                {
                                    "type": "ReturnStatement",
                                    "argument": null
                                }
                            ]
                        }
                    }
                ]
            }
        )
    }
];
