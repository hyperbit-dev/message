import { btc, toBitcoinJS } from "@hyperbitjs/chains";
import bitcoinMessage from "bitcoinjs-message";
import CoinKey from "coinkey";
import ECPairFactory from "ecpair";
import * as ecc from "tiny-secp256k1";
import { Sign, Verify } from "./types";

/**
 * Sign for proof of ownership of wallet address.
 * @param param
 * @param {string} param.message Hash used for signing your message.
 * @param {string|Buffer} param.privateKeyWIF Wallet Import Format (WIF) string or private key Buffer.
 * @param {string|Buffer} param.privateKey Private key string or private key Buffer.
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
    privateKeyWIF,
    privateKey,
    compressed = true,
    messagePrefix,
    versions,
    network = btc.mainnet,
  }: Sign,
  ...params: unknown[]
): string | null {
  const _messagePrefix =
    messagePrefix || network?.messagePrefix || btc.mainnet.messagePrefix;

  try {
    const _versions = versions || network?.versions || btc.mainnet.versions;
    let _compressed = compressed;
    let _privateKey;
    let _network = network;

    if (privateKeyWIF) {
      if (Buffer.isBuffer(privateKeyWIF)) {
        _privateKey = privateKeyWIF;
      } else {
        _privateKey = CoinKey.fromWif(privateKeyWIF, _versions).privateKey;
        _compressed =
          CoinKey.fromWif(privateKeyWIF, _versions).compressed === true
            ? true
            : _compressed;
      }
    } else if (privateKey) {
      let _pk: Buffer;
      if (Buffer.isBuffer(privateKey)) {
        _pk = privateKey;
      } else {
        _pk = Buffer.from(privateKey, "hex");
      }
      _network = toBitcoinJS(network);

      const ECPair = ECPairFactory(ecc);
      const keyPair = ECPair.fromPrivateKey(_pk, { network: _network });

      _privateKey = keyPair.privateKey;
    }

    const signature = bitcoinMessage.sign(
      message,
      _privateKey,
      _compressed,
      _messagePrefix,
      ...params
    );
    return signature.toString("base64");
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
    messagePrefix || network?.messagePrefix || btc.mainnet.messagePrefix;

  try {
    const m = Buffer.from(message).toString("ascii");
    const result = bitcoinMessage.verify(m, address, signature, _messagePrefix);
    return result;
  } catch {
    return false;
  }
}
