class Compilator {
  #globalEnv
  #evaluator

  constructor (globalEnv, evaluator) {
    this.#globalEnv = globalEnv
    this.#evaluator = evaluator
  }

  compile (string, parser) {
    const ast = parser.read(string)
    return () => this.#evaluator.evaluate(ast, this.#globalEnv)
  }
}

export { Compilator as MathCompilator }
