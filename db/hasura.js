export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where:{issuer:{_eq: $issuer}}){
      id
      email
      issuer
    }
  }
`;
  const response = await queryHasuraGraphQl(
    operationsDoc,
    'isNewUser',
    {
      issuer,
    },
    token
  );
  console.log({ response }, { issuer });
  return response?.users?.length === 0;
}

export async function queryHasuraGraphQl(
  operationsDoc,
  operationName,
  variables,
  token
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_KEY,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}
