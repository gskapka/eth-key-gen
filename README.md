## Ethereum Key Pair Generator

***

## :mortar_board: _Instructions_
**1.** Clone repo:

**`❍ git clone https://github.com/gskapka/eth-key-gen.git`**

**2.** Switch into directory:

**`❍ cd eth-key-gen`**

**3.** Install dependencies:

**`❍ pnpm install`**

**4.** Generate an ethereum address & private key: 

**`❍ node eth-key-gen --p <your-password-here>`**

***

## :black_nib: _Notes for Riccardo_

**❍** The OPSEC of running this script not very strong! It logs the private key to the console with no warning, so make sure no one is shoulder surfing your!

**❍** If you look in `./lib/generate-key-pair.js` you'll see line 41 is where the private key is logged to the console. Comment that out if you don't want better OPSEC!

**❍** There are no tests because I've just thrown this together in five minutes.

**❍** If you don't provide it a password via the `--p` flag, it'll use a default password of "password".

**❍** See the [Keythereum](https://github.com/ethereumjs/keythereum#readme) & [Ethereum Utils](https://github.com/ethereumjs/ethereumjs-util) github pages to see what's going on under the hood!

## :clipboard: _To Do List for Me_

:white_check_mark: Use applicatives and partially apply the two curriable, password-requiring functions!

:black_square_button: Write tests!

:black_square_button: Port to typescript!
