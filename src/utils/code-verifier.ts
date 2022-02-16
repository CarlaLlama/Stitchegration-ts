import { Crypto } from '@peculiar/webcrypto';

function _base64UrlEncode(byteArray: any) {
    const charCodes = String.fromCharCode(...byteArray);
    return Buffer.from(charCodes, 'binary')
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
async function _sha256(verifier: string) {
    const msgBuffer = new TextEncoder('utf-8').encode(verifier);
    // hash the message
    console.log("CRYPTO ", Crypto);
    const hashBuffer = await Crypto.subtle.digest('SHA-256', msgBuffer);
    return new Uint8Array(hashBuffer);
}
export async function generateVerifierChallengePair() {
  const randomBytes = Crypto.randomBytes(32);
  const verifier = _base64UrlEncode(randomBytes);
  const challenge = await _sha256(verifier).then(_base64UrlEncode);
  return [verifier, challenge];
}

export function generateRandomStateOrNonce() {
  const randomBytes = Crypto.randomBytes(32);
  return _base64UrlEncode(randomBytes);
}
