module.exports = [
    (test) => {
        test('"";', {
            type: 'Program',
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "StringLiteral",
                        value: ""
                    }
                }
            ]
        });
    },

    (test) => {
        test('"aab";', {
            type: 'Program',
            body: [
                {
                    "type": "ExpressionStatement",
                    expression: {
                        type: "StringLiteral",
                        value: "aab"
                    }
                }
            ]
        });
    },

    (test) => {
        test('  "aab";  ', {
            type: 'Program',
            body: [
                {
                    "type": "ExpressionStatement",
                    expression: {
                        type: "StringLiteral",
                        value: "aab"
                    }
                }
            ],
        });
    },

    (test) => {
        test('  123;  ', {
            type: 'Program',
            body: [
                {
                    "type": "ExpressionStatement",
                    expression: {
                        type: "NumericLiteral",
                        value: 123
                    }
                }
            ],
        });
    },

    (test) => {
        test('  //qqq\n 12345;  ', {
            type: 'Program',
            body: [
                {
                    "type": "ExpressionStatement",
                    expression: {
                        type: "NumericLiteral",
                        value: 12345
                    }
                }
            ]
        });
    },

    (test) => {
        test(`
        /**aa
        sdsad
        */
         
        "omg";
        
        `, {
            type: 'Program',
            body: [
                {
                    "type": "ExpressionStatement",
                    expression: {
                        type: "StringLiteral",
                        value: "omg"
                    }
                }
            ]
        });
    },
]
