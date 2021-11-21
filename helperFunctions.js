import fetch from 'node-fetch';

export const fetchGraphQL = async (
  schema,
  variables = {},
) => {
  const graphql = JSON.stringify({
    query: schema,
    variables,
  });
  const requestOptions = {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': `92vDCAHE5MuUIUMtkNUQsCB7Hv9g30EGiyarlYsX9HvAOGOBrS2I2KBwyIanimSU`,
    },
    body: graphql,
  };
  const database_url = "https://accurate-goshawk-85.hasura.app/v1/graphql";
  const res = await fetch(database_url, requestOptions).then((res) =>
    res.json()
  );
  
  return res;
};
