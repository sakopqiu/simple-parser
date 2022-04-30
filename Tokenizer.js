const Spec = [
    [/^\s+/, null],

    // single line comment
    [/^\/\/.*/, null],
    // multi line comment
    [/^\/\*[\s\S]*?\*\//, null],

    [/^;/, ';'],
    [/^\{/, "{"],
    [/^\}/, "}"],
    [/^\(/, "("],
    [/^\)/, ")"],
    [/^,/, ","],
    [/^\./, "."],
    [/^\[/, "["],
    [/^\]/, "]"],

    [/^\blet\b/, "let"],
    [/^\bif\b/, "if"],
    [/^\belse\b/, "else"],
    [/^\btrue\b/, "true"],
    [/^\bfalse\b/, "false"],
    [/^\bnull\b/, "null"],
    [/^\bwhile\b/, "while"],
    [/^\bdo\b/, "do"],
    [/^\bfor\b/, "for"],
    [/^\bdef\b/, "def"],
    [/^\breturn\b/, "return"],
    [/^\bclass\b/, "class"],
    [/^\bextends\b/, "extends"],
    [/^\bsuper\b/, "super"],
    [/^\bnew\b/, "new"],
    [/^\bthis\b/, "this"],

    [/^\d+/, 'NUMBER'],
    [/^\w+/, 'IDENTIFIER'],

    [/^[=!]=/, 'EQUALITY_OPERATOR'],

    [/^=/, 'SIMPLE_ASSIGN'],
    [/^[\*\/\+\-]=/, 'COMPLEX_ASSIGN'],

    [/^[+\-]/, 'ADDITIVE_OPERATOR'],

    [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],
    [/^[<>]=?/, 'RELATIONAL_OPERATOR'],

    [/^&&/, 'LOGICAL_AND'],
    [/^\|\|/, 'LOGICAL_OR'],
    [/^!/, 'LOGICAL_NOT'],

    [/^"[^"]*"/, 'STRING'],
    [/^'[^']*'/, 'STRING'],
]

function isNumber(c) {
    return c >= '0' && c <= '9';
}

class Tokenizer {
    constructor() {
    }

    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    isEOF() {
        return this._cursor === this._string.length;
    }

    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    _match(regexp, string) {
        let matched = regexp.exec(string);
        if (matched !== null) {
            this._cursor += matched[0].length;
            return matched[0];
        }
        return null;
    }

    getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }
        const string = this._string.slice(this._cursor);

        for (const [regexp, tokenType] of Spec) {
            const matched = this._match(regexp, string);
            if (!matched) {
                continue;
            }
            // 空白字符，comment
            if (tokenType === null) {
                return this.getNextToken();
            }
            const value = tokenType === 'NUMBER' ? +matched : matched;
            return {
                type: tokenType,
                value,
            }
        }

        throw new SyntaxError("Unexpected token: " + string[0]);
    }
}

module.exports = {
    Tokenizer
}
