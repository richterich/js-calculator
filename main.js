import {
  GlobalEnv,
  MathCompilator,
  MathEvaluator,
  MathAnalyzer,
  MathTokens,
  RegexTokenizer,
  createDisplayMessage,
  getElementsByType,
  ExprSymbols,
  ExprCommands,
} from './src/index.js'

window.onload = () => {
  const calc = document.forms['calc']
  const expression = calc.elements['expression']
  const buttons = getElementsByType(calc.elements, 'button')
  const displayMessage = createDisplayMessage(expression.labels[0], calc, 'idle', 1500)

  const calculateExpression = event => {
    event.preventDefault()
    try {
      const parser = new MathAnalyzer(new RegexTokenizer(MathTokens))
      const compilator = new MathCompilator(GlobalEnv, new MathEvaluator())
      const evaliation = compilator.compile(expression.value, parser)
      expression.value = evaliation()
      displayMessage('Ok!', 'success')
    } catch (err) {
      displayMessage(err.message, 'error')
    }
  }

  const handleExpression = event => {
    event.preventDefault()
    const { name } = event.target || { name: '' }
    const symbol = ExprSymbols[name]
    const command = ExprCommands[name]
    if (command) command(expression)
    else if (symbol) expression.value += symbol
  }

  calc.addEventListener('submit', calculateExpression)
  buttons.forEach(button => button.addEventListener('click', handleExpression))
}
