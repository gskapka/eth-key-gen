// Danger - impure!
// () -> Task error keyPair
require('./lib/generate-key-pair')
  .fork(e => console.log(`Error creating key pair: ${e}`),
        r => console.log(
        `\nPrivate key & public address pair generated.
         \nPublic addr: ${r}
         \nKeyfile saved to ${__dirname}\\keystore`))
