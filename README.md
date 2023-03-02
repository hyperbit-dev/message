![Hyperbit Message Banner](https://github.com/hyperbit-dev/message/raw/master/media/repo-banner.png)

# Hyperbit - Message

JavaScript functions for signing and verifying messages.

## Installation

```bash
npm install @hyperbitjs/message
```

## Usage

### Sign a message

```javascript
import { sign } from '@hyperbitjs/message';

// Wallet Import Format (WIF) format
const privateKey = 'L4rK1yDtCWekvXuE6oXD9jCYfFNV2cWRpVuPLBcCU2z8TrisoyY1';
const message = 'This is an example of a signed message.';

const signature = sign({ message, privateKey });
// Expected Result: H9L5yLFjti0QTHhPyFrZCT1V/MMnBtXKmoiKDZ78NDBjERki6ZTQZdSMCtkgoNmp17By9ItJr8o7ChX0XxY91nk=
```

### Verify a message

```javascript
import { verify } from '@hyperbitjs/message';

const address = '<public_address_of_private_key_wif>';
const message = 'This is an example of a signed message.';
const signature = '<generated_signature_from_sign>';

const isValid = verify({ address, message, signature });
```

### Full Example
```javascript
import { Mnemonic } from '@hyperbitjs/mnemonic';
import { sign, verify } from '@hyperbitjs/message';
import { ltc } from '@hyperbitjs/chains';

const mnemonic = new Mnemonic({ network: ltc.main });
const addresses = mnemonic.generateAddresses();

const { wif, address } = addresses[0].external;
const network = ltc.main;
const message = 'This is an example of a signed message.';

const signature = sign({
  privateKey: wif,
  message,
  network,
});

const isValid = verify({
  message,
  address,
  signature,
  network,
});

console.log('isValid', isValid);
// Expected Output: true
```

## Contributing

If you're interested in contributing, please read the [contributing docs](https://github.com/hyperbit-dev/message/blob/master/CONTRIBUTING.md) before submitting a pull request.

## Authors

- [@mikemcshinsky](https://twitter.com/mikemcshinsky) – [Magitek](https://magitek.dev)

## License

[MIT](/LICENSE) License