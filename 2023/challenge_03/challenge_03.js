import fs from 'fs'
import { fileURLToPath } from 'url'

// Get the message
// by using fileUrlToPath works in windows too
const encryptionPoliciesPath = fileURLToPath(import.meta.resolve('./encryption_policies.txt'))
const encryptionPolicies = fs.readFileSync(encryptionPoliciesPath, 'utf-8')

const KEY_TO_PRINT = 42 - 1
const NEW_LINE_REGEX = /\r\n|\r|\n/
const wrongKeys = []
encryptionPolicies.split(NEW_LINE_REGEX).forEach((encryptionPolicy) => {
  // Encryption policy example
  // 1-3 a: abcde
  const [policy, key] = encryptionPolicy.split(': ')
  const [limit, letter] = policy.split(' ')
  const [min, max] = limit.split('-')
  const ocurrences = key.match(new RegExp(letter, 'g'))?.length ?? 0
  if (ocurrences < min || ocurrences > max) wrongKeys.push(key)
})

// Print
console.log('42nd wrong key:', wrongKeys[KEY_TO_PRINT])
