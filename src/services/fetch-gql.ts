export async function fetchGraphQL(operationsDoc: string, operationName: string, variables: JSON) {
    const body = {
    query: operationsDoc,
    variables: variables,
    operationName: operationName
    };
    const response = await fetch('https://api.stitch.money/graphql', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`      
    },
    body: JSON.stringify(body)
    });

    const responseBody = await response.json();
    return responseBody;
}
