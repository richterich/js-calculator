class Tokenizer {
  #tokens

  #cursor

  #string

  constructor (tokens) {
    this.#tokens = tokens
  }

  read (string) {
    this.#cursor = 0
    this.#string = string
  }

  next () {
    if (this.#cursor === this.#string.length) {
      return undefined
    }
    const str = this.#string.slice(this.#cursor)
    for (const [pattern, type] of this.#tokens) {
      const [match] = pattern.exec(str) || []
      if (!match) continue
      this.#cursor += match.length
      if (type === null) return this.next()
      return { token: match, type }
    }
    throw new Error(`Unrecognized input: ${str[0]}`)
  }
}

export { Tokenizer as RegexTokenizer }
