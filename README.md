![Hyperbit Message Banner](https://github.com/hyperbit-dev/message/raw/master/media/repo-banner.png)

# Hyperbit - Message

JavaScript functions for signing and verifying messages.

## Installation

```bash
npm install @hyperbitjs/message
```

## Usage

### Sign a message using a private key

```javascript
import { rvn } from "@hyperbitjs/chains";
import { sign } from "@hyperbitjs/message";

// Wallet Import Format (WIF) format
const privateKey =
  "963523425d5de8ad42320df7ec9ba0e7f15783914da16e0aff93df20c7b668fb";
const message = "This is an example of a signed message.";

const signature = sign({ message, privateKey, network: rvn.mainnet });
// Expected Result: IIHJVUBhHEnGXun89PyIyoua265DKhACWFxG3LRAJTz+S03huR+vIaWhgJPYDoxAlS/EFN7nqydAfP6n+UBDvdY=
```

### Sign a message using a private key WIF

```javascript
import { rvn } from "@hyperbitjs/chains";
import { sign } from "@hyperbitjs/message";

// Wallet Import Format (WIF) format
const privateKeyWIF = "T85xhCTbfJnMW4a8qB4ubAFVgshrDdU9jcDmrSgNntTp6YSrub7M";
const message = "This is an example of a signed message.";

const signature = sign({ message, privateKeyWIF, network: rvn.mainnet });
// Expected Result: IIHJVUBhHEnGXun89PyIyoua265DKhACWFxG3LRAJTz+S03huR+vIaWhgJPYDoxAlS/EFN7nqydAfP6n+UBDvdY=
```

### Verify a message

```javascript
import { verify } from "@hyperbitjs/message";

const address = "<public_address_of_private_key_wif>";
const message = "This is an example of a signed message.";
const signature = "<generated_signature_from_sign>";

const isValid = verify({ address, message, signature });
```

### Full Example

```javascript
import { Mnemonic } from "@hyperbitjs/mnemonic";
import { sign, verify } from "@hyperbitjs/message";
import { ltc } from "@hyperbitjs/chains";

const mnemonic = new Mnemonic({ network: ltc.main });
const addresses = mnemonic.generateAddresses();

const { address, privateKey } = addresses[0].external;
const network = ltc.main;
const message = "This is an example of a signed message.";

const signature = sign({
  privateKey,
  message,
  network,
});

const isValid = verify({
  message,
  address,
  signature,
  network,
});

console.log("isValid", isValid);
// Expected Output: true
```

## License

[MIT](/LICENSE) License
