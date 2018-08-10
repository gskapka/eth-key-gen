const Task       = require('data.task')
    , keythereum = require('keythereum')
    , ethutil    = require('ethereumjs-util')
    , {compose, map} = require('ramda')

//    privateKeyToAddress :: string -> string
const privateKeyToAddress = privateKey =>
  `0x${ethutil.privateToAddress(hexToBytes(privateKey)).toString('hex')}`

//    hexToBytes :: string -> [bytes]
const hexToBytes = hex => 
  new Array (hex.length/2).fill().map((_, i) => parseInt(hex.substr(i * 2, 2), 16))

//    createKey :: () -> Task error {key}
const createKey = () => 
  new Task ((_, res) => res(keythereum.create()))

//    keyObject = string -> {string} -> {string}
const keyObject = (password, ck) =>
  keythereum.dump(password, ck.privateKey, ck.salt, ck.iv)

//    getPrivKey :: string -> {string} -> string
const getPrivKey = (password, keyObj) =>
  keythereum.recover(password, keyObj).toString('hex')

//    generatePrivKey :: string -> Task error privKey
const generatePrivKey = password => 
  createKey()
    .map(k => keyObject(password, k))
    .map(k => getPrivKey(password, k))
//   compose(map(getPrivKey(password)), map(keyObject(password)), createKey)

//    logKeyPairs :: string -> Task error ethAddress
const logKeyPairs = password =>
  generatePrivKey(password)
    .map(m => console.log(`Private key: ${m}`) || m)
    .map(privateKeyToAddress)

// IMPURE!
// module.exports :: string -> ethereum key pair
module.exports = password => 
  logKeyPairs(password)
    .fork(e => console.log(`Error ${e}`),
          r => console.log(`Public address: ${r}`))
