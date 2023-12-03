import fs from 'fs'
import { fileURLToPath } from 'url'

// Get the message
// by using fileUrlToPath works in windows too
const databasePath = fileURLToPath(import.meta.resolve('./database_attacked.txt'))
const databaseData = fs.readFileSync(databasePath, 'utf-8')

const NEW_LINE_REGEX = /\r\n|\r|\n/
const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9]+$/
const EMAIL_REGEX = /^\w+@\w+\.\w+$/

function isValidUser (id, username, email, age, location) {
  if (!id || !ALPHA_NUMERIC_REGEX.test(id)) return false
  if (!username || !ALPHA_NUMERIC_REGEX.test(username)) return false
  if (!email || !EMAIL_REGEX.test(email)) return false
  if (age && isNaN(age)) return false
  if (location && typeof location !== 'string') return false

  return true
}

// Get invalid users
const invalidUsers = []
databaseData.split(NEW_LINE_REGEX).forEach((user) => {
  const [id, username, email, age, location] = user.split(',')
  if (!isValidUser(id, username, email, age, location)) invalidUsers.push(username)
})

// Get first letter of every user
const secretMessage = invalidUsers.map((username) => username[0]).join('')

// Print
console.log('Secret message:', secretMessage)
