const {Left, Right} = require('data.either')
const {compose, curry, map, chain} = require('ramda')
const {eitherToTask, getProcessArgs} = require('./utils')

//    getArgAfterFlag :: string -> [string] -> Either default password
const getArgAfterFlag = curry((flag, args) => 
  !args.includes(flag)
    ? Left('default password')
    : args[args.indexOf(flag) + 1] 
    ? Right(args[args.indexOf(flag) + 1])
    : Left('default password'))

//    getPasswordArg :: [string] -> Either default password
const getPasswordArg = getArgAfterFlag('--p')

// module.exports :: () -> Task error password
module.exports = compose(chain(eitherToTask), map(getPasswordArg), getProcessArgs)