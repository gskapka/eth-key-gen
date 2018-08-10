const {compose}          = require('ramda')
const Task               = require('data.task')
    , keythereum         = require('keythereum')
    , {privateToAddress} = require('ethereumjs-util')

//    stringFromHex :: hexString -> string
const stringFromHex = hex =>
  `0x${hex.toString('hex')}`

//    hexToBytes :: string -> [bytes]
const hexToBytes = hex => 
  new Array (hex.length/2).fill().map((_, i) => parseInt(hex.substr(i * 2, 2), 16))

  //    privateKeyToAddress :: string -> string
const privateKeyToAddress = compose(stringFromHex, privateToAddress, hexToBytes)

//    createKey :: () -> Task error {key}
const createKey = _ => 
  new Task ((_, res) => res(keythereum.create()))

//    keyObject = string -> {key} -> {key}
const keyObject = (password, k) =>
  keythereum.dump(password, k.privateKey, k.salt, k.iv)

//    getPrivKey :: string -> {key} -> string
const getPrivKey = (password, keyObj) =>
  keythereum.recover(password, keyObj).toString('hex')

//    generatePrivKey :: string -> Task error privKey
const generatePrivKey = password => 
  createKey()
    .map(k => keyObject(password, k))
    .map(k => getPrivKey(password, k))

// IMPURE! module.exports :: string -> ethereum key pair
module.exports = password => 
  generatePrivKey(password)
    .map(m => console.log(`Private key: ${m}`) || m)
    .map(privateKeyToAddress)
    .fork(e => console.log(`Error ${e}`),
          r => console.log(`Public address: ${r}`))
