import { fetchGraphQL } from "src/services/fetch-gql";

export async function getAccounts(accessToken: string){
  const operationsDoc = `
      query GetAccounts {
      user {
          bankAccounts {
          name
          }
      }
      }
  `;

  let results = await fetchGraphQL(accessToken, operationsDoc, 'GetAccounts', {});
  return results;
}


export async function getAccountIds(accessToken: string){
  const operationsDoc = `
    query GetAccounts {
      user {
        bankAccounts {
          name
          id
        }
      }
    }
  `;

  let results = await fetchGraphQL(accessToken, operationsDoc, 'GetAccounts', {});
  return results;
}

export async function getFirstAccountId(accessToken: string) {
  let accounts = await getAccountIds(accessToken);
  return accounts.data.user.bankAccounts[0].id;
}
