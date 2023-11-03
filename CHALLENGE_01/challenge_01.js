import fs from 'fs'
import { fileURLToPath } from 'url'

// Get the message
// by using fileUrlToPath works in windows too
const messagePath = fileURLToPath(import.meta.resolve('./message_01.txt'))
const CODE = fs.readFileSync(messagePath, 'utf-8')

// Decode
// a Map in JS ensures the entries are in the insertion order
const WORDS = new Map()
for (const word of CODE.split(' ')) {
  const key = word.toLowerCase()
  if (WORDS.has(key)) WORDS.set(key, WORDS.get(key) + 1)
  else WORDS.set(key, 1)
}


// Print
const solution = [...WORDS.entries()]
  .map(([key, value]) => `${key}${value}`)
  .join('')

console.log('message:', solution)
