const {curry} = require('ramda')
    , Task = require('data.task')

//    liftA2 :: (a -> b -> c) -> Ap a -> Ap b -> Ap c
const liftA2 = curry((fn, a1, a2) => a1.map(fn).ap(a2))

//    eitherToTask :: Either m -> Task _ password
const eitherToTask = either => Task.of(either.value)

//    getProcessArgs :: Task _ [args]
const getProcessArgs = () => Task.of(process.argv)

//    stringFromHex :: hexString -> string
const stringFromHex = hex => `0x${hex.toString('hex')}`

//    hexToBytes :: string -> [bytes]
const hexToBytes = hex => 
  new Array (hex.length / 2).fill().map((_, i) => parseInt(hex.substr(i * 2, 2), 16))

module.exports = {
  getProcessArgs,
  stringFromHex,
  eitherToTask,
  hexToBytes,
  liftA2,
}