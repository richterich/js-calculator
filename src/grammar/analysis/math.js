class Analyzer {
  #tokenizer

  #lookahead

  constructor (tokenizer) {
    this.#tokenizer = tokenizer
  }

  read (string) {
    this.#tokenizer.read(string)
    this.#lookahead = this.#tokenizer.next()
    return this.#EXPRESSION()
  }

  #eat (...tokenTypes) {
    const token = this.#lookahead
    if (!token) {
      throw new Error(`Unexpected end of input; expected ${tokenTypes}`)
    }
    if (!tokenTypes.includes(token.type)) {
      throw new Error(`Expected ${tokenTypes} === ${token.type}`)
    }
    this.#lookahead = this.#tokenizer.next()
    return token
  }

  #is (...tokenTypes) {
    return tokenTypes.includes(this.#lookahead?.type)
  }

  #EXPRESSION () {
    return this.#ADDITION()
  }

  #ADDITION () {
    let left = this.#MULTIPLICATION()
    while (this.#is('+', '-')) {
      left = {
        type: 'binary',
        left,
        op: this.#eat('+', '-').type,
        right: this.#MULTIPLICATION(),
      }
    }
    return left
  }

  #MULTIPLICATION () {
    let left = this.#EXPONENTIATION()
    while (this.#is('*', '/')) {
      left = {
        type: 'binary',
        left,
        op: this.#eat('*', '/').type,
        right: this.#EXPONENTIATION(),
      }
    }
    return left
  }

  #EXPONENTIATION () {
    let left = this.#BASIC()
    while (this.#is('^')) {
      left = {
        type: 'binary',
        left,
        op: this.#eat('^').type,
        right: this.#BASIC(),
      }
    }
    return left
  }

  #BASIC () {
    if (this.#is('NUMBER')) {
      return {
        type: 'number',
        value: this.#eat('NUMBER').token,
      }
    }
    if (this.#is('IDENT')) {
      return {
        type: 'ident',
        value: this.#eat('IDENT').token,
      }
    }
    if (this.#is('(')) {
      this.#eat('(')
      const expr = this.#EXPRESSION()
      this.#eat(')')
      return expr
    }
    throw new Error('Malformed expression.')
  }
}

export { Analyzer as MathAnalyzer }
