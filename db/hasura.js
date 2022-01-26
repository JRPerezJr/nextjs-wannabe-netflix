export async function isNewUser(token) {
  const operationsDoc = `
  query MyQuery {
    users(where:{issuer:{_eq:
    ''
    }})
    {
      id
      email
      issuer
    }
  }
`;
  const response = await queryHasuraGraphQl(
    operationsDoc,
    'MyQuery',
    {},
    token
  );
  console.log({ response });
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
