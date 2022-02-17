import fetch from 'node-fetch';
import { TokenResponseBody } from 'src/utils/types.js';
import { generateJWT } from 'src/utils/jwt-generator.js';

export async function getClientToken(clientId?: string): Promise<TokenResponseBody> {
  const scopes = ['client_paymentrequest'];
  const inferredClientId = clientId ?? process.env.CLIENT_ID;
  const token = await generateJWT(inferredClientId);

  return retrieveTokenUsingClientAssertion(inferredClientId!, token, scopes);
}

export async function retrieveTokenUsingClientAssertion(clientId: string, clientAssertion: string, scopes: Array<string>): Promise<TokenResponseBody> {
  const body = {
    grant_type: 'client_credentials',
    client_id: clientId,
    scope: scopes.join(' '),
    audience: 'https://secure.stitch.money/connect/token',
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    client_assertion: clientAssertion,
  };

  const bodyString = Object.entries(body).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
  const response = await fetch('https://secure.stitch.money/connect/token', {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: bodyString,
  });
  const responseBody = await response.json();
  console.log('TOKEN: ',  responseBody);
  return responseBody as TokenResponseBody;
}
