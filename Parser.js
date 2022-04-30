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
            case ';':
                return this.EmptyStatement();
            case 'if':
                return this.IfStatement();
            case '{':
                return this.BlockStatement();
            case 'let':
                return this.VariableStatement();
            case 'def':
                return this.FunctionDeclaration();
            case 'return':
                return this.ReturnStatement();
            case 'class':
                return this.ClassDeclaration();
            case 'while':
            case 'do':
            case 'for':
                return this.IterationStatement();
            default:
                return this.ExpressionStatement();
        }
    }

    ClassDeclaration() {
        this._eat('class');
        const id = this.Identifier();
        const superClass = this._lookahead.type === 'extends' ? this.ClassExtends() : null;
        const body = this.BlockStatement();

        return {
            type: 'ClassDeclaration',
            id,
            superClass,
            body,
        }
    }

    ClassExtends() {
        this._eat('extends');
        return this.Identifier();
    }

    FunctionDeclaration() {
        this._eat('def');
        const name = this.Identifier();
        this._eat('(');
        const params = this._lookahead.type !== ')' ? this.FormalParameterList() : [];
        this._eat(")");
        const body = this.BlockStatement();
        return {
            type: 'FunctionDeclaration',
            name,
            params,
            body
        }
    }

    FormalParameterList() {
        const params = [];
        do {
            params.push(this.Identifier())
        } while (this._lookahead.type === ',' && this._eat(","));
        return params;
    }

    ReturnStatement() {
        this._eat('return');
        const argument = this._lookahead.type !== ';' ? this.Expression() : null;
        this._eat(';');
        return {
            type: 'ReturnStatement',
            argument,
        }
    }

    IterationStatement() {
        switch (this._lookahead.type) {
            case 'while':
                return this.WhileStatement();
            case 'do':
                return this.DoWhileStatement();
            case 'for':
                return this.ForStatement();
        }
        throw new Error("Invalid iteration lookahead: " + JSON.stringify(this._lookahead, null, 2));
    }

    WhileStatement() {
        this._eat('while');
        this._eat('(');
        const test = this.Expression();
        this._eat(')');
        const body = this.Statement();
        return {
            type: 'WhileStatement',
            test,
            body
        }
    }

    DoWhileStatement() {
        this._eat('do');
        const body = this.Statement();
        this._eat('while');
        this._eat('(');
        const test = this.Expression();
        this._eat(')');
        return {
            type: 'DoWhileStatement',
            test,
            body,
        }
    }

    ForStatement() {
        this._eat("for");
        this._eat("(");
        const init = this._lookahead.type !== ';' ? this.ForStatementInit() : null;
        this._eat(";");
        const test = this._lookahead.type !== ';' ? this.Expression() : null;
        this._eat(";");
        const update = this._lookahead.type !== ')' ? this.Expression() : null;
        this._eat(")");
        const body = this.Statement();
        return {
            type: 'ForStatement',
            init,
            test,
            update,
            body
        };
    }

    ForStatementInit() {
        if (this._lookahead.type === 'let') {
            return this.VariableStatementInit();
        }
        return this.Expression;
    }


    IfStatement() {
        this._eat('if');
        this._eat('(');
        const test = this.Expression();
        this._eat(')');
        const consequent = this.Statement();
        const alternate = this._lookahead !== null && this._lookahead.type === 'else'
            ? this._eat('else') && this.Statement()
            : null;
        return {
            type: 'IfStatement',
            test,
            consequent,
            alternate,
        }
    }

    VariableStatementInit() {
        this._eat("let");
        const declarations = this.VariableDeclarationList();
        return {
            type: "VariableStatement",
            declarations,
        }
    }

    VariableStatement() {
        const variableStatement = this.VariableStatementInit();
        this._eat(";");
        return variableStatement;
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
        } while (this._lookahead.type === ',' && this._eat(','));
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

    VariableInitializer() {
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
        if (node.type === 'Identifier' || node.type === 'MemberExpression') {
            return node;
        }
        throw new SyntaxError("Left side of the assignment should be an identifier");
    }

    /**
     * AssignmentExpression
     *   : RelationalExpression
     *   | LeftHandSideExpression AssignmentOperator AssignmentExpression
     * @returns {any}
     * @constructor
     */
    AssignmentExpression() {
        let left = this.LogicalOrExpression();
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

    LogicalOrExpression() {
        return this._LogicalExpression('LogicalAndExpression', 'LOGICAL_OR');
    }

    LogicalAndExpression() {
        return this._LogicalExpression('EqualityExpression', 'LOGICAL_AND');
    }

    _LogicalExpression(builderName, operatorToken) {
        let left = this[builderName]();
        while (this._lookahead.type === operatorToken) {
            const operator = this._eat(operatorToken).value;
            const right = this[builderName]();
            left = {
                type: 'LogicalExpression',
                operator,
                left,
                right
            }
        }
        return left;
    }

    EqualityExpression() {
        return this._BinaryExpression
        ('RelationalExpression', 'EQUALITY_OPERATOR');
    }

    /**
     * RELATION_OPERATOR
     * > >= <= < ===
     * @returns {*}
     * @constructor
     */
    RelationalExpression() {
        return this._BinaryExpression("AdditiveExpression", 'RELATIONAL_OPERATOR');
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
        return this._BinaryExpression("UnaryExpression", "MULTIPLICATIVE_OPERATOR")
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
        return tokenType === 'NUMBER' || tokenType === 'STRING'
            || tokenType === 'true' || tokenType === 'false'
            || tokenType === 'null'
    }

    UnaryExpression() {
        let operator;
        switch (this._lookahead.type) {
            case 'ADDITIVE_OPERATOR':
                operator = this._eat('ADDITIVE_OPERATOR').value;
                break;
            case 'LOGICAL_NOT':
                operator = this._eat('LOGICAL_NOT').value;
                break;
        }
        // -a,+a,!a
        if (!!operator) {
            return {
                type: 'UnaryExpression',
                operator,
                // 这里递归自己，是考虑了++x这种情况
                argument: this.UnaryExpression(),
            }
        }
        return this.LeftHandSideExpression();
    }

    PrimaryExpression() {
        if (this._isLiteral(this._lookahead.type)) {
            return this.Literal();
        }
        switch (this._lookahead.type) {
            case '(':
                return this.ParenthesizedExpression();
            case 'IDENTIFIER':
                return this.Identifier();
            case 'this':
                return this.ThisExpression();
            case 'new':
                return this.NewExpression();
            default:
                return this.LeftHandSideExpression();
        }
    }

    NewExpression(){
         this._eat('new');
         return {
             type: 'NewExpression',
             callee: this.MemberExpression(),
             arguments: this.Arguments(),
         }
    }

    ThisExpression() {
        this._eat('this');
        return {
            type: 'ThisExpression',
        }
    }

    Super() {
        this._eat('super');
        return {
            type: 'Super',
        }
    }

    LeftHandSideExpression() {
        return this.CallMemberExpression();
    }

    CallMemberExpression() {
        if (this._lookahead.type === 'super') {
            return this._CallExpression(this.Super());
        }
        const member = this.MemberExpression();
        if (this._lookahead.type === '(') {
            return this._CallExpression(member);
        }
        return member;
    }

    _CallExpression(callee) {
        let callExpression = {
            type: 'CallExpression',
            callee,
            arguments: this.Arguments(),
        }
        if (this._lookahead.type === '(') {
            callExpression = this._CallExpression(callExpression);
        }
        return callExpression;
    }

    Arguments() {
        this._eat('(');
        const argumentLists = this._lookahead.type !== ')' ? this.ArgumentList() : [];
        this._eat(')');
        return argumentLists;
    }

    ArgumentList() {
        const argumentList = [];
        do {
            argumentList.push(this.AssignmentExpression());
        } while (this._lookahead.type === ',' && this._eat(','));
        return argumentList;
    }

    MemberExpression() {
        let object = this.PrimaryExpression();
        while (this._lookahead.type === '.' || this._lookahead.type === '[') {
            if (this._lookahead.type === '.') {
                this._eat('.');
                const property = this.Identifier();
                object = {
                    type: 'MemberExpression',
                    computed: false,
                    object,
                    property,
                }
            }
            if (this._lookahead.type === '[') {
                this._eat('[');
                const property = this.Expression();
                this._eat(']');
                object = {
                    type: 'MemberExpression',
                    computed: true,
                    object,
                    property,
                }
            }
        }
        return object;
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
            case 'true':
                return this.BooleanLiteral(true);
            case 'false':
                return this.BooleanLiteral(false);
            case 'null':
                return this.NullLiteral();
        }
        throw new SyntaxError("Literal: unexpected literal production:" + JSON.stringify(this._lookahead, null, 2));
    }

    BooleanLiteral(val) {
        this._eat(val ? 'true' : 'false');
        return {
            type: 'BooleanLiteral',
            value: val,
        }
    }

    NullLiteral() {
        this._eat('null');
        return {
            type: 'NullLiteral',
            value: null,
        }
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
