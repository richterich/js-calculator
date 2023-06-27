class Environment {
  #fields

  constructor (fields) {
    this.#fields = fields
  }

  lookup (ident) {
    if (ident in this.#fields) {
      return this.#fields[ident]
    }
    throw new Error(`Unspecified identifier "${ident}"`)
  }
}

export { Environment }
