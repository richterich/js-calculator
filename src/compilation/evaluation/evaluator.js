class Evaluator {
  #binaryEval (op, left, right) {
    if (op === '+') {
      return left + right
    }
    if (op === '-') {
      return left - right
    }
    if (op === '*') {
      return left * right
    }
    if (op === '/') {
      return left / right
    }
    if (op === '^') {
      return left ** right
    }
  }

  evaluate (node, env) {
    switch (node.type) {
      case 'binary': {
        const left = this.evaluate(node.left, env)
        const right = this.evaluate(node.right, env)
        return this.#binaryEval(node.op, left, right)
      }
      case 'ident': {
        return env.lookup(node.value)
      }
      case 'number': {
        return +node.value
      }
    }
  }
}

export { Evaluator as MathEvaluator }
