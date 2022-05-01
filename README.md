# simple-parser

https://www.bilibili.com/video/BV1Z34y1C77r?p=1
的代码，自己照着写了一遍

支持面向对象语法

```
  class Point {
   def constructor(x,y){
      this.x = x;
      this.y = y;
   }
   
   def calc(){
     return this.x + this.y;
   }
 }
 
 class Point3 extends Point{
   def constructor(x,y,z){
      super(x,y);
      this.z = z;
   }
   
   def calc(){
      for(let i = 0;i < 10;i += 1){
        console.log("hi" + i);
      }
      return super() + this.z;
   }
 }

```
会生成

```json
{
  "type": "Program",
  "body": [
    {
      "type": "ClassDeclaration",
      "id": {
        "type": "Identifier",
        "name": "Point"
      },
      "superClass": null,
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "FunctionDeclaration",
            "name": {
              "type": "Identifier",
              "name": "constructor"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "x"
              },
              {
                "type": "Identifier",
                "name": "y"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "ThisExpression"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "x"
                      }
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "x"
                    }
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "ThisExpression"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "y"
                      }
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "y"
                    }
                  }
                }
              ]
            }
          },
          {
            "type": "FunctionDeclaration",
            "name": {
              "type": "Identifier",
              "name": "calc"
            },
            "params": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "ThisExpression"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "x"
                      }
                    },
                    "right": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "ThisExpression"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "y"
                      }
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      "type": "ClassDeclaration",
      "id": {
        "type": "Identifier",
        "name": "Point3"
      },
      "superClass": {
        "type": "Identifier",
        "name": "Point"
      },
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "FunctionDeclaration",
            "name": {
              "type": "Identifier",
              "name": "constructor"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "x"
              },
              {
                "type": "Identifier",
                "name": "y"
              },
              {
                "type": "Identifier",
                "name": "z"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "Super"
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "x"
                      },
                      {
                        "type": "Identifier",
                        "name": "y"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "ThisExpression"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "z"
                      }
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "z"
                    }
                  }
                }
              ]
            }
          },
          {
            "type": "FunctionDeclaration",
            "name": {
              "type": "Identifier",
              "name": "calc"
            },
            "params": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ForStatement",
                  "init": {
                    "type": "VariableStatement",
                    "declarations": [
                      {
                        "type": "VariableDeclaration",
                        "id": {
                          "type": "Identifier",
                          "name": "i"
                        },
                        "init": {
                          "type": "NumericLiteral",
                          "value": 0
                        }
                      }
                    ]
                  },
                  "test": {
                    "type": "BinaryExpression",
                    "operator": "<",
                    "left": {
                      "type": "Identifier",
                      "name": "i"
                    },
                    "right": {
                      "type": "NumericLiteral",
                      "value": 10
                    }
                  },
                  "update": {
                    "type": "AssignmentExpression",
                    "operator": "+=",
                    "left": {
                      "type": "Identifier",
                      "name": "i"
                    },
                    "right": {
                      "type": "NumericLiteral",
                      "value": 1
                    }
                  },
                  "body": {
                    "type": "BlockStatement",
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "expression": {
                          "type": "CallExpression",
                          "callee": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                              "type": "Identifier",
                              "name": "console"
                            },
                            "property": {
                              "type": "Identifier",
                              "name": "log"
                            }
                          },
                          "arguments": [
                            {
                              "type": "BinaryExpression",
                              "operator": "+",
                              "left": {
                                "type": "StringLiteral",
                                "value": "hi"
                              },
                              "right": {
                                "type": "Identifier",
                                "name": "i"
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                      "type": "CallExpression",
                      "callee": {
                        "type": "Super"
                      },
                      "arguments": []
                    },
                    "right": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "ThisExpression"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "z"
                      }
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
```
