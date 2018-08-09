const keythereum = require('keythereum')
    , ethutil = require('ethereumjs-util')

const privateKeyToAddress = privateKey =>
`0x${ethutil.privateToAddress(hexTobytes(privateKey)).toString('hex')}`

const hexTobytes = hex => {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
  bytes.push(parseInt(hex.substr(c, 2), 16))
  return bytes
}

module.exports = password => {
  const dk = keythereum.create()
    , keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv)
    , privateKey = keythereum.recover(password, keyObject)
    , readablePrivKey = privateKey.toString('hex')
  // keythereum.exportToFile(keyObject) // uncomment if you want to save the keystore file
  console.log(
  `Your private key: ${readablePrivKey}`,
  `\nYour public address: ${privateKeyToAddress(readablePrivKey)}`
  )
}

// module.exports = generateKey
