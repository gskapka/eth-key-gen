## Ethereum Key Pair Generator

***

## :mortar_board: _Instructions_
**1.** Clone repo:

**`❍ git clone https://github.com/gskapka/eth-key-gen.git`**

**2.** Switch into directory:

**`❍ cd eth-key-gen`**

**3.** Install dependencies:

**`❍ npm install`**

**4.** Generate an ethereum address & private key: 

**`❍ node -e 'require("./eth-key-gen")("your-password-here")'`**

***

## :black_nib: _Notes for Riccardo_

**❍** The OPSEC of running this script not very strong!! It console logs the private key, so make sure no one is watching over your shoulder!! :stuck_out_tongue_closed_eyes:

**❍** There are no tests because I've just thrown this together in five minutes.

**❍** If you look in `eth-key-gen.js` you'll see a line commented out. Un-comment that line if you want the script to save a keyfile that's password protected with the password you've provided.

**❍** See the [Keythereum](https://github.com/ethereumjs/keythereum#readme) & [Ethereum Utils](https://github.com/ethereumjs/ethereumjs-util) github pages to see what's going on under the hood!
