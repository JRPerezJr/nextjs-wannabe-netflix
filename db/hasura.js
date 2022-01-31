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
  return response?.data?.users?.length === 0;
}

export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createNewUser(
    $issuer: String!,
    $email: String!,
    $publicAddress: String!
    ) {
    insert_users(
      objects: {
        email: $email,
        issuer: $issuer,
        publicAddress:$publicAddress
      }
    ) {
      returning {
        email
        id
        issuer
        }
      }
  }
`;

  const { issuer, email, publicAddress } = metadata;

  const response = await queryHasuraGraphQl(
    operationsDoc,
    'createNewUser',
    {
      issuer,
      email,
      publicAddress,
    },
    token
  );
  console.log({ response }, { issuer });
  return response;
}

export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUserId(
    $userId: String!,
    $videoId: String!
  ) {
    stats(
      where: {
        userId: {
          _eq: $userId,
        },
        videoId: {
          _eq: $videoId
        }

      }
    ) {
      favorite
      id
      userId
      videoId
      watched
    }
  }
`;

  const response = await queryHasuraGraphQl(
    operationsDoc,
    'findVideoIdByUserId',
    {
      videoId,
      userId,
    },
    token
  );

  return response?.data?.stats;
}

export async function insertStatsByUserId(
  token,
  { favorite, userId, watched, videoId }
) {
  const insertOperationsDoc = `
    mutation insertStats(
      $favorite: Int!,
      $userId: String!,
      $watched: Boolean!,
      $videoId: String!
    ){
      insert_stats_one(object: {
          favorite: $favorite,
          userId: $userId,
          watched: $watched,
          videoId: $videoId
        }){
          favorite
          userId
        }
    } 
  `;

  return await queryHasuraGraphQl(
    insertOperationsDoc,
    'insertStats',
    { favorite, videoId, userId, watched },
    token
  );
}

export async function updateStatsByUserId(
  token,
  { favorite, userId, watched, videoId }
) {
  const updateOperationsDoc = `
    mutation updateStats(
      $favorite: Int!,
      $userId: String!,
      $watched: Boolean!,
      $videoId: String!
    ){
      update_stats(
        _set: {watched: $watched, favorite: $favorite},
        where:{
          userId:{_eq: $userId},
          videoId:{_eq: $videoId}
        }) {
        returning  {
          favorite,
          userId,
          watched,
          videoId
        }
      }
    }
  `;

  return await queryHasuraGraphQl(
    updateOperationsDoc,
    'updateStats',
    { favorite, userId, watched, videoId },
    token
  );
}

export async function getWatchedVideos(userId, token) {
  const operationsDoc = `
    query watchedVideos (
      $userId: String!,
    ) {
      stats(
        where: {
          watched: {_eq: true},
          userId: {_eq: $userId},
        }
        ) {
        videoId
      }
    }
  `;

  const response = await queryHasuraGraphQl(
    operationsDoc,
    'watchedVideos',
    {
      userId,
    },
    token
  );

  return response?.data?.stats;
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
      'Content-Type': 'application/json',
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
