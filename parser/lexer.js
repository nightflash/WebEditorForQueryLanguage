// TO DO: rewrite arguments for addToken in scanToken()
// check for unary operators and other operators

let operators = require('./operators');

class Lexer {
    constructor(str) {
        this.str = str;
        this.start = 0;
        this.current = 0;
        this.tokens = [];
    }

    scanTokens() {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        this.tokens.push(new Token(operators.EOF, "", null));
        return this.tokens;
    }

    scanToken() {
        let c = this.advance();
            switch (c) {
                case '(': this.addToken(Object.keys(operators)[0]); break;
                case ')': this.addToken(Object.keys(operators)[1]); break;
                case '{': this.addToken(Object.keys(operators)[2]); break;
                case '}': this.addToken(Object.keys(operators)[3]); break;
                case '\,': this.addToken(Object.keys(operators)[4]); break;
                case '\.': this.addToken(Object.keys(operators)[5]); break;
                case '-': this.addToken(Object.keys(operators)[6]); break;
                case '\+': this.addToken(Object.keys(operators)[7]); break;
                case ';': this.addToken(Object.keys(operators)[8]); break;
                case '\*': this.addToken(Object.keys(operators)[9]); break;
                case '\/': this.addToken(Object.keys(operators)[10]); break;
                case '!': this.addToken(this.match('=') ? Object.keys(operators)[12] :
                    Object.keys(operators)[11]); break;
                case '=': this.addToken(this.match('=') ? Object.keys(operators)[14] :
                    Object.keys(operators)[13]); break;
                case '<': this.addToken(this.match('=') ? Object.keys(operators)[16] :
                    Object.keys(operators)[15]); break;
                case '>': this.addToken(this.match('=') ? Object.keys(operators)[18] :
                    Object.keys(operators)[17]); break;
                case ':': this.addToken(Object.keys(operators)[19]); break;
                case ' ':
                case '\r':
                case '\t':
                case '\n': break;
                default: if (this.isDigit(c)) {
                    this.number();
                } else {
                    throw 'Unexpected token';
                }
            }
    }

    isAtEnd() {
        return this.current >= this.str.length;
    }

    advance() {
        this.current++;
        return this.str[this.current - 1];
    }

    addToken(type) {
        if (arguments[1] === undefined) {
            this.tokens.push(new Token(type, null));
        }

        else if (typeof arguments[1] === 'object'){
            let text = this.str.substring(this.start - this.current);
            this.tokens.push(new Token(type, text, arguments[1]));
        }

        else {
            this.tokens.push(new Token(type, arguments[1].toString(), arguments[1]));
        }

    }

    match(expected) {
        if (this.isAtEnd()) return false;
        if (this.str[this.current] !== expected) return false;

        this.current++;
        return true;
    }

    isDigit(c) {
        return /[\d]/.test(c);
    };

    number() {
        while (this.isDigit(this.peek())) this.advance();
        if (this.peek() === '.' && this.isDigit(this.peekNext())) {
            this.advance();

            while (this.isDigit(this.peek())) this.advance();
        }
        this.addToken('NUMBER', parseFloat(this.str.substring(this.start, this.current)));
    }

    peek() {
        if (this.isAtEnd()) return '\0';
        return this.str[this.current];
    }

    peekNext() {
        if (this.current + 1 >= this.str.length) return '\0';
        return this.str[this.current + 1];
    }
}

class Token {
    constructor(type, lexeme, literal) {
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
    }

    toString() {
        return this.type + " " + this.lexeme + " " + this.literal;
    }
}

const keywords = Object.freeze({
    AND: 'and', // 1
    IF: 'if', // 2
    OR: 'or', // 3
    FALSE: 'false', // 4
    TRUE: 'true', // 5
    PROJECT: 'project' // 6
});

module.exports = Lexer;