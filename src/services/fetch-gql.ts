export async function fetchGraphQL(accessToken: string, operationsDoc: string, operationName: string, variables: JSON) {
  const body = {
    query: operationsDoc,
    variables: variables,
    operationName: operationName
  };

  const response = await fetch('https://api.stitch.money/graphql', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`      
    },
    body: JSON.stringify(body)
  });

  const responseBody = await response.json();
  console.log('RESPONSE: ', responseBody);
  return responseBody;
}
