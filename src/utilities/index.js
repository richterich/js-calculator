/**
 * 
 * @param {HTMLLabelElement} label 
 * @param {HTMLFormElement} form 
 * @param {string} calcState
 * @param {number} delay 
 * @returns 
 */
const createDisplayMessage = (label, form, calcState, delay) => {
  form.className = calcState
  const originText = label.innerText
  let timeoutID = null
  return (message, state) => {
    label.innerText = message
    form.className = state
    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      label.innerText = originText
      form.className = calcState
      clearTimeout(timeoutID)
    }, delay)
  }
}

/**
 * 
 * @param {HTMLCollection} collection 
 * @param {string} type 
 * @returns {HTMLElement[]}
 */
const getElementsByType = (collection, type) => {
  const elements = []
  for (let i = 0; i < collection.length; ++i) {
    if (collection[i].type === type) {
      elements.push(collection[i])
    }
  }
  return elements
}

const expressionSymbols = {
  'obracket': '(',
  'cbracket': ')',
  'add': '+',
  'sub': '-',
  'div': '/',
  'mul': '*',
  'point': '.',
  'zero': '0',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
}

const expressionCommands = {
  'ac': function (input) {
    input.value = ''
  },
  'del': function (input) {
    input.value = input.value.slice(0, input.value.length - 1)
  }
}

export { createDisplayMessage, getElementsByType, expressionSymbols, expressionCommands }
