import { Crypto } from '@peculiar/webcrypto';

export function buildAuthorizationUrl(clientId: string, challenge: string, redirectUri: string, state: string, nonce: string, scopes: Array<string>) {
  const search = {
        client_id: clientId,
        code_challenge: challenge,
        code_challenge_method: 'S256',
        redirect_uri: redirectUri,
        scope: scopes.join(' '),
        response_type: 'code',
        nonce: nonce,
        state: state
  };
  const searchString = Object.entries(search).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
  return `https://secure.stitch.money/connect/authorize?${searchString}`;
}

function base64UrlEncode(byteArray: any) {
  const charCodes = String.fromCharCode(...byteArray);
  return Buffer.from(charCodes, 'binary')
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}
async function sha256(verifier: string) {
  const msgBuffer = new TextEncoder('utf-8').encode(verifier);
  // hash the message
  console.log("CRYPTO ", Crypto);
  const hashBuffer = await Crypto.subtle.digest('SHA-256', msgBuffer);
  return new Uint8Array(hashBuffer);
}
export async function generateVerifierChallengePair() {
  const randomBytes = Crypto.randomBytes(32);
  const verifier = base64UrlEncode(randomBytes);
  const challenge = await sha256(verifier).then(base64UrlEncode);
  return [verifier, challenge];
}

export function generateRandomStateOrNonce() {
  const randomBytes = Crypto.randomBytes(32);
  return base64UrlEncode(randomBytes);
}