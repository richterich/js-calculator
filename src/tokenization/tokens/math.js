const tokens = [
  [/^\s+/, null],
  [/^-?\d+(?:\.\d+)?/, 'NUMBER'],
  [/^[a-zA-Z]+/, 'IDENT'],
  [/^\+/, '+'],
  [/^-/, '-'],
  [/^\*/, '*'],
  [/^\^/, '^'],
  [/^\//, '/'],
  [/^\(/, '('],
  [/^\)/, ')'],
];

export { tokens as MathTokens }
