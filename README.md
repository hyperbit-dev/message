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

Message signing defaults to Bitcoin '\u0018Bitcoin Signed Message:\n'. See [@hyperbitjs/chains](https://github.com/hyperbit-dev/chains) for message prefix options provided by different blockchains.

```javascript
import { sign, verify } from '@hyperbitjs/message';
import { btc } from '@hyperbitjs/chains';

const { messagePrefix } = ltc.main;

const signature = sign({
  privateKey: '...',
  message: '...',
  messagePrefix,
});

const isVerified = verify({
  address: '...',
  message: '...',
  signature: '...',
  messagePrefix,
});
```

## Contributing

If you're interested in contributing, please read the [contributing docs](https://github.com/hyperbit-dev/message/blob/master/CONTRIBUTING.md) before submitting a pull request.

## Authors

- [@mikemcshinsky](https://twitter.com/mikemcshinsky) – [Magitek](https://magitek.dev)

## License

[MIT](/LICENSE) License