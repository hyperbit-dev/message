import { btc } from '@hyperbitjs/chains';
import bitcoinMessage from 'bitcoinjs-message';
import CoinKey from 'coinkey';
import { Sign, Verify } from './types';

/**
 * Sign for proof of ownership of wallet address.
 * @param param
 * @param {string} param.message Hash used for signing your message.
 * @param {string|Buffer} param.privateKey Wallet Import Format (WIF) string or private key Buffer.
 * @param {boolean=} param.compressed
 * @param {string=} [param.messagePrefix=\u0018Bitcoin Signed Message:\n] Message prefix used by the blockchain for signing.
 * @param {object=} param.versions Versions object derived from Network object from @hyperbitjs/chains. Only private and public strings required
 * @param {object=} param.network Network object from @hyperbitjs/chains
 * @param {any=} params Pass in any signature option after the initial object to make use of additional https://github.com/bitcoinjs/bitcoinjs-message parameters.
 * @returns A base64 encoded string representation of the signature.
 */
export function sign(
  {
    message,
    privateKey,
    compressed = true,
    messagePrefix,
    versions,
    network = btc.main,
  }: Sign,
  ...params: any
): string | null {
  const _messagePrefix =
    messagePrefix || network?.messagePrefix || btc.main.messagePrefix;
  const _versions = versions || network?.versions || btc.main.versions;

  try {
    let _compressed = compressed;
    let _privateKeyWif = privateKey;

    if (typeof privateKey === 'string') {
      _privateKeyWif = CoinKey.fromWif(privateKey, _versions).privateKey;
      _compressed =
        CoinKey.fromWif(privateKey, _versions).compressed === true
          ? true
          : _compressed;
    }

    const signature = bitcoinMessage.sign(
      message,
      _privateKeyWif,
      _compressed,
      _messagePrefix,
      ...params
    );
    return signature.toString('base64');
  } catch (e) {
    return null;
  }
}

/**
 * Verify the ownership of the address.
 * @param param
 * @param {string} param.message Message used to generate signature.
 * @param {string} param.address Address submitted for proof of ownership.
 * @param {string} param.signature Signature generated from address and message.
 * @param {string} [param.messagePrefix=\u0018Bitcoin Signed Message:\n] Message prefix used by the blockchain for verifying.
 * @param {object=} param.network Network object from @hyperbitjs/chains
 * @returns
 */
export function verify({
  message,
  address,
  signature,
  messagePrefix,
  network,
}: Verify): boolean {
  const _messagePrefix =
    messagePrefix || network?.messagePrefix || btc.main.messagePrefix;

  try {
    const m = Buffer.from(message).toString('ascii');
    const result = bitcoinMessage.verify(m, address, signature, _messagePrefix);
    return result;
  } catch {
    return false;
  }
}
