import { Environment, MathCompilator, MathEvaluator } from './compilation/index.js'
import { MathAnalyzer } from './grammar/index.js'
import { MathTokens, RegexTokenizer } from './tokenization/index.js'
import { createDisplayMessage, getElementsByType, expressionSymbols, expressionCommands } from './utilities/index.js'

const globalEnv = new Environment({
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  log: (n, base) => Math.log(n) / Math.log(base),
})

export {
  globalEnv as GlobalEnv,
  MathCompilator,
  MathEvaluator,
  MathAnalyzer,
  MathTokens,
  RegexTokenizer,
  createDisplayMessage,
  getElementsByType,
  expressionSymbols as ExprSymbols,
  expressionCommands as ExprCommands,
}
