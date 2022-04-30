module.exports = [
    (test) => {
        test(`
         "this is a test";
         123;
         "with some space" ;
      `, {
                type: 'Program',
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "StringLiteral",
                            value: "this is a test"
                        }
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
                            value: "with some space"
                        }
                    }
                ]
            }
        )
    }
]
