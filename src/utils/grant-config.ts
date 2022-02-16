import { v4 as uuid } from 'uuid'

const getPublicConfig = () => {
  const codeIdentifier = uuid()

  return {
    defaults: {
      origin: 'http://localhost:3000'
    },
    // we need to create a custom provider
    // https://github.com/simov/grant#custom-providers
    client: {
        clientId: process.env.PUBLIC_CLIENT_ID,
        clientSecret: process.env.PUBLIC_CLIENT_SECRET,
        clientName: process.env.PUBLIC_CLIENT_NAME,
        allowedScopes: [
            "accountholders",
            "balances",
            "transactions",
            "accounts",
            "offline_access",
            "openid"
        ],
        allowedGrantTypes: [
            "authorization_code"
        ],
        redirectUris: [
            "https://localhost:3000/return",
            "https://localhost:8080",
            "https://localhost:8080/return",
            "https://localhost:9000/return",
            "https://localhost:3000",
            "https://localhost:434343",
            "https://localhost:434343/return",
            "https://localhost:9000"
        ],
        postLogoutRedirectUris: [
            "https://localhost:9000",
            "https://localhost:8080",
            "https://localhost:434343",
            "https://localhost:3000"
        ],
        identityTokenLifetime: 300,
        accessTokenLifetime: 3600,
        authorizationCodeLifetime: 300,
        absoluteRefreshTokenLifetime: 2592000,
        slidingRefreshTokenLifetime: 1296000,
        allowedCorsOrigins: [
            "https://localhost:8080",
            "https://localhost:9000",
            "https://localhost:3000",
            "https://localhost:434343"
        ],
        userInteractionRedirectUrls: [
            "https://localhost:434343/reauthorized",
            "https://localhost:3000/reauthorized",
            "https://localhost:9000/reauthorized",
            "https://localhost:8080/reauthorized"
        ]
    }
  }
}

const getConfidentialConfig = () => {
  const codeIdentifier = uuid()

  return {
    defaults: {
      origin: 'http://localhost:3000'
    },
    // we need to create a custom provider
    // https://github.com/simov/grant#custom-providers
    client: {
      clientId: process.env.CONFIDENTIAL_CLIENT_ID,
      clientSecret: process.env.CONFIDENTIAL_CLIENT_SECRET,
      clientName: process.env.CONFIDENTIAL_CLIENT_NAME,
      allowedScopes: [
          "accountholders",
          "balances",
          "transactions",
          "accounts",
          "offline_access",
          "openid"
      ],
      allowedGrantTypes: [
          "client_credentials",
          "authorization_code"
      ],
      redirectUris: [
          "https://localhost:3000/return",
          "https://localhost:8080",
          "https://localhost:8080/return",
          "https://localhost:9000/return",
          "https://localhost:3000",
          "https://localhost:434343",
          "https://localhost:434343/return",
          "https://localhost:9000"
      ],
      postLogoutRedirectUris: [
          "https://localhost:9000",
          "https://localhost:8080",
          "https://localhost:434343",
          "https://localhost:3000"
      ],
      identityTokenLifetime: 300,
      accessTokenLifetime: 3600,
      authorizationCodeLifetime: 300,
      absoluteRefreshTokenLifetime: 63072000,
      slidingRefreshTokenLifetime: 5184000,
      allowedCorsOrigins: [
          "https://localhost:8080",
          "https://localhost:9000",
          "https://localhost:3000",
          "https://localhost:434343"
      ],
      userInteractionRedirectUrls: [
          "https://localhost:434343/reauthorized",
          "https://localhost:3000/reauthorized",
          "https://localhost:9000/reauthorized",
          "https://localhost:8080/reauthorized"
      ]
    }
  }
}

export default { getPublicConfig, getConfidentialConfig }