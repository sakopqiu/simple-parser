const {Tokenizer} = require("./Tokenizer");

class Parser {
    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }

    parse(string) {
        this._string = string;
        this._tokenizer.init(string);

        this._lookahead = this._tokenizer.getNextToken();
        return this.Program();
    }

    Program() {
        return {
            type: 'Program',
            body: this.StatementList(),
        }
    }

    StatementList(stopLookahead = null) {
        const statementList = [this.Statement()];
        while (this._lookahead !== null &&
        this._lookahead.type !== stopLookahead) {
            statementList.push(this.Statement());
        }
        return statementList;
    }

    Statement() {
        switch (this._lookahead.type) {
            case '{':
                return this.BlockStatement();
            case ';':
                return this.EmptyStatement();
            case 'let':
                return this.VariableStatement();
            default:
                return this.ExpressionStatement();
        }
    }

    VariableStatement() {
        this._eat("let");
        const declarations = this.VariableDeclarationList();
        this._eat(";");
        return {
            type: "VariableStatement",
            declarations,
        }
    }

    EmptyStatement() {
        this._eat(';');
        return {
            type: 'EmptyStatement'
        }
    }

    BlockStatement() {
        this._eat("{");
        const body = this._lookahead.type === '}' ? [] : this.StatementList('}');
        this._eat("}");
        return {
            type: 'BlockStatement',
            body,
        }
    }

    ExpressionStatement() {
        const expression = this.Expression();
        this._eat(";");
        return {
            type: "ExpressionStatement",
            expression,
        }
    }

    VariableDeclarationList() {
        const declarations = [];
        do {
            declarations.push(this.VariableDeclaration());
        } while (this._lookahead.type === ',' &&  this._eat(','));
        return declarations;
    }

    VariableDeclaration() {
        const id = this.Identifier();
        const init = this._lookahead.type !== ';' && this._lookahead.type !== ','
            ? this.VariableInitializer()
            : null;

        return {
            type: "VariableDeclaration",
            id,
            init,
        }
    }

    VariableInitializer(){
        this._eat('SIMPLE_ASSIGN');
        // 这里不用AdditiveExpression的原因，
        // 是考虑了 let a = b = 20;即right是一个赋值表达式
        return this.AssignmentExpression();
    }


    Expression() {
        return this.AssignmentExpression();
    }

    _isAssignmentOperator(tokenType) {
        return tokenType === 'SIMPLE_ASSIGN' || tokenType === 'COMPLEX_ASSIGN';
    }

    _checkValidAssignmentTarget(node) {
        if (node.type === 'Identifier') {
            return node;
        }
        throw new SyntaxError("Left side of the assignment should be an identifier");
    }

    AssignmentExpression() {
        let left = this.AdditiveExpression();
        if (!this._isAssignmentOperator(this._lookahead.type)) {
            return left;
        }
        return {
            type: 'AssignmentExpression',
            operator: this.AssignmentOperator().value,
            left: this._checkValidAssignmentTarget(left),
            right: this.AssignmentExpression(),
        }
    }


    AssignmentOperator() {
        if (this._lookahead.type === 'SIMPLE_ASSIGN') {
            return this._eat('SIMPLE_ASSIGN');
        }
        return this._eat('COMPLEX_ASSIGN');
    }

    AdditiveExpression() {
        return this._BinaryExpression("MultiplicativeExpression", "ADDITIVE_OPERATOR");
    }

    MultiplicativeExpression() {
        return this._BinaryExpression("PrimaryExpression", "MULTIPLICATIVE_OPERATOR")
    }

    _BinaryExpression(builderName, operationToken) {
        let left = this[builderName]();
        while (this._lookahead.type === operationToken) {
            const operator = this._eat(operationToken).value;
            const right = this[builderName]();
            left = {
                type: 'BinaryExpression',
                operator,
                left,
                right
            }
        }
        return left;
    }

    _isLiteral(tokenType) {
        return tokenType === 'NUMBER' || tokenType === 'STRING';
    }

    PrimaryExpression() {
        if (this._isLiteral(this._lookahead.type)) {
            return this.Literal();

        }
        switch (this._lookahead.type) {
            case '(':
                return this.ParenthesizedExpression();
            default:
                return this.LeftHandSideExpression();
        }
    }

    LeftHandSideExpression() {
        return this.Identifier();
    }

    Identifier() {
        const name = this._eat('IDENTIFIER').value;
        return {
            type: 'Identifier',
            name,
        }
    }

    ParenthesizedExpression() {
        this._eat("(");
        const expression = this.Expression();
        this._eat(")");
        return expression;
    }

    Literal() {
        switch (this._lookahead.type) {
            case 'NUMBER':
                return this.NumericLiteral();
            case 'STRING':
                return this.StringLiteral();
        }
        throw new SyntaxError("Literal: unexpected literal production:" + JSON.stringify(this._lookahead, null, 2));
    }

    StringLiteral() {
        const token = this._eat("STRING");
        return {
            type: "StringLiteral",
            value: token.value.slice(1, -1),
        }
    }

    /**
     * NumericLiteral
     *   :NUMBER
     *   ;
     * @constructor
     */
    NumericLiteral() {
        const token = this._eat("NUMBER");
        return {
            type: 'NumericLiteral',
            value: Number(token.value)
        }
    }

    _eat(tokenType) {
        const token = this._lookahead;
        if (token === null) {
            throw new Error("Unexpected end of input, expected: " + tokenType);
        }
        if (token.type !== tokenType) {
            if (token === null) {
                throw new Error("Unexpected token " + token.value + ", expected: " + tokenType);
            }
        }
        this._lookahead = this._tokenizer.getNextToken();
        return token;
    }

}

module.exports = {
    Parser,
}
