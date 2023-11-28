import fs from 'fs'
import { fileURLToPath } from 'url'

// Get the message
// by using fileUrlToPath works in windows too
const filesQuarantinePath = fileURLToPath(import.meta.resolve('./files_quarantine.txt'))
const filesQuarantine = fs.readFileSync(filesQuarantinePath, 'utf-8')

const KEY_TO_PRINT = 33 - 1
const NEW_LINE_REGEX = /\r\n|\r|\n/

function getChecksum(name) {
  const LETTERS = new Map()
  name.split('').forEach((letter) => {
    if (LETTERS.has(letter)) LETTERS.set(letter, LETTERS.get(letter) + 1)
    else LETTERS.set(letter, 1)
  })
  return [...LETTERS.keys()].filter((letter) => LETTERS.get(letter) === 1).join('')
}

const REAL_FILES = []
filesQuarantine.split(NEW_LINE_REGEX).forEach((file) => {
  const [name, checksum] = file.split('-')
  if (checksum === getChecksum(name)) REAL_FILES.push(file)
})

// Print
console.log('33rd real file:', REAL_FILES[KEY_TO_PRINT])
