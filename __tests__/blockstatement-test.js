module.exports = [
    (test) => {
        test(`
         {
            "aa";
            123;
         }
      `, {
                type: 'Program',
                body: [
                    {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "StringLiteral",
                                    value: "aa",
                                }
                            },
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "NumericLiteral",
                                    value: 123,
                                }
                            }
                        ]
                    }

                ]
            }
        )
    },
    (test) => {
        test(`
      {
        // comment 1
        
        /*
          comment 2
        */
      }
      123;
      "aaa";
      
      `, {
            type: 'Program',
            body: [
                {
                    type: 'BlockStatement',
                    body: [],
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NumericLiteral",
                        value: 123,
                    }
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "StringLiteral",
                        value: "aaa",
                    }
                }
            ]
        })
    },
    (test) => {
        test(
            `
              {
                123;
                 {
                   "aa";
                 }
                "ok";
              }
              "ok123";
              ;;
            `,
            {
                type: 'Program',
                body: [
                    {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "NumericLiteral",
                                    value: "123",
                                }
                            },
                            {
                                type: "BlockStatement",
                                body: [
                                    {
                                        type: "ExpressionStatement",
                                        expression: {
                                            type: "StringLiteral",
                                            value: "aa",
                                        }
                                    }
                                ],
                            },
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "StringLiteral",
                                    value: "ok",
                                }
                            }
                        ],
                    },
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "StringLiteral",
                            value: "ok123",
                        }
                    },
                    {
                        type: "EmptyStatement",
                    },
                    {
                        type: "EmptyStatement",
                    }
                ],
            }
        )
    },
]
