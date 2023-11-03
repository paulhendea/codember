import fs from 'fs'
import { fileURLToPath } from 'url'

// Get the message
const messagePath = fileURLToPath(import.meta.resolve('./message_01.txt'))
const CODE = fs.readFileSync(messagePath, 'utf-8')

// Decode
const WORDS = new Map()
for (const word of CODE.split(' ')) {
  const key = word.toLowerCase()
  if (WORDS.has(key)) WORDS.set(key, WORDS.get(key) + 1)
  else WORDS.set(key, 1)
}

// Print
let SOLUTION = ''
WORDS.forEach((value, key) => {
  SOLUTION += `${key}${value}`
})
console.log(SOLUTION)
