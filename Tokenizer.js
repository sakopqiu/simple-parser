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

    [/^\blet\b/, "let"],

    [/^\d+/, 'NUMBER'],
    [/^\w+/, 'IDENTIFIER'],

    [/^=/, 'SIMPLE_ASSIGN'],
    [/^[\*\/\+\-]=/, 'COMPLEX_ASSIGN'],

    [/^[+\-]/, 'ADDITIVE_OPERATOR'],

    [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],
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
