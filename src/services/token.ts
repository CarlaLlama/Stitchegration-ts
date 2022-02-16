import fetch from 'node-fetch';
import { generateJWT } from '../utils/jwt-generator.js';
const confScopes = ['client_paymentrequest'];

export async function getConfidentialAccessToken() {
    const clientId = process.env.CONFIDENTIAL_CLIENT_ID;
    let token = await generateJWT(clientId);
  
    const body = {
      client_id: clientId,
      scope: confScopes.join(' '),
      audience: 'https://secure.stitch.money/connect/token',
      client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_assertion: token
    };
  
    return await _getAccessTokenHandler(body, 'client_credentials');
  }
  
  async function _getAccessTokenHandler(bodyOpts, grantType) {
    const body = {
      grant_type: grantType,
      ...bodyOpts
    };
    const bodyString = Object.entries(body).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
    const response = await fetch('https://secure.stitch.money/connect/token', {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyString,
    });
    const responseBody = await response.json();
    return responseBody;
  }
  