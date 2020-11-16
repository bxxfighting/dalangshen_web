import CryptoJS from 'crypto-js'

export function encrypt(data, secret) {
  console.log('encrypt: ', secret)
  return CryptoJS.AES.encrypt(data, secret).toString()
}

export function decrypt(data, secret) {
  console.log('decrypt: ', secret)
  try {
    return CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.log('error:', error)
    return '密钥不正确'
  }
}
