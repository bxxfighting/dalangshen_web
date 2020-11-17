const digit = '0123456789'
const lowLetter = 'abcdefghijklmnopqrstuvwxyz'
const upperLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const symbol = './@#?!$'
const bank = {
  'easy': digit,
  'normal': digit + lowLetter,
  'complex': digit + lowLetter + upperLetter + symbol
}

export function genPassword(length, type) {
  console.log('type: ', type)
  const selects = bank[type]
  console.log('selects: ', selects)
  let password = ''
  for (let i = 0; i < length; i ++) {
      password += selects[Math.floor(Math.random() * selects.length)]
  }
  return password
}
