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
 * @param {any=} sigOptions Pass in any option after the initial object to make use of additional https://github.com/bitcoinjs/bitcoinjs-message parameters.
 * @returns A base64 encoded string representation of the signature.
 */
export function sign(
  {
    message,
    privateKey,
    compressed = true,
    messagePrefix = '\u0018Bitcoin Signed Message:\n',
  }: Sign,
  ...sigOptions: any
): string | null {
  try {
    const privateKeyWif =
      typeof privateKey === 'string'
        ? CoinKey.fromWif(privateKey).privateKey
        : privateKey;
    const signature = bitcoinMessage.sign(
      message,
      privateKeyWif,
      compressed,
      messagePrefix,
      ...sigOptions
    );
    return signature.toString('base64');
  } catch (e) {
    console.log('e', e);
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
 * @returns
 */
export function verify({
  message,
  address,
  signature,
  messagePrefix = '\u0018Bitcoin Signed Message:\n',
}: Verify): boolean {
  try {
    const m = Buffer.from(message).toString('ascii');
    const result = bitcoinMessage.verify(m, address, signature, messagePrefix);
    return result;
  } catch {
    return false;
  }
}
