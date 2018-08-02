const {compose, curry}   = require('ramda')
const Task               = require('data.task')
const keythereum         = require('keythereum')
const getPassword        = require('./get-password')
const {privateToAddress} = require('ethereumjs-util')
const {hexToBytes, stringFromHex, liftA2} = require('./utils')
    
//    createKey :: () -> Task error {key}
const createKey = Task.of(keythereum.create())

//    privateKeyToAddress :: string -> string
const privateKeyToAddress = compose(stringFromHex, privateToAddress, hexToBytes)

//    getPrivKey :: string -> {key} -> string
const getPrivKey = curry((password, k) =>
  keythereum.recover(password, k).toString('hex'))
  
//    dumpKeyObject = string -> {key} -> {key}
const dumpKeyObject = curry((password, k) =>
  keythereum.dump(password, k.privateKey, k.salt, k.iv))

//    dumpKeyObjectAp :: {key} -> Task error {key}
const dumpKeyObjectLift = k => 
  liftA2(dumpKeyObject, getPassword(), Task.of(k))

//    getPrivKeyLift :: {key} :: Task error string
const getPrivKeyLift = k => 
  liftA2(getPrivKey, getPassword(), Task.of(k))

//    exportKeyToFile :: {key} -> Task error {key}
const exportKeyToFile = k => 
  new Task ((rej, res) => 
    keythereum.exportToFile(k, '', (_, err) => 
      err ? rej(err) : res(k)))

// module.exports :: () -> Task error keyPair
module.exports = 
  createKey.chain(dumpKeyObjectLift)
           .chain(exportKeyToFile)
           .chain(getPrivKeyLift)
           .map(k => {console.log(`\nPrivate key: ${k}`); return k})
           .map(privateKeyToAddress)