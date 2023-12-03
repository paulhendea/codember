import fs from 'fs'
import { fileURLToPath } from 'url'

// Get the message
// by using fileUrlToPath works in windows too
const messagePath = fileURLToPath(import.meta.resolve('./message_02.txt'))
const code = fs.readFileSync(messagePath, 'utf-8')

const OPERATORS = {
  '#': (x) => x + 1,
  '@': (x) => x - 1,
  '*': (x) => x * x,
}
const PRINT_OPERATOR = '&'

/**
 * Compiles the given code and returns the result.
 *
 * @param {string} code - The code to be compiled.
 * @return {string} The compiled result.
 */
function compile (code) {
  let result = ''
  let number = 0
  code.split('').forEach((operator) => {
    if (operator === PRINT_OPERATOR) result += number
    else {
      const operation = OPERATORS[operator]
      number = operation(number)
    }
  })
  return result
}

// Print
console.log('code:', compile(code))
